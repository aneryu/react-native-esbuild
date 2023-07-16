"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform_babel_file = exports.transform_babel = void 0;
const core_1 = require("@babel/core");
const fs_1 = __importDefault(require("fs"));
/**
 * 根据硬盘中的代码内容 生成 es5 支持 metro-preset 的代码
 * @param filepath 文件路径
 * @param config babel.config.js 配置
 * @returns babel {code,map,ast}
 */
function transform_babel_file(filepath, config = {}) {
    if (fs_1.default.existsSync(filepath)) {
        const code = fs_1.default.readFileSync(filepath).toString("utf-8");
        return transform_babel(code, config);
    }
    throw new Error(`file ${filepath} not exist`);
}
exports.transform_babel_file = transform_babel_file;
/**
 * 根据内存中的代码内容 生成 es5 支持 metro-preset 的代码
 * @param code 代码内容
 * @param config babel.config.js 配置
 * @returns babel {code,map,ast}
 */
function transform_babel(code, config = {}) {
    let sourceAst;
    try {
        sourceAst = (0, core_1.parseSync)(code, config);
    }
    catch (ex) {
        console.log(`parse has exception -> ${code}`);
        console.log(ex);
    }
    if (sourceAst) {
        const starttime = Date.now();
        const res = (0, core_1.transformFromAstSync)(sourceAst, code, config);
        const endtime = Date.now();
        if (process.env.TimeLog === "true") {
            console.log("wastime is :", (endtime - starttime) / 1000, "s");
            console.log("transform success ! ----------->");
        }
        return res;
    }
    else {
        throw new Error(`parse ast fail -> ${code}`);
    }
}
exports.transform_babel = transform_babel;
