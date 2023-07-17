"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split_esbuild_output_chunk = void 0;
const export_calc_1 = require("./export_calc");
const disk_path_1 = require("./disk_path");
const print_1 = require("./print");
/**
 * split esbuild code accroding //file:xxx.ts as mark
 * @param code esbuild output code string
 * @param external_packages
 * @returns
 */
function split_esbuild_output_chunk(code, working_dir, import_records) {
    //begin split
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
                        char_perfix_txt.endsWith(".jsx\n") ||
                        char_perfix_txt.endsWith(".tsx\n") ||
                        char_perfix_txt.endsWith(".json\n")) {
                        if (stream.trim() !== "") {
                            const diskpath = (0, disk_path_1.resolve_disk_path)(file_location, working_dir);
                            const temp_code = (0, print_1.print_import_code)({
                                code: stream,
                                filepath: diskpath,
                                file_index,
                                export_hashmap,
                                import_hashmap: import_records,
                            });
                            const export_res = (0, export_calc_1.export_calc)(temp_code, file_index);
                            // link import from other js_file
                            export_hashmap.set(file_index, {
                                index: file_index,
                                file_location: diskpath,
                                code: export_res.code,
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
            const temp_code = (0, print_1.print_import_code)({
                code: stream,
                filepath: diskpath,
                file_index,
                export_hashmap,
                import_hashmap: import_records,
            });
            const export_res = (0, export_calc_1.export_calc)(temp_code, file_index);
            export_hashmap.set(file_index, {
                index: file_index,
                file_location: diskpath,
                code: export_res.code,
                export_specifiers: [],
            });
            file_index += 1;
            stream = "";
        }
    }
    file_location = "";
    return export_hashmap;
}
exports.split_esbuild_output_chunk = split_esbuild_output_chunk;
