import path from "node:path";
import fs from "node:fs";
import { findUndefinedVariables } from "../src/eslint";

async function main() {
  const filepath = path.join(__dirname, "index.js");
  const code = fs.readFileSync(filepath, "utf-8").toString();
  const undefinedVariables = await findUndefinedVariables(code);
  console.log("Undefined variables:", undefinedVariables);
}

main();
