import fs from "fs";
import path from "path";
import { findUndefinedVariables } from "../src/eslint";

const code = fs
  .readFileSync(path.resolve(__dirname, "../fixtures/eslint.js"), "utf8")
  .toString();

findUndefinedVariables(code).then((res) => {
  console.log(`res: \n ${res}`);
});
