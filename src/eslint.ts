import { ESLint } from "eslint";

async function findUndefinedVariables(code: string): Promise<string[]> {
  const eslint = new ESLint({
    extensions: [".js"], // 要分析的文件扩展名
    useEslintrc: false, // 不使用项目的 .eslintrc.js
    overrideConfig: {
      parser: "@babel/eslint-parser",
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env"],
        },
      },
      rules: {
        "no-undef": "error",
      },
    },
  });

  const results = await eslint.lintText(code);
  const errorResults = results.filter((result) => result.errorCount > 0);

  const undefinedVariables: string[] = [];
  const external_spec = [
    "define",
    "__DEV__",
    "globalThis",
    "__REACT_DEVTOOLS_GLOBAL_HOOK__",
    "chrome",
    "AggregateError",
    "Atomics",
    "BigInt",
    "FinalizationRegistry",
    "SharedArrayBuffer",
    "WeakRef",
    "regeneratorRuntime",
    //global var
    "getPartialRequest",
  ];

  for (const result of errorResults) {
    for (const message of result.messages) {
      if (message.ruleId === "no-undef") {
        var spec = message.message.split(" ")[0].replace(/'/g, "");
        if (
          !undefinedVariables.includes(spec) &&
          !external_spec.includes(spec)
        ) {
          undefinedVariables.push(spec);
        }
      }
    }
  }

  return undefinedVariables;
}

export { findUndefinedVariables };
