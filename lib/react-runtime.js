"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.react_runtime = void 0;
const parser_1 = require("@babel/parser");
const generator_1 = __importDefault(require("@babel/generator"));
const traverse_1 = __importDefault(require("@babel/traverse"));
/**
 * import React from 'react';
 * for jsx file
 * @param code
 */
function react_runtime(code) {
    let ast = (0, parser_1.parse)(code, {
        sourceType: "module",
        plugins: ["jsx", "flow"],
        allowImportExportEverywhere: true,
        allowUndeclaredExports: true,
    });
    let need_add_runtime = false;
    let runtime_exists = false;
    let root = undefined;
    (0, traverse_1.default)(ast, {
        enter: (path) => {
            if (path.isProgram(path.node)) {
                root = path;
            }
            if (path.isJSXElement(path.node) && !need_add_runtime) {
                need_add_runtime = true;
            }
            if (path.isImportDeclaration(path.node) &&
                path.parent.type === "Program" &&
                path.node.source.value === "react") {
                if (path.node.specifiers.filter((s) => s.type === "ImportDefaultSpecifier").length === 0) {
                    runtime_exists = true;
                }
            }
        },
    });
    if (need_add_runtime && !runtime_exists) {
        root.node.body.unshift({
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportDefaultSpecifier",
                    local: {
                        type: "Identifier",
                        name: "React",
                    },
                },
            ],
            source: {
                type: "StringLiteral",
                extra: {
                    rawValue: "react",
                    raw: `'react'`,
                },
                value: "react",
            },
        });
    }
    const res = (0, generator_1.default)(ast, { compact: false, comments: true }, code);
    return res.code;
}
exports.react_runtime = react_runtime;
