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
exports.split_esbuild_output_chunk = void 0;
const export_calc_1 = require("./export_calc");
const disk_path_1 = require("./disk_path");
const print_1 = require("./print");
const react_runtime_1 = require("./react-runtime");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
/**
 * split esbuild code accroding //file:xxx.ts as mark
 * @param code esbuild output code string
 * @param external_packages
 * @returns
 */
function split_esbuild_output_chunk(code, working_dir, import_records) {
    return __awaiter(this, void 0, void 0, function* () {
        //begin split
        // support circular reference
        const undefined_map = new Map();
        const export_hashmap = new Map();
        const content = "\n" + code;
        let stream = "";
        let file_location = "esbuild_runtime";
        let file_index = 0;
        for (let i = 0; i < content.length; i++) {
            const char_txt = content[i];
            stream += char_txt;
            if (char_txt === "\n" && content[i + 1] + content[i + 2] === "//") {
                let char_perfix_txt = "";
                for (let x = i + 1; x < content.length; x++) {
                    const char_perfix = content[x];
                    char_perfix_txt += char_perfix;
                    if (char_perfix === "\n") {
                        if (char_perfix_txt.endsWith(".ts\n") ||
                            char_perfix_txt.endsWith(".js\n") ||
                            char_perfix_txt.endsWith(".mjs\n") ||
                            char_perfix_txt.endsWith(".jsx\n") ||
                            char_perfix_txt.endsWith(".tsx\n") ||
                            char_perfix_txt.endsWith(".json\n")) {
                            if (stream.trim() !== "") {
                                const diskpath = (0, disk_path_1.resolve_disk_path)(file_location, working_dir);
                                const temp_code = yield (0, print_1.print_import_code)({
                                    code: stream,
                                    filepath: diskpath,
                                    file_index,
                                    export_hashmap,
                                    undefined_map,
                                });
                                const export_res = (0, export_calc_1.export_calc)(temp_code, file_index, undefined_map, export_hashmap);
                                const final_code = (0, react_runtime_1.react_runtime)(export_res.code);
                                // link import from other js_file
                                export_hashmap.set(file_index, {
                                    index: file_index,
                                    file_location: diskpath,
                                    code: final_code,
                                    export_specifiers: export_res.specifiers,
                                });
                                file_index += 1;
                                stream = "";
                            }
                            file_location = char_perfix_txt.trim();
                            char_perfix_txt = "";
                        }
                        else {
                            char_perfix_txt = "";
                            break;
                        }
                    }
                }
            }
            if (i === content.length - 1) {
                const diskpath = (0, disk_path_1.resolve_disk_path)(file_location, working_dir);
                const temp_code = yield (0, print_1.print_import_code)({
                    code: stream,
                    filepath: diskpath,
                    file_index,
                    export_hashmap,
                    undefined_map,
                });
                const export_res = (0, export_calc_1.export_calc)(temp_code, file_index, undefined_map, export_hashmap);
                const final_code = (0, react_runtime_1.react_runtime)(export_res.code);
                export_hashmap.set(file_index, {
                    index: file_index,
                    file_location: diskpath,
                    code: final_code,
                    export_specifiers: [],
                });
                file_index += 1;
                stream = "";
            }
        }
        file_location = "";
        check_undefined(undefined_map, export_hashmap);
        return export_hashmap;
    });
}
exports.split_esbuild_output_chunk = split_esbuild_output_chunk;
function check_undefined(map, export_map) {
    var _a, _b;
    const object = {};
    const export_obj = {};
    for (const [key, value] of map) {
        object[key] = value;
    }
    for (const [key, value] of export_map) {
        export_obj[key] = {
            export: value.export_specifiers,
            file: value.file_location,
        };
    }
    const info = JSON.stringify(object, null, 2);
    const export_info = JSON.stringify(export_obj, null, 2);
    if (((_a = process.env.WRITE_LOG_INFO) !== null && _a !== void 0 ? _a : "false") === "true") {
        const filepath = node_path_1.default.resolve(process.cwd(), "undefined_var.json");
        node_fs_1.default.writeFileSync(filepath, info);
        const export_filepath = node_path_1.default.resolve(process.cwd(), "export_var.json");
        node_fs_1.default.writeFileSync(export_filepath, export_info);
    }
    if (Object.keys(object).length > 0) {
        if (((_b = process.env.IGNORE_CHECK_VARS) !== null && _b !== void 0 ? _b : "false") === "true") {
            console.log(`undefined variables info --> \n ${info}`);
        }
        else {
            throw new Error(`undefined variables info --> \n ${info}`);
        }
    }
}
