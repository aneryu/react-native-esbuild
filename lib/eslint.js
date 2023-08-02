"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUndefinedVariables = void 0;
const eslint_1 = require("eslint");
function findUndefinedVariables(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const eslint = new eslint_1.ESLint({
            extensions: [".js"],
            useEslintrc: false,
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
        const results = yield eslint.lintText(code);
        const errorResults = results.filter((result) => result.errorCount > 0);
        const undefinedVariables = [];
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
                    if (!undefinedVariables.includes(spec) &&
                        !external_spec.includes(spec)) {
                        undefinedVariables.push(spec);
                    }
                }
            }
        }
        return undefinedVariables;
    });
}
exports.findUndefinedVariables = findUndefinedVariables;
