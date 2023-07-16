import path from 'node:path';
import * as esbuild from 'esbuild';
import resolve from 'enhanced-resolve';

let en_reolver: resolve.ResolveFunction | undefined = undefined;
let import_recording: Map<string, string[]> | undefined = undefined;

/**
 *
 * @param resolve_sys
 * @param path_value
 * @param importer
 * @returns
 */
async function resolve_diskpath(
  resolve_sys: resolve.ResolveFunction,
  path_value: string,
  importer: string
) {
  const dir = path.dirname(importer);
  const res = resolve_sys(dir, path_value);
  return res;
}

/**
 * esbuild plugin import recording file location and disk location
 * @returns
 */
const import_recording_plugin = () => {
  return {
    name: 'reactnatie-resolve-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onStart(() => {
        en_reolver = resolve.create.sync({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        });
        import_recording = new Map();
      });
      build.onResolve({ filter: /.*/ }, async (arg: esbuild.OnResolveArgs) => {
        // console.log(arg.path, '\n', arg.kind);
        if (
          (build.initialOptions.external?.filter((exter) =>
            arg.path.includes(exter)
          ).length ?? 0) == 0 &&
          arg.kind === 'import-statement'
        ) {
          const res = await resolve_diskpath(
            en_reolver!,
            arg.path,
            arg.importer
          );
          if (res) {
            if (!import_recording?.has(arg.importer)) {
              import_recording!.set(arg.importer, [res]);
            } else {
              import_recording!.get(arg.importer)?.push(res);
            }
          }
        }
        return undefined;
      });
    },
  };
};
export { import_recording_plugin };
