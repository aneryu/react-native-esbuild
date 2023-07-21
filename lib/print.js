"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fix_entry_code = exports.replace_space = exports.print_import_code = void 0;
const parser_1 = require("@babel/parser");
const generator_1 = __importDefault(require("@babel/generator"));
const traverse_1 = __importDefault(require("@babel/traverse"));
/**
 *
 * @param code
 * @returns
 */
function replace_space(code) {
    return code.replace(/[\r\n]/g, "").replace(/\ +/g, "");
}
exports.replace_space = replace_space;
/**
 * get import files
 * @param filepath
 * @param import_hashmap
 * @returns
 */
function get_import_files(filepath, import_hashmap) {
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
function get_esbuild_runtime(export_hashmap) {
    const export_infos = Array.from(export_hashmap.values());
    const runtime_info = export_infos.find((export_info) => export_info.file_location === "esbuild_runtime");
    return runtime_info;
}
/**
 * get dependent files
 * @param import_files
 * @param export_hashmap
 */
function get_dependent_files(import_files, export_hashmap) {
    const export_infos = Array.from(export_hashmap.values());
    const dependent_files = export_infos.filter((export_info) => {
        return import_files.includes(export_info.file_location);
    });
    return dependent_files;
}
function check_referenced(sp, ast) {
    let res = false;
    (0, traverse_1.default)(ast, {
        enter(path) {
            if (path.isIdentifier(path.node) && !path.parentPath.isObjectProperty()) {
                if (path.node.name === sp) {
                    res = true;
                }
            }
            else if (path.isJSXIdentifier(path.node)) {
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
function check_and_add_specifiers_referenced(ast, spec) {
    (0, traverse_1.default)(ast, {
        enter(path) {
            if (path.isProgram()) {
                spec.forEach((info) => {
                    const specifiers = [];
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
                        });
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
function add_import(code, ast, specifiers) {
    if (specifiers.length > 0) {
        check_and_add_specifiers_referenced(ast, specifiers);
    }
    try {
        const res = (0, generator_1.default)(ast, { compact: false, comments: true }, code);
        return res.code;
    }
    catch (e) {
        throw new Error(`generate code error: ${e} \n code: ${code}`);
    }
}
/**
 * fix entry code
 * @param code
 */
function fix_entry_code(code) {
    var _a;
    const regex = /^export\s+{([^}]+)}\s*;?$/gm;
    const res = code.match(regex);
    if ((_a = res === null || res === void 0 ? void 0 : res.length) !== null && _a !== void 0 ? _a : 0 > 0) {
        let spec = [];
        let new_code = "";
        res.forEach((item) => {
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
    }
    else {
        return code;
    }
}
exports.fix_entry_code = fix_entry_code;
/**
 * genrate import code
 * @param param0
 * @returns
 */
function print_import_code({ code, filepath, file_index, export_hashmap, import_hashmap, }) {
    let handle_code = code;
    let ast;
    try {
        ast = (0, parser_1.parse)(handle_code, {
            sourceType: "module",
            plugins: ["jsx", "flow"],
            allowImportExportEverywhere: true,
            allowUndeclaredExports: true,
        });
    }
    catch (e) {
        throw new Error(`parse code error: ${e} \n index: ${file_index} \n file: ${filepath} \n code: ${code}`);
    }
    const import_specifiers = [];
    const runtime_info = get_esbuild_runtime(export_hashmap);
    // 如果esbuild 产生了 runtime  就需要额外去处理 runtime导出的函数
    if (runtime_info && filepath !== "esbuild_runtime") {
        const runtime_specifiers = runtime_info.export_specifiers;
        if (runtime_specifiers.length > 0) {
            import_specifiers.push({
                index: runtime_info.index,
                specifiers: runtime_specifiers,
            });
        }
    }
    // 拿到曾经依赖文件的路径
    const import_files = get_import_files(filepath, import_hashmap);
    const import_res = get_dependent_files([...import_files, filepath], // 一定要包含 自己的路径
    export_hashmap);
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
        handle_code = add_import(handle_code, ast, import_specifiers);
    }
    return handle_code;
}
exports.print_import_code = print_import_code;
