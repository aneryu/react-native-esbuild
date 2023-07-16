"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split_esbuild_output_chunk = void 0;
/**
 * 切割 esbuild 打包后的代码 根据 //file:xxx.ts 标记 切割
 * @param code esbuild 输出的代码
 * @returns
 */
function split_esbuild_output_chunk(code) {
    const content = code;
    //begin split
    let file_content = [];
    let stream = "";
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
                        char_perfix_txt.endsWith(".tsx\n")) {
                        file_content.push(stream);
                        stream = "";
                        char_perfix_txt = "";
                    }
                    else {
                        char_perfix_txt = "";
                        break;
                    }
                }
            }
        }
    }
    return file_content;
}
exports.split_esbuild_output_chunk = split_esbuild_output_chunk;
