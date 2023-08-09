import { export_calc } from "./export_calc";
import { resolve_disk_path } from "./disk_path";
import { print_import_code } from "./print";
import { react_runtime } from "./react-runtime";
import { AdditionalInfo, ExportInfo } from "./interface/codeinfo";
import path from "node:path";
import fs from "node:fs";
import { compose_transform } from "./compose";
import { require_runtime } from "./require-runtime";

/**
 * split esbuild code accroding //file:xxx.ts as mark
 * @param code esbuild output code string
 * @param external_packages
 * @returns
 */
async function split_esbuild_output_chunk(
  code: string,
  working_dir: string,
  import_records: Map<string, string[]>
): Promise<Map<number, ExportInfo>> {
  //begin split
  // support circular reference
  const undefined_map = new Map<number, AdditionalInfo>();
  const export_hashmap = new Map<number, ExportInfo>();
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
          if (
            char_perfix_txt.endsWith(".ts\n") ||
            char_perfix_txt.endsWith(".js\n") ||
            char_perfix_txt.endsWith(".mjs\n") ||
            char_perfix_txt.endsWith(".jsx\n") ||
            char_perfix_txt.endsWith(".tsx\n") ||
            char_perfix_txt.endsWith(".json\n")
          ) {
            if (stream.trim() !== "") {
              const diskpath = resolve_disk_path(file_location, working_dir);
              const temp_code = await print_import_code({
                code: stream,
                filepath: diskpath,
                file_index,
                export_hashmap,
                undefined_map,
              });
              const export_res = export_calc(
                temp_code,
                file_index,
                undefined_map,
                export_hashmap
              );
              const final_code = compose_transform(
                export_res.code,
                react_runtime,
                require_runtime
              );
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
          } else {
            char_perfix_txt = "";
            break;
          }
        }
      }
    }
    if (i === content.length - 1) {
      const diskpath = resolve_disk_path(file_location, working_dir);
      const temp_code = await print_import_code({
        code: stream,
        filepath: diskpath,
        file_index,
        export_hashmap,
        undefined_map,
      });
      const export_res = export_calc(
        temp_code,
        file_index,
        undefined_map,
        export_hashmap
      );
      const final_code = compose_transform(
        export_res.code,
        react_runtime,
        require_runtime
      );
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
}

function check_undefined(
  map: Map<number, AdditionalInfo>,
  export_map: Map<number, ExportInfo>
) {
  const object: any = {};
  const export_obj: any = {};
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
  if ((process.env.WRITE_LOG_INFO ?? "false") === "true") {
    const filepath = path.resolve(process.cwd(), "undefined_var.json");
    fs.writeFileSync(filepath, info);
    const export_filepath = path.resolve(process.cwd(), "export_var.json");
    fs.writeFileSync(export_filepath, export_info);
  }
  if (Object.keys(object).length > 0) {
    if ((process.env.IGNORE_CHECK_VARS ?? "false") === "true") {
      console.log(`undefined variables info --> \n ${info}`);
    } else {
      throw new Error(`undefined variables info --> \n ${info}`);
    }
  }
}

export { split_esbuild_output_chunk };
