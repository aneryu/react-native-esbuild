"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platform_ResolvePlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * esbuild support platform resolve plugin about module-resolver ios|android
 * @param platform ios|android
 * @returns
 */
const platform_ResolvePlugin = (platform) => {
    return {
        name: "reactnatie-resolve-plugin",
        setup(build) {
            build.onResolve({ filter: /.*/ }, (arg) => __awaiter(this, void 0, void 0, function* () {
                if (arg.importer.includes("node_modules")) {
                    const extname = path_1.default.extname(arg.importer);
                    const import_extname = path_1.default.extname(arg.path);
                    if ((arg.kind == "import-statement" || arg.kind == "require-call") &&
                        import_extname === "") {
                        if (extname.includes("js") ||
                            extname.includes("jsx") ||
                            extname.includes("tsx") ||
                            extname.includes("ts")) {
                            if (arg.path.startsWith("./") || arg.path.startsWith("../")) {
                                if (!ehance_resolve(arg.importer, arg.path)) {
                                    const final_filepath = ehance_native_resolve(arg.importer, arg.path, platform);
                                    return { path: final_filepath };
                                }
                            }
                        }
                    }
                }
                return undefined;
            }));
        },
    };
};
exports.platform_ResolvePlugin = platform_ResolvePlugin;
function ehance_resolve(basepath, filepath) {
    const joinpath = path_1.default.resolve(path_1.default.dirname(basepath), filepath);
    const trypath = [
        joinpath + ".js",
        joinpath + ".jsx",
        joinpath + ".ts",
        joinpath + ".tsx",
        joinpath + "/index.js",
        joinpath + "/index.jsx",
        joinpath + "/index.ts",
        joinpath + "/index.tsx",
    ];
    if (trypath.map((p) => fs_1.default.existsSync(p)).filter((x) => x === true).length == 0) {
        return false;
    }
    return true;
}
function ehance_native_resolve(basepath, filepath, platform) {
    let existpath = "";
    const joinpath = path_1.default.resolve(path_1.default.dirname(basepath), filepath);
    const trypath = [
        joinpath + "." + platform + ".js",
        joinpath + "." + platform + ".jsx",
        joinpath + "." + platform + ".ts",
        joinpath + "." + platform + ".tsx",
        joinpath + "." + platform + "/index.js",
        joinpath + "." + platform + "/index.jsx",
        joinpath + "." + platform + "/index.ts",
        joinpath + "." + platform + "/index.tsx",
    ];
    for (let p of trypath) {
        if (fs_1.default.existsSync(p)) {
            existpath = p;
            break;
        }
    }
    if (existpath === "") {
        throw new Error(`"can't find ${basepath} and ${filepath} to platform ${platform} file exist file system!"` +
            "\n");
    }
    return existpath;
}
