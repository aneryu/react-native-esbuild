import * as esbuild from "esbuild";
import { platform_ResolvePlugin } from "./resolve_platform";
import { metro_perset_plugin } from "./metro_preset";

/**
 * 调用 esbuild 去打包 plugin entry 的方法 支持 tree-shaking
 *
 * @param entryPoints 打包入口
 * @param outfile 出口文件
 * @returns esbuild 打包结果
 */
async function makebundle(entryPoints: any, outfile: string, workdir: string) {
  // 兼容 metro 的 插件
  const plugins = [
    platform_ResolvePlugin("ios"),
    metro_perset_plugin()
  ];

  // independent common packages
  const common_external = [
    "prop-types",
    "redux",
    "react",
    "react-redux",
    "react-native",
    "react-native-geocoder",
    "react-native-linear-gradient",
    "react-native-maps",
    "react-native-shimmer-placeholder",
    "@shopee/react-native-sdk",
    "@shopee-rn/app-env",
    "@shopee-rn/feature-toggles",
    "@shopee-rn/translation",
    "react-native-svg",
    "react-native-webview",
    "lottie-react-native",
    "@react-native-async-storage/async-storage",
    "@react-native-community/cameraroll",
    "@react-native-community/clipboard",
    "@react-native-community/netinfo",
    "@react-native-community/viewpager",
    "fetch_utils",
    "@shopee/global-env",
  ];
  // extra commonjs packages
  const cjs_external = ["zlib", "@shopee/item-redux"];

  // custom external packages
  const custom_external = [
    "@shopee-rn/ui-common",
    "@shopee/platform",
    "@shopee/rn-recommendation-item-card",
    "@shopee-rn/item-card",
    // "*.png", // PS: ignore png !!!
  ];

  // external packages
  const external = [...common_external, ...cjs_external, ...custom_external];

  // 构建 主流程
  const res = await esbuild.build({
    entryPoints,
    bundle: true,
    outfile,
    sourcemap: true,
    metafile: true,
    platform: "neutral",
    logLevel: "error",
    write: false,
    // write: true,
    target: "es6",
    sourceRoot: workdir,
    absWorkingDir: workdir,
    mainFields: ["main", "module"],
    loader: {
      ".png": "file",
      ".svg": "text",
      ".ts": "ts",
      ".tsx": "tsx",
      ".js": "tsx",
      ".jsx": "tsx",
      ".json": "json",
    },
    plugins,
    external,
  });

  return res;
}

export { makebundle };
