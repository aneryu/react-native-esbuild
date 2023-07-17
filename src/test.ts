import { ParseResult, parse } from "@babel/parser";
import * as _babel_types from "@babel/types";
import traverse from "@babel/traverse";

const code = `
enabledPrefillRevamp && prefillKeywordsArray && prefillKeywordsArray.length > 1 ? /* @__PURE__ */React692.createElement(PrefillKeywordsCarousel, {
  prefillKeywords: prefillKeywordsArray,
  displayedIndex,
  setDisplayedIndex,
  startPrefillAnimation,
  setStartPrefillAnimation
}) : null
`;

const code2 = `
import {c} from "abc";
// console.log(c)
// const abc = {
//  name: c,
// }
`;

function test(code: string, sp: string) {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "flow"],
  });
  traverse(ast, {
    enter(path) {
      // if (path.isIdentifier(path.node)) {
      //   if (path.node.name === sp && path.parentPath.isObjectProperty()) {
      //     console.log(`true`);
      //   }
      // }
      if (path.parent.type === "Program") {
        console.log(path.scope.getBinding(sp)?.referenced);
      }
    },
  });
}

// test(code, "prefillKeywords");
test(code2, "c");
