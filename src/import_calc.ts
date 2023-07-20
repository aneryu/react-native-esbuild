import path from "node:path";
import fs from "node:fs";
import * as esbuild from "esbuild";
import resolve from "enhanced-resolve";

let en_reolver: resolve.ResolveFunction | undefined = undefined;
let import_recording: Map<string, string[]> | undefined = undefined;

/**
 *
 * @param resolve_sys
 * @param path_value
 * @param importer
 * @returns
 */
function resolve_diskpath(
  resolve_sys: resolve.ResolveFunction,
  path_value: string,
  importer: string
) {
  const dir = path.dirname(importer);
  const res = resolve_sys(dir, path_value);
  return res;
}

/**
 * handle import alias like '~/assets'
 */
function handle_import_alias(workdir: string) {
  const alias_config_path = path.resolve(workdir, "./alias.config.js");
  if (fs.existsSync(alias_config_path)) {
    const alias_config = require(alias_config_path)?.alias;
    let esbuild_alias_config: { [key: string]: string } = {};
    Object.entries(alias_config).forEach(([key, value]) => {
      esbuild_alias_config[key] = path.resolve(workdir, value as string);
    });
    return esbuild_alias_config;
  } else {
    console.warn(`alias.config.js not exist in ${workdir}!`);
    return {};
  }
}

/**
 * esbuild plugin import recording file location and disk location
 * @returns
 */
const import_recording_plugin = () => {
  return {
    name: "reactnatie-resolve-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onStart(() => {
        en_reolver = resolve.create.sync({
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: handle_import_alias(build.initialOptions.absWorkingDir!),
        });
        import_recording = new Map();
        Reflect.set(build.initialOptions, "import_records", import_recording);
      });
      build.onResolve({ filter: /.*/ }, async (arg: esbuild.OnResolveArgs) => {
        // console.log(arg.path, '\n', arg.kind);
        if (arg.kind === "import-statement") {
          const res = resolve_diskpath(en_reolver!, arg.path, arg.importer);
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
