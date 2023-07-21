import { parse } from "@babel/parser";
import * as _babel_types from "@babel/types";
import generate from "@babel/generator";
import traverse, { NodePath } from "@babel/traverse";

/**
 * import React from 'react';
 * for jsx file
 * @param code
 */
function react_runtime(code: string) {
  let ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "flow"],
    allowImportExportEverywhere: true,
    allowUndeclaredExports: true,
  });
  let need_add_runtime = false;
  let runtime_exists = false;
  let root: NodePath<_babel_types.Program> | undefined = undefined;
  traverse(ast, {
    enter: (path) => {
      if (path.isProgram(path.node)) {
        root = path;
      }
      if (path.isJSXElement(path.node) && !need_add_runtime) {
        need_add_runtime = true;
      }
      if (
        path.isImportDeclaration(path.node) &&
        path.parent.type === "Program" &&
        path.node.source.value === "react"
      ) {
        if (
          path.node.specifiers.filter(
            (s) => s.type === "ImportDefaultSpecifier"
          ).length === 0
        ) {
          runtime_exists = true;
        }
      }
    },
  });
  if (need_add_runtime && !runtime_exists) {
    root!.node.body.unshift({
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
    } as any);
  }
  const res = generate(ast, { compact: false, comments: true }, code);
  return res.code;
}


export { react_runtime };