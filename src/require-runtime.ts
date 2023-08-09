import { parse } from "@babel/parser";
import * as _babel_types from "@babel/types";
import generate from "@babel/generator";
import traverse, { NodePath } from "@babel/traverse";

/**
 * 将__require转换为require
 * @param code
 */
function require_runtime(code: string) {
  let ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "flow"],
    allowImportExportEverywhere: true,
    allowUndeclaredExports: true,
  });
  traverse(ast, {
    enter(path: NodePath<_babel_types.Node>) {
      if (path.isCallExpression(path.node)) {
        if (
          path.node.callee.type === "Identifier" &&
          path.node.callee.name === "__require"
        ) {
          path.node.callee.name = "require";
        }
      }
    },
  });
  const res = generate(ast, { compact: false, comments: true }, code);
  return res.code;
}

export { require_runtime };
