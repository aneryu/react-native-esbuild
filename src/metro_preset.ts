import * as esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs';
import { split_esbuild_output_chunk } from './split';

/**
 * esbuild plugin support metro-preset
 * @returns
 */
const metro_perset_plugin = () => {
  return {
    name: 'metro-split-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onEnd((res) => {
        if (!res.errors || res.errors?.length === 0) {
          const { outputFiles } = res;
          outputFiles?.forEach((file) => {
            let entry_file_code = '';
            const lib_dir_path = path.resolve(path.dirname(file.path), 'lib');
            if (!fs.existsSync(lib_dir_path)) {
              fs.mkdirSync(lib_dir_path, { recursive: true });
            }
            if (file.path.endsWith('.js')) {
              let index = 1;
              const output_chunks_map = split_esbuild_output_chunk(
                file.text,
                build.initialOptions.absWorkingDir ?? process.cwd(),
                build.initialOptions.external ?? []
              );
              for (let [index, info] of output_chunks_map.entries()) {
                fs.writeFileSync(
                  path.resolve(lib_dir_path, `shopee${index}.js`),
                  info.code
                );
                entry_file_code += `import "./lib/shopee${index}.js";\n`;
              }
              fs.writeFileSync(file.path, entry_file_code);
            } else if (file.path.endsWith('.png')) {
              const png_file_path = path.resolve(
                path.dirname(file.path),
                'lib',
                path.basename(file.path)
              );
              fs.writeFileSync(png_file_path, file.text);
            } else {
              fs.writeFileSync(file.path, file.text);
            }
          });
          console.log('-----------> react-natie-esbuild process success! \n');
          return undefined;
        }
      });
    },
  };
};
export { metro_perset_plugin };
