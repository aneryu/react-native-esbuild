"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform_metro_with_file = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const split_1 = require("./split");
const compose_1 = require("./compose");
/**
 * 根据 esbuild 打包结果 去拆分 转化 加入 metro-prest-plugin
 * @param filepath
 * @returns
 */
function transform_metro_with_file(filepath) {
    if (!node_fs_1.default.existsSync(filepath)) {
        throw new Error(`file ${filepath} not exist`);
    }
    const chunks = (0, split_1.split_esbuild_output_chunk)(filepath);
    const rescode = (0, compose_1.compose_esbuild)(chunks);
    return rescode;
}
exports.transform_metro_with_file = transform_metro_with_file;
