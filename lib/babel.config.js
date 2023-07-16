"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = exports.config = void 0;
const path_1 = __importDefault(require("path"));
const alias = {
    fetch_utils: path_1.default.resolve(__dirname, "../dummy/fetch_utils"),
    "@shopee/global-env": path_1.default.resolve(__dirname, "../dummy/global_env"),
};
/**
 * babel config 原始配置文件
 * PS:
 * code 为 true 时，会返回 code 字段，否则返回 ast 字段
 * comments 为 true 时，会保留注释
 * compact 为 true 时，会移除不必要的空格和换行符
 */
const config = {
    ast: true,
    cloneInputAst: true,
    configFile: false,
    browserslistConfigFile: false,
    passPerPreset: false,
    comments: true,
    compact: false,
    assumptions: {},
    sourceType: "unambiguous",
    babelrc: false,
    code: true,
    highlightCode: true,
    caller: {
        name: "metro",
        platform: "ios",
    },
    filename: "demo.js",
    plugins: [
        [
            "module-resolver",
            {
                extensions: [".js", ".ts", ".tsx", ".ios.js", ".android.js"],
                alias,
            },
        ],
        [
            require.resolve("@babel/plugin-transform-flow-strip-types"),
            { all: true },
        ],
        require.resolve("@babel/plugin-proposal-export-namespace-from"),
        require.resolve("babel-plugin-jsx-control-statements"),
        require.resolve("babel-plugin-macros"),
        [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    ],
};
exports.config = config;
/**
 * babel config 默认最终配置文件
 * 加入了 metro-react-native-babel-preset 插件 为了兼容 metro
 */
const defaultConfig = Object.assign(Object.assign({}, config), { presets: [[require.resolve("metro-react-native-babel-preset")]] });
exports.defaultConfig = defaultConfig;
