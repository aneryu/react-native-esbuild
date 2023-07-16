"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose_esbuild_files = exports.compose_esbuild = void 0;
const babel_config_1 = require("./babel.config");
const lib_1 = require("./lib");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
/**
 * 根据 内存中 文件内容，生成 es5 代码集合
 * @param chunks  内存中 esbuild 每个文件的内容
 */
function compose_esbuild(chunks) {
    const es5_chunks = [];
    for (let code of chunks) {
        const eschunk = (0, lib_1.transform_babel)(code, babel_config_1.defaultConfig);
        if (eschunk) {
            es5_chunks.push(eschunk);
        }
    }
    return es5_chunks.map((n) => { var _a; return (_a = n.code) !== null && _a !== void 0 ? _a : ""; }).join("\n");
}
exports.compose_esbuild = compose_esbuild;
/**
 *  根据 硬盘上 文件内容，生成 es5 代码集合
 * @param chunk_files 本地es6文件路径集合
 */
function compose_esbuild_files(chunk_files) {
    const es5_chunks = [];
    for (let filepath of chunk_files) {
        if (!node_fs_1.default.existsSync(filepath)) {
            console.log(`file ${filepath} not exist`);
            continue;
        }
        const code = node_fs_1.default.readFileSync(node_path_1.default.resolve(filepath)).toString("utf-8");
        const eschunk = (0, lib_1.transform_babel)(code, babel_config_1.defaultConfig);
        if (eschunk) {
            es5_chunks.push(eschunk);
        }
    }
}
exports.compose_esbuild_files = compose_esbuild_files;
