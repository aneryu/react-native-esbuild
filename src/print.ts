import { ParseResult, parse } from "@babel/parser";
import * as _babel_types from "@babel/types";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import { ExportInfo } from "./split";

interface ImportInfo {
  index: number;
  specifiers: string[];
}

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
  filepath: string,
  import_hashmap: Map<string, string[]>
) {
  const import_files = import_hashmap.get(filepath);
  if (import_files) {
    return import_files;
  }
  return [];
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
 * get dependent files
 * @param import_files
 * @param export_hashmap
 */
function get_dependent_files(
  import_files: string[],
  export_hashmap: Map<number, ExportInfo>
) {
  const export_infos = Array.from(export_hashmap.values());
  const dependent_files = export_infos.filter((export_info) => {
    return import_files.includes(export_info.file_location);
  });
  return dependent_files;
}

function check_referenced(
  sp: string,
  ast: ParseResult<_babel_types.File>
): boolean {
  let res = false;
  traverse(ast!, {
    enter(path) {
      if (path.isIdentifier(path.node) && !path.parentPath.isObjectProperty()) {
        if (path.node.name === sp) {
          res = true;
        }
      }
    },
  });
  return res;
}

/**
 * check specifiers referenced
 * @param ast
 * @param spec
 */
function check_and_add_specifiers_referenced(
  ast: ParseResult<_babel_types.File>,
  spec: ImportInfo[]
) {
  traverse(ast!, {
    enter(path) {
      if (path.isProgram()) {
        spec.forEach((info) => {
          const specifiers: string[] = [];
          info.specifiers.forEach((sp) => {
            const referenced = check_referenced(sp, ast);
            if (referenced) {
              specifiers.push(sp);
            }
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
  ast: ParseResult<_babel_types.File>,
  specifiers: ImportInfo[]
): string {
  if (specifiers.length > 0) {
    check_and_add_specifiers_referenced(ast, specifiers);
  }
  try {
    const res = generate(ast, { compact: false, comments: true }, code);
    return res.code;
  } catch (e) {
    throw new Error(`generate code error: ${e} \n code: ${code}`);
  }
}

/**
 * genrate import code
 * @param param0
 * @returns
 */
function print_import_code({
  code,
  filepath,
  file_index,
  export_hashmap,
  import_hashmap,
}: {
  code: string;
  filepath: string;
  file_index: number;
  export_hashmap: Map<number, ExportInfo>;
  import_hashmap: Map<string, string[]>;
}) {
  let handle_code = code;
  let ast: ParseResult<_babel_types.File>;
  try {
    ast = parse(handle_code, {
      sourceType: "module",
      plugins: ["jsx", "flow"],
    });
  } catch (e) {
    // throw new Error(
    //   `parse code error: ${e} \n index: ${file_index} \n file: ${filepath} \n code: ${code}`
    // );
    console.log(e);
  }
  const import_specifiers: ImportInfo[] = [];
  const runtime_info = get_esbuild_runtime(export_hashmap);
  // 如果esbuild 产生了 runtime  就需要额外去处理 runtime导出的函数
  if (runtime_info && filepath !== "esbuild_runtime") {
    const runtime_specifiers = runtime_info!.export_specifiers;
    if (runtime_specifiers.length > 0) {
      import_specifiers.push({
        index: runtime_info!.index,
        specifiers: runtime_specifiers,
      });
    }
  }
  // 拿到曾经依赖文件的路径
  const import_files = get_import_files(filepath, import_hashmap);
  const import_res = get_dependent_files(
    [...import_files, filepath], // 一定要包含 自己的路径
    export_hashmap
  );
  if (import_res.length > 0) {
    //   console.log(`
    // file is ${filepath} ->
    // import_files is ${JSON.stringify(
    //   import_res.map((t) => {
    //     return {
    //       file_location: t.file_location,
    //       spec: t.export_specifiers,
    //       index: t.index,
    //     };
    //   }),
    //   null,
    //   2
    // )} ->
    // `);
    import_res.forEach((export_info) => {
      import_specifiers.push({
        index: export_info.index,
        specifiers: export_info.export_specifiers,
      });
    });
  }
  if (import_specifiers.length > 0) {
    handle_code = add_import(handle_code, ast!, import_specifiers);
  }
  return handle_code;
}

export { print_import_code, replace_space };
