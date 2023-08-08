"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformResolvePlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const resolve_diskpath_1 = require("./resolve_diskpath");
const external_1 = require("./external");
/**
 * 递归查找 package.json 文件
 * @param dirpath
 * @returns
 */
function get_packagejson_dir(dirpath) {
    if (fs_1.default.existsSync(path_1.default.resolve(dirpath, "./package.json"))) {
        return dirpath;
    }
    else {
        return get_packagejson_dir(path_1.default.resolve(dirpath, "../"));
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
function is_external(filepath, frompath, importer, resolve, extra_external) {
    // example importpath: react-native
    const common_external = (0, external_1.get_external)("common_external");
    const custom_external = [
        ...(0, external_1.get_external)("custom_external"),
        ...extra_external,
    ];
    if (common_external.includes(frompath) ||
        custom_external.includes(frompath)) {
        return { external: true, type: "common" };
    }
    else if (custom_external.includes(frompath)) {
        return { external: true, type: "custom" };
    }
    const externals = [...common_external, ...custom_external];
    // example filepath: react-native/index.js
    const like_external = externals.find((item) => frompath.includes(item));
    if (like_external) {
        try {
            const res = resolve(like_external, importer);
            if (res) {
                const packagejson_dir = get_packagejson_dir(path_1.default.dirname(res));
                if (filepath.startsWith(packagejson_dir + "/")) {
                    if (common_external.includes(like_external)) {
                        return { external: true, type: "common" };
                    }
                    else {
                        return { external: true, type: "custom" };
                    }
                }
                else {
                    return { external: false, type: undefined };
                }
            }
            else {
                return { external: false, type: undefined };
            }
        }
        catch (ex) {
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
const PlatformResolvePlugin = (extra_external) => {
    return {
        name: "reactnatie-resolve-plugin",
        type: "resolve-plugin",
        stage: 0,
        hook: (build, arg) => {
            const extname = path_1.default.extname(arg.importer);
            const cjs_external = (0, external_1.get_external)("cjs_external");
            if (arg.kind == "import-statement" || arg.kind == "require-call") {
                if (extname.includes("js") ||
                    extname.includes("mjs") ||
                    extname.includes("jsx") ||
                    extname.includes("tsx") ||
                    extname.includes("ts")) {
                    const en_resolver = Reflect.get(build.initialOptions, "enhance_resolver");
                    if (cjs_external.includes(arg.path)) {
                        return { path: arg.path, external: true };
                    }
                    const internal_resolve = (from_path, importer_path) => {
                        return (0, resolve_diskpath_1.resolve_diskpath)(en_resolver, from_path, importer_path);
                    };
                    const res = internal_resolve(arg.path, arg.importer);
                    if (res) {
                        const if_external = is_external(res, arg.path, arg.importer, internal_resolve, extra_external);
                        if (if_external.external) {
                            return {
                                external: true,
                                path: if_external.type === "common" ? arg.path : res,
                            };
                        }
                        else {
                            return { path: res };
                        }
                    }
                }
            }
            return undefined;
        },
    };
};
exports.PlatformResolvePlugin = PlatformResolvePlugin;
