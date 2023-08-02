import path from "path";
import fs from "fs";
import { CustomEsbuildResolvePlugin } from "./interface/resolve_plugin";
import { resolve_diskpath } from "./resolve_diskpath";
import { get_external } from "./external";

/**
 * 递归查找 package.json 文件
 * @param dirpath
 * @returns
 */
function get_packagejson_dir(dirpath: string): string {
  if (fs.existsSync(path.resolve(dirpath, "./package.json"))) {
    return dirpath;
  } else {
    return get_packagejson_dir(path.resolve(dirpath, "../"));
  }
}

/**
 *
 * @param filepath
 * @param frompath
 * @param importer
 * @param resolve
 * @param extra_external
 * @returns
 */
function is_external(
  filepath: string,
  frompath: string,
  importer: string,
  resolve: (from_path: string, importer_path: string) => string | false,
  extra_external: string[]
): { external: boolean; type: undefined | "common" | "custom" } {
  // example importpath: react-native
  const common_external = get_external("common_external");
  const custom_external = [
    ...get_external("custom_external"),
    ...extra_external,
  ];
  if (
    common_external.includes(frompath) ||
    custom_external.includes(frompath)
  ) {
    return { external: true, type: "common" };
  } else if (custom_external.includes(frompath)) {
    return { external: true, type: "custom" };
  }
  const externals = [...common_external, ...custom_external];
  // example filepath: react-native/index.js
  const like_external = externals.find((item) => frompath.includes(item));
  if (like_external) {
    try {
      const res = resolve(like_external, importer);
      if (res) {
        const packagejson_dir = get_packagejson_dir(path.dirname(res));
        if (filepath.startsWith(packagejson_dir + "/")) {
          if (common_external.includes(like_external)) {
            return { external: true, type: "common" };
          } else {
            return { external: true, type: "custom" };
          }
        } else {
          return { external: false, type: undefined };
        }
      } else {
        return { external: false, type: undefined };
      }
    } catch (ex) {
      return { external: false, type: undefined };
    }
  }
  return { external: false, type: undefined };
}

/**
 * esbuild support platform resolve plugin about module-resolver ios|android
 * @param platform ios|android
 * @returns
 */
const PlatformResolvePlugin: (
  extra_external: string[]
) => CustomEsbuildResolvePlugin = (extra_external) => {
  return {
    name: "reactnatie-resolve-plugin",
    type: "resolve-plugin",
    stage: 0,
    hook: (build, arg) => {
      const extname = path.extname(arg.importer);
      const cjs_external = get_external("cjs_external");
      if (arg.kind == "import-statement" || arg.kind == "require-call") {
        if (
          extname.includes("js") ||
          extname.includes("mjs") ||
          extname.includes("jsx") ||
          extname.includes("tsx") ||
          extname.includes("ts")
        ) {
          const en_resolver = Reflect.get(
            build.initialOptions,
            "enhance_resolver"
          );
          if (cjs_external.includes(arg.path)) {
            return { path: arg.path, external: true };
          }
          const internal_resolve = (
            from_path: string,
            importer_path: string
          ) => {
            return resolve_diskpath(en_resolver!, from_path, importer_path);
          };
          const res = internal_resolve(arg.path, arg.importer);
          if (res) {
            const if_external = is_external(
              res,
              arg.path,
              arg.importer,
              internal_resolve,
              extra_external
            );
            if (if_external.external) {
              return {
                external: true,
                path: if_external.type === "common" ? arg.path : res,
              };
            } else {
              return { path: res };
            }
          }
        }
      }
      return undefined;
    },
  };
};

export { PlatformResolvePlugin };
