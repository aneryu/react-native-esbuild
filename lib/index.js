"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metro_esbuild_1 = require("./metro_esbuild");
const node_path_1 = __importDefault(require("node:path"));
var TestCase;
(function (TestCase) {
    TestCase[TestCase["productpage"] = 0] = "productpage";
    TestCase[TestCase["AwesomeProject"] = 1] = "AwesomeProject";
    TestCase[TestCase["myplugin"] = 2] = "myplugin";
})(TestCase || (TestCase = {}));
function getCase(casename) {
    switch (casename) {
        case TestCase.productpage:
            return {
                entryPoints: [
                    "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/src/index.ts",
                ],
                workdir: "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/",
            };
        case TestCase.AwesomeProject:
            return {
                entryPoints: [
                    "/Users/zhushijie/Desktop/workspace/AwesomeProject/index.js",
                ],
                workdir: "/Users/zhushijie/Desktop/workspace/AwesomeProject/",
            };
        case TestCase.myplugin:
            return {
                entryPoints: [
                    "/Users/jason.zhu/Desktop/react-native/my-plugin/src/index.ts",
                ],
                workdir: "/Users/jason.zhu/Desktop/react-native/my-plugin/",
            };
        default:
            return {
                entryPoints: [
                    "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/src/index.ts",
                ],
                workdir: "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/",
            };
    }
}
const { entryPoints, workdir } = getCase(TestCase.myplugin);
if (process.env.NodeBundle === "true") {
    const outputfile2 = node_path_1.default.resolve(__dirname, "../output/lib.js");
    (0, metro_esbuild_1.makebundle)(entryPoints, outputfile2, workdir, true)
        .then((res) => {
        // res.outputFiles.map(file => { console.log(file.text.toString()) });
        console.log(`\n build success!`);
    })
        .catch((err) => {
        console.log(`err--->\n ${err}`);
    });
}
else {
    const outputfile = node_path_1.default.resolve(__dirname, "../temp/demo.js");
    (0, metro_esbuild_1.makebundle)(entryPoints, outputfile, workdir)
        .then((res) => {
        // res.outputFiles.map(file => { console.log(file.text.toString()) });
        console.log(`\n build success!`);
    })
        .catch((err) => {
        console.log(`err--->\n ${err}`);
    });
}
