import fs from "fs";
import path from "path";
import { require_runtime } from "../src/require-runtime";
import { compose_transform } from "../src/compose";
import { react_runtime } from "../src/react-runtime";

const code = fs
  .readFileSync(path.resolve(__dirname, "../fixtures/require_demo.js"), "utf8")
  .toString();

const res = compose_transform(code, react_runtime, require_runtime);

console.log(res);
