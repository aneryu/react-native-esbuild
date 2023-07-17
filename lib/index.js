"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metro_esbuild_1 = require("./metro_esbuild");
const node_path_1 = __importDefault(require("node:path"));
/**
 * 需要自己修改 主入口 可以是多入口
 */
const entryPoints = [
    // "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/src/index.ts",
    "/Users/zhushijie/Desktop/workspace/AwesomeProject/index.js"
];
const workdir = "/Users/zhushijie/Desktop/workspace/AwesomeProject/";
const outputfile = node_path_1.default.resolve(__dirname, "../temp/demo.js");
(0, metro_esbuild_1.makebundle)(entryPoints, outputfile, workdir)
    .then((res) => {
    // res.outputFiles.map(file => { console.log(file.text.toString()) });
    console.log(`\n build success!`);
})
    .catch((err) => {
    console.log(`err--->\n ${err}`);
});
