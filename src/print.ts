import { ParseResult, parse } from "@babel/parser";
import * as _babel_types from "@babel/types";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import { AdditionalInfo, ExportInfo, ImportInfo } from "./interface/codeinfo";
import { findUndefinedVariables } from "./eslint";

/**
 *
 * @param code
 * @returns
 */
function replace_space(code: string) {
  return code.replace(/[\r\n]/g, "").replace(/\ +/g, "");
}

/**
 * get import files
 * @param filepath
 * @param import_hashmap
 * @returns
 */
function get_import_files(
  undefined_vars: string[],
  export_map: Map<number, ExportInfo>
): ImportInfo[] {
  const import_files: ImportInfo[] = [];
  for (const [index, export_info] of export_map.entries()) {
    const resolve_vars = undefined_vars.filter((x) =>
      export_info.export_specifiers.includes(x)
    );
    import_files.push({ index, specifiers: resolve_vars });
  }
  return import_files;
}

/**
 * get esbuild runtime info
 * @param export_hashmap
 * @returns
 */
function get_esbuild_runtime(
  export_hashmap: Map<number, ExportInfo>
): ExportInfo | undefined {
  const export_infos = Array.from(export_hashmap.values());
  const runtime_info = export_infos.find(
    (export_info) => export_info.file_location === "esbuild_runtime"
  );
  return runtime_info;
}

/**
 * check specifiers referenced
 * @param ast
 * @param spec
 */
function add_specifiers_referenced(
  ast: ParseResult<_babel_types.File>,
  spec: ImportInfo[]
) {
  traverse(ast!, {
    enter(path) {
      if (path.isProgram()) {
        spec.forEach((info) => {
          const specifiers: string[] = [];
          info.specifiers.forEach((sp) => {
            specifiers.push(sp);
          });
          if (specifiers.length > 0) {
            const code_source = `./shopee${info.index}.js`;
            const real_specifiers = specifiers.map((sp) => {
              return {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: sp,
                },
                local: {
                  type: "Identifier",
                  name: sp,
                },
              };
            });
            path.node.body.unshift({
              type: "ImportDeclaration",
              specifiers: real_specifiers,
              source: {
                type: "StringLiteral",
                extra: {
                  rawValue: code_source,
                  raw: `'${code_source}'`,
                },
                value: code_source,
              },
            } as any);
          }
        });
      }
    },
  });
}

/**
 * add import code
 * @param code
 * @param ast
 * @param specifiers
 * @returns
 */
function add_import(
  code: string,
  specifiers: ImportInfo[],
  ast?: ParseResult<_babel_types.File>
): string {
  if (!ast) {
    try {
      ast = parse(code, {
        sourceType: "module",
        plugins: ["jsx", "flow"],
        allowImportExportEverywhere: true,
        allowUndeclaredExports: true,
      });
    } catch (e) {
      throw new Error(
        `in add_import -> \n parse code error: ${e} \n code: ${code}`
      );
    }
  }
  if (specifiers.length > 0) {
    add_specifiers_referenced(ast, specifiers);
  }
  try {
    const res = generate(ast, { compact: false, comments: true }, code);
    return res.code;
  } catch (e) {
    throw new Error(`generate code error: ${e} \n code: ${code}`);
  }
}

/**
 * fix entry code
 * @param code
 */
function fix_entry_code(code: string) {
  const regex = /^export\s+{([^}]+)}\s*;?$/gm;
  const res = code.match(regex);
  if (res?.length ?? 0 > 0) {
    let spec: string[] = [];
    let new_code = "";
    res!.forEach((item) => {
      const content = replace_space(item);
      const export_specifiers = content
        .replace("export{", "")
        .replace("};", "")
        .replace("}", "")
        .split(",");
      spec = [...spec, ...export_specifiers];
      export_specifiers.forEach((specifier) => {
        new_code += `console.log(${specifier}); \n`;
      });
    });
    return new_code;
  } else {
    return code;
  }
}

/**
 * genrate import code
 * @param param0
 * @returns
 */
async function print_import_code({
  code,
  filepath,
  file_index,
  export_hashmap,
  undefined_map,
}: {
  code: string;
  filepath: string;
  file_index: number;
  export_hashmap: Map<number, ExportInfo>;
  undefined_map: Map<number, AdditionalInfo>;
}) {
  let handle_code = code;
  let ast: ParseResult<_babel_types.File>;
  try {
    ast = parse(handle_code, {
      sourceType: "module",
      plugins: ["jsx", "flow"],
      allowImportExportEverywhere: true,
      allowUndeclaredExports: true,
    });
  } catch (e) {
    throw new Error(
      `parse code error: ${e} \n index: ${file_index} \n file: ${filepath} \n code: ${code}`
    );
  }
  // Check the current code for undefined variables used to support circular references Continue to modify the code in the future
  const undefined_spec_list = await findUndefinedVariables(handle_code);
  // currently exported possible dependent specifiers
  // base export specifiers calc import specifiers
  if (undefined_spec_list.length > 0) {
    const import_specifiers: ImportInfo[] = get_import_files(
      undefined_spec_list,
      export_hashmap
    );
    const real_import_specifiers: ImportInfo[] = [];
    // Process all symbols for undefined variables
    import_specifiers.forEach((item) => {
      const specifiers = item.specifiers;
      const real_specifiers = specifiers.filter((p) =>
        undefined_spec_list.includes(p)
      );
      real_import_specifiers.push({
        index: item.index,
        specifiers: real_specifiers,
      });
    });
    const still_undefined_spec_list: string[] = [];
    undefined_spec_list.forEach((item) => {
      if (!real_import_specifiers.some((p) => p.specifiers.includes(item))) {
        still_undefined_spec_list.push(item);
      }
    });

    if (import_specifiers.length > 0) {
      handle_code = add_import(handle_code, real_import_specifiers, ast!);
    }
    if (still_undefined_spec_list.length > 0) {
      undefined_map.set(file_index, {
        undefined_variables: still_undefined_spec_list,
      });
    }
  }
  return handle_code;
}

export { print_import_code, replace_space, fix_entry_code, add_import };
