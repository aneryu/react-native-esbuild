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
/**
 * 调用 esbuild 去打包 plugin entry 的方法 支持 tree-shaking
 *
 * @param entryPoints 打包入口
 * @param outfile 出口文件
 * @returns esbuild 打包结果
 */
function makebundle(entryPoints, outfile) {
    return __awaiter(this, void 0, void 0, function* () {
        // 兼容 metro 的 插件
        const plugins = [(0, resolve_platform_1.platform_ResolvePlugin)("ios"), (0, metro_preset_1.metro_perset_plugin)()];
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
            "*.png", // PS: ignore png !!!
        ];
        // external packages
        const external = [...common_external, ...cjs_external, ...custom_external];
        // 构建 主流程
        const res = yield esbuild.build({
            entryPoints,
            bundle: true,
            outfile,
            sourcemap: true,
            platform: "neutral",
            target: "es6",
            sourceRoot: "/Users/jason.zhu/Desktop/company/product-page/",
            absWorkingDir: "/Users/jason.zhu/Desktop/company/product-page/",
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
    });
}
exports.makebundle = makebundle;
