"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.export_calc = void 0;
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const print_1 = require("./print");
/**
 * 方法有副作用 会修改 参数 undefined_map
 * @param code
 * @param external_packages
 * @returns
 */
function export_calc(code, file_index, undefined_map, export_hashmap) {
    let export_specifiers = [];
    let ast = undefined;
    try {
        ast = (0, parser_1.parse)(code, {
            sourceType: "module",
            plugins: ["jsx", "flow"],
            allowImportExportEverywhere: true,
            allowUndeclaredExports: true,
        });
    }
    catch (ex) {
        throw new Error(`parse error ----> \n index: ${file_index} \n ${code} \n ex: \n ${ex}`);
    }
    (0, traverse_1.default)(ast, {
        enter(path) {
            var _a, _b, _c, _d, _e;
            if (path.isVariableDeclaration(path.node) &&
                path.node.kind === "var" &&
                path.parent.type === "Program") {
                const info_list = path.node.declarations;
                // example var a = 1, b = 2;
                for (let info of info_list) {
                    if (info) {
                        if (info.id.name) {
                            // example var obj = {a: 1, b: 2};
                            export_specifiers.push(info.id.name);
                        }
                        else if ((_b = (_a = info.id.properties) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 > 0) {
                            // example var {a, b} = {a: 1, b: 2};
                            // example var {a: o, b} = {a: 1, b: 2};
                            info.id.properties.forEach((p) => {
                                export_specifiers.push(p.value.name);
                            });
                        }
                        else if ((_d = (_c = info.id.elements) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0 > 0) {
                            // example var [memoizedCloneSnapshot, invalidateMemoizedSnapshot$2] = obj;
                            info.id.elements.forEach((p) => {
                                export_specifiers.push(p.name);
                            });
                        }
                        else {
                            throw new Error(`unknown var declaration \n ${info}`);
                        }
                    }
                }
            }
            else if (path.isFunctionDeclaration(path.node) &&
                path.parent.type === "Program") {
                // example function func abc() {}
                if ((_e = path.node.id) === null || _e === void 0 ? void 0 : _e.name) {
                    export_specifiers.push(path.node.id.name);
                }
            }
            else if (path.isImportDeclaration(path.node) &&
                path.parent.type === "Program") {
                // 调试 内存复制 ast 信息
                // memorycopy(JSON.stringify(path.node, null, 2));
                const specifiers_names = [];
                if (!path.node.source.value.includes("./shopee")) {
                    path.node.specifiers.forEach((sp) => {
                        specifiers_names.push(sp.local.name);
                    });
                }
                // 查看所有的 spec
                // console.log('----->', specifiers_names);
                const none_reference_specifiers = specifiers_names.filter((sp) => {
                    const binding = path.scope.getBinding(sp);
                    return !(binding === null || binding === void 0 ? void 0 : binding.referenced);
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
            import_un_resovle_specifiers(file_index, export_specifiers, undefined_map, export_hashmap);
        }
        return { code: final_code, specifiers: export_specifiers };
    }
    // 处理仍旧没有导入的 依赖
    return { code, specifiers: [] };
}
exports.export_calc = export_calc;
function import_un_resovle_specifiers(fileindex, specifiers, undefined_map, export_hashmap) {
    for (let [index, info] of undefined_map.entries()) {
        // 算出本文件 可以导入的 变量
        const resolve_specifiers = specifiers.filter((p) => info.undefined_variables.includes(p));
        // 可以提供导出 当前文件
        if (resolve_specifiers.length > 0) {
            // 去除可以导入的变量
            const un_resolve_specifiers = info.undefined_variables.filter((x) => !resolve_specifiers.includes(x));
            if (un_resolve_specifiers.length === 0) {
                //如果全部导入的 消除记录
                undefined_map.delete(index);
            }
            else {
                // 还有剩余就修改记录
                info.undefined_variables = un_resolve_specifiers;
            }
            // 开始导入代码
            const import_info = {
                index: fileindex,
                specifiers: resolve_specifiers,
            };
            const change_file = export_hashmap.get(index);
            if (change_file) {
                change_file.code = (0, print_1.add_import)(change_file.code, [import_info]);
            }
            else {
                throw new Error(`can not find code by index in the export_hashmap : ${index}`);
            }
        }
    }
}
