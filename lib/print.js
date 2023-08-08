"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_import = exports.fix_entry_code = exports.replace_space = exports.print_import_code = void 0;
const parser_1 = require("@babel/parser");
const generator_1 = __importDefault(require("@babel/generator"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const eslint_1 = require("./eslint");
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
function get_import_files(undefined_vars, export_map) {
    const import_files = [];
    for (const [index, export_info] of export_map.entries()) {
        const resolve_vars = undefined_vars.filter((x) => export_info.export_specifiers.includes(x));
        import_files.push({ index, specifiers: resolve_vars });
    }
    return import_files;
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
 * check specifiers referenced
 * @param ast
 * @param spec
 */
function add_specifiers_referenced(ast, spec) {
    (0, traverse_1.default)(ast, {
        enter(path) {
            if (path.isProgram()) {
                spec.forEach((info) => {
                    const specifiers = [];
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
function add_import(code, specifiers, ast) {
    if (!ast) {
        try {
            ast = (0, parser_1.parse)(code, {
                sourceType: "module",
                plugins: ["jsx", "flow"],
                allowImportExportEverywhere: true,
                allowUndeclaredExports: true,
            });
        }
        catch (e) {
            throw new Error(`in add_import -> \n parse code error: ${e} \n code: ${code}`);
        }
    }
    if (specifiers.length > 0) {
        add_specifiers_referenced(ast, specifiers);
    }
    try {
        const res = (0, generator_1.default)(ast, { compact: false, comments: true }, code);
        return res.code;
    }
    catch (e) {
        throw new Error(`generate code error: ${e} \n code: ${code}`);
    }
}
exports.add_import = add_import;
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
function print_import_code({ code, filepath, file_index, export_hashmap, undefined_map, }) {
    return __awaiter(this, void 0, void 0, function* () {
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
        // Check the current code for undefined variables used to support circular references Continue to modify the code in the future
        const undefined_spec_list = yield (0, eslint_1.findUndefinedVariables)(handle_code);
        // currently exported possible dependent specifiers
        // base export specifiers calc import specifiers
        if (undefined_spec_list.length > 0) {
            const import_specifiers = get_import_files(undefined_spec_list, export_hashmap);
            const real_import_specifiers = [];
            // Process all symbols for undefined variables
            import_specifiers.forEach((item) => {
                const specifiers = item.specifiers;
                const real_specifiers = specifiers.filter((p) => undefined_spec_list.includes(p));
                real_import_specifiers.push({
                    index: item.index,
                    specifiers: real_specifiers,
                });
            });
            const still_undefined_spec_list = [];
            undefined_spec_list.forEach((item) => {
                if (!real_import_specifiers.some((p) => p.specifiers.includes(item))) {
                    still_undefined_spec_list.push(item);
                }
            });
            if (import_specifiers.length > 0) {
                handle_code = add_import(handle_code, real_import_specifiers, ast);
            }
            if (still_undefined_spec_list.length > 0) {
                undefined_map.set(file_index, {
                    undefined_variables: still_undefined_spec_list,
                });
            }
        }
        return handle_code;
    });
}
exports.print_import_code = print_import_code;
