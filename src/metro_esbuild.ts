import * as esbuild from "esbuild";
import { PlatformResolvePlugin } from "./resolve_platform";
import { metro_perset_plugin } from "./metro_preset";
import { ImportRecordingPlugin } from "./import_calc";
import { EntryCalcPlugin, EntryAddConsole } from "./entry_console";
import { ImageResolvePlugin } from "./image_resolve";
import {
  ComposeLoadPlugin,
  ComposeResolvePlugin,
  ComposeStartPlugin,
} from "./compose";
import { ImportEnhanceResolvePlugin } from "./enhance_resolve";
import { get_external } from "./external";
import { CustomEsbuildPlugin } from "./interface/plugin";
import { CustomEsbuildResolvePlugin } from "./interface/resolve_plugin";
import { CustomEsbuildLoadPlugin } from "./interface/load_plugin";
import { CustomEsbuildStartPlugin } from "./interface/start_plugin";

/**
 * 调用 esbuild 去打包 plugin entry 的方法 支持 tree-shaking
 * @param entryPoints
 * @param outfile
 * @param workdir
 * @param user_plugins
 * @param extra_external
 * @param bundle
 * @returns
 */
async function makebundle(
  entryPoints: any,
  outfile: string,
  workdir: string,
  mobile_platform: "ios" | "android",
  bundle: boolean,
  user_plugins: CustomEsbuildPlugin[] = [],
  extra_external: string[] = [],
) {
  const user_resolve_plugins = user_plugins.filter(
    (x) => x.type === "resolve-plugin"
  ) as CustomEsbuildResolvePlugin[];

  const user_load_plugins = user_plugins.filter(
    (x) => x.type === "load-plugin"
  ) as CustomEsbuildLoadPlugin[];

  const user_start_plugins = user_plugins.filter(
    (x) => x.type === "start-plugin"
  ) as CustomEsbuildStartPlugin[];

  // 兼容 metro 的 插件
  const base_plugins = [
    ComposeStartPlugin([
      ImportEnhanceResolvePlugin(mobile_platform),
      EntryCalcPlugin,
      ...user_start_plugins,
    ]),
    ComposeResolvePlugin([
      ImportRecordingPlugin,
      ImageResolvePlugin,
      PlatformResolvePlugin(extra_external),
      ...user_resolve_plugins,
    ]),
    ComposeLoadPlugin([EntryAddConsole, ...user_load_plugins]),
  ];

  const plugins = [...base_plugins, metro_perset_plugin()];

  // external packages
  const external = [
    ...get_external("common_external"),
    ...get_external("cjs_external"),
    ...get_external("custom_external"),
    ...extra_external,
  ];

  // 构建 主流程
  const res = await esbuild.build({
    entryPoints,
    bundle: true,
    outfile,
    sourcemap: true,
    metafile: true,
    platform: "neutral",
    logLevel: "error",
    write: bundle ? true : false,
    target: "es6",
    sourceRoot: workdir,
    absWorkingDir: workdir,
    mainFields: ["browser", "module", "main"],
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
      ".js": "js",
      ".jsx": "jsx",
      ".json": "json",
    },
    // @ts-ignore
    plugins: bundle ? base_plugins : plugins,
    external,
  });

  return res;
}

export { makebundle };
