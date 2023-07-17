import { export_calc } from './export_calc';
import { resolve_disk_path } from './disk_path';

interface ExportInfo {
  index: number;
  code: string;
  export_specifiers: string[];
  file_location: string;
}

/**
 * split esbuild code accroding //file:xxx.ts as mark
 * @param code esbuild output code string
 * @param external_packages
 * @returns
 */
function split_esbuild_output_chunk(
  code: string,
  working_dir: string,
  external_packages: string[] = []
): Map<number, ExportInfo> {
  //begin split
  const export_hashmap = new Map<number, ExportInfo>();
  const content = '\n' + code;
  let stream = '';
  let file_location = 'esbuild_runtime';
  let file_index = 0;

  for (let i = 0; i < content.length; i++) {
    const char_txt = content[i];
    stream += char_txt;
    if (char_txt === '\n' && content[i + 1] + content[i + 2] === '//') {
      let char_perfix_txt = '';
      for (let x = i + 1; x < content.length; x++) {
        const char_perfix = content[x];
        char_perfix_txt += char_perfix;

        if (char_perfix === '\n') {
          if (
            char_perfix_txt.endsWith('.ts\n') ||
            char_perfix_txt.endsWith('.js\n') ||
            char_perfix_txt.endsWith('.jsx\n') ||
            char_perfix_txt.endsWith('.tsx\n') ||
            char_perfix_txt.endsWith('.json\n')
          ) {
            if (stream.trim() !== '') {
              const export_res = export_calc(stream);
              export_hashmap.set(file_index, {
                index: file_index,
                file_location: resolve_disk_path(file_location, working_dir),
                code: export_res.code,
                export_specifiers: export_res.specifiers,
              });
              file_index += 1;
              stream = '';
            }
            file_location = char_perfix_txt.trim();
            char_perfix_txt = '';
          } else {
            char_perfix_txt = '';
            break;
          }
        }
      }
    }
    if (i === content.length - 1) {
      // const export_res = export_calc(stream);
      export_hashmap.set(file_index, {
        index: file_index,
        file_location: resolve_disk_path(file_location, working_dir),
        code: stream,
        export_specifiers: [],
      });
      file_index += 1;
      stream = '';
    }
  }
  file_location = '';

  return export_hashmap;
}

export { split_esbuild_output_chunk };
