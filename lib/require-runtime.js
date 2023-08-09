"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.require_runtime = void 0;
const parser_1 = require("@babel/parser");
const generator_1 = __importDefault(require("@babel/generator"));
const traverse_1 = __importDefault(require("@babel/traverse"));
/**
 * 将__require转换为require
 * @param code
 */
function require_runtime(code) {
    let ast = (0, parser_1.parse)(code, {
        sourceType: "module",
        plugins: ["jsx", "flow"],
        allowImportExportEverywhere: true,
        allowUndeclaredExports: true,
    });
    (0, traverse_1.default)(ast, {
        enter(path) {
            if (path.isCallExpression(path.node)) {
                if (path.node.callee.type === "Identifier" &&
                    path.node.callee.name === "__require") {
                    path.node.callee.name = "require";
                }
            }
        },
    });
    const res = (0, generator_1.default)(ast, { compact: false, comments: true }, code);
    return res.code;
}
exports.require_runtime = require_runtime;
