import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { AdditionalInfo, ExportInfo, ImportInfo } from "./interface/codeinfo";
import { add_import } from "./print";

/**
 * 方法有副作用 会修改 参数 undefined_map
 * @param code
 * @param external_packages
 * @returns
 */
function export_calc(
  code: string,
  file_index: number,
  undefined_map: Map<number, AdditionalInfo>,
  export_hashmap: Map<number, ExportInfo>
): { code: string; specifiers: string[] } {
  let export_specifiers: string[] = [];
  let ast: any = undefined;
  try {
    ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "flow"],
      allowImportExportEverywhere: true,
      allowUndeclaredExports: true,
    });
  } catch (ex) {
    throw new Error(
      `parse error ----> \n index: ${file_index} \n ${code} \n ex: \n ${ex}`
    );
  }
  traverse(ast!, {
    enter(path) {
      if (
        path.isVariableDeclaration(path.node) &&
        path.node.kind === "var" &&
        path.parent.type === "Program"
      ) {
        const info_list: any = path.node.declarations;
        // example var a = 1, b = 2;
        for (let info of info_list) {
          if (info) {
            if (info.id.name) {
              // example var obj = {a: 1, b: 2};
              export_specifiers.push(info.id.name);
            } else if (info.id.properties?.length ?? 0 > 0) {
              // example var {a, b} = {a: 1, b: 2};
              // example var {a: o, b} = {a: 1, b: 2};
              info.id.properties.forEach((p: any) => {
                export_specifiers.push(p.value.name);
              });
            } else if (info.id.elements?.length ?? 0 > 0) {
              // example var [memoizedCloneSnapshot, invalidateMemoizedSnapshot$2] = obj;
              info.id.elements.forEach((p: any) => {
                export_specifiers.push(p.name);
              });
            } else {
              throw new Error(`unknown var declaration \n ${info}`);
            }
          }
        }
      } else if (
        path.isFunctionDeclaration(path.node) &&
        path.parent.type === "Program"
      ) {
        // example function func abc() {}
        if (path.node.id?.name) {
          export_specifiers.push(path.node.id.name);
        }
      } else if (
        path.isImportDeclaration(path.node) &&
        path.parent.type === "Program"
      ) {
        // 调试 内存复制 ast 信息
        // memorycopy(JSON.stringify(path.node, null, 2));
        const specifiers_names: string[] = [];
        if (!path.node.source.value.includes("./shopee")) {
          path.node.specifiers.forEach((sp) => {
            specifiers_names.push(sp.local.name);
          });
        }
        // 查看所有的 spec
        // console.log('----->', specifiers_names);
        const none_reference_specifiers = specifiers_names.filter((sp) => {
          const binding = path.scope.getBinding(sp);
          return !binding?.referenced;
        });
        export_specifiers = export_specifiers.concat(none_reference_specifiers);
      }
    },
  });

  if (export_specifiers.length > 0) {
    const final_code = `
  ${code}
   
export { ${export_specifiers.join(", ")} };
  `;

    // 处理循环依赖等复杂情况
    if (export_specifiers.length > 0) {
      import_un_resovle_specifiers(
        file_index,
        export_specifiers,
        undefined_map,
        export_hashmap
      );
    }

    return { code: final_code, specifiers: export_specifiers };
  }

  // 处理仍旧没有导入的 依赖

  return { code, specifiers: [] };
}

function import_un_resovle_specifiers(
  fileindex: number,
  specifiers: string[],
  undefined_map: Map<number, AdditionalInfo>,
  export_hashmap: Map<number, ExportInfo>
) {
  for (let [index, info] of undefined_map.entries()) {
    // 算出本文件 可以导入的 变量
    const resolve_specifiers = specifiers.filter((p) =>
      info.undefined_variables.includes(p)
    );
    // 可以提供导出 当前文件
    if (resolve_specifiers.length > 0) {
      // 去除可以导入的变量
      const un_resolve_specifiers = info.undefined_variables.filter(
        (x) => !resolve_specifiers.includes(x)
      );
      if (un_resolve_specifiers.length === 0) {
        //如果全部导入的 消除记录
        undefined_map.delete(index);
      } else {
        // 还有剩余就修改记录
        info.undefined_variables = un_resolve_specifiers;
      }
      // 开始导入代码
      const import_info: ImportInfo = {
        index: fileindex,
        specifiers: resolve_specifiers,
      };
      const change_file = export_hashmap.get(index);
      if (change_file) {
        change_file.code = add_import(change_file.code, [import_info]);
      } else {
        throw new Error(
          `can not find code by index in the export_hashmap : ${index}`
        );
      }
    }
  }
}

export { export_calc };
