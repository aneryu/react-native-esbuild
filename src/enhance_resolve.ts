import { CustomEsbuildStartPlugin } from "./interface/start_plugin";
import path from "node:path";
import fs from "node:fs";
import resolve from "enhanced-resolve";

let en_resolver: resolve.ResolveFunction | undefined = undefined;
let import_recording: Map<string, string[]> | undefined = undefined;

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

const ImportEnhanceResolvePlugin: (
  platform: string
) => CustomEsbuildStartPlugin = (platform: string) => {
  return {
    name: "import_enhance_resolve_plugin",
    type: "start-plugin",
    stage: 0,
    hook: (build) => {
      en_resolver = resolve.create.sync({
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".mjs",
          `.${platform}.js`,
          `.${platform}.jsx`,
          `.${platform}.ts`,
          `.${platform}.tsx`,
          `.${platform}.mjs`,
          ".node",
          ".json",
        ],
        conditionNames: [
          "import",
          "browser",
          "require",
          "default",
          "module",
          "node",
          "webpack",
        ],
        alias: handle_import_alias(build.initialOptions.absWorkingDir!),
        mainFields: ["browser", "module", "main"],
        aliasFields: ["browser"],
        exportsFields: ["exports"],
      });
      import_recording = new Map();
      Reflect.set(build.initialOptions, "import_records", import_recording);
      Reflect.set(build.initialOptions, "enhance_resolver", en_resolver);
    },
  };
};

export { ImportEnhanceResolvePlugin, handle_import_alias };
