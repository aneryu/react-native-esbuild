"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makebundle = void 0;
const esbuild = __importStar(require("esbuild"));
const resolve_platform_1 = require("./resolve_platform");
const metro_preset_1 = require("./metro_preset");
const import_calc_1 = require("./import_calc");
const entry_console_1 = require("./entry_console");
const image_resolve_1 = require("./image_resolve");
const compose_1 = require("./compose");
const enhance_resolve_1 = require("./enhance_resolve");
const external_1 = require("./external");
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
function makebundle(entryPoints, outfile, workdir, mobile_platform, bundle, user_plugins = [], extra_external = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_resolve_plugins = user_plugins.filter((x) => x.type === "resolve-plugin");
        const user_load_plugins = user_plugins.filter((x) => x.type === "load-plugin");
        const user_start_plugins = user_plugins.filter((x) => x.type === "start-plugin");
        // 兼容 metro 的 插件
        const base_plugins = [
            (0, compose_1.ComposeStartPlugin)([
                (0, enhance_resolve_1.ImportEnhanceResolvePlugin)(mobile_platform),
                entry_console_1.EntryCalcPlugin,
                ...user_start_plugins,
            ]),
            (0, compose_1.ComposeResolvePlugin)([
                import_calc_1.ImportRecordingPlugin,
                image_resolve_1.ImageResolvePlugin,
                (0, resolve_platform_1.PlatformResolvePlugin)(extra_external),
                ...user_resolve_plugins,
            ]),
            (0, compose_1.ComposeLoadPlugin)([entry_console_1.EntryAddConsole, ...user_load_plugins]),
        ];
        const plugins = [...base_plugins, (0, metro_preset_1.metro_perset_plugin)()];
        // external packages
        const external = [
            ...(0, external_1.get_external)("common_external"),
            ...(0, external_1.get_external)("cjs_external"),
            ...(0, external_1.get_external)("custom_external"),
            ...extra_external,
        ];
        // 构建 主流程
        const res = yield esbuild.build({
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
    });
}
exports.makebundle = makebundle;
