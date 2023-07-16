import { makebundle } from "./metro_esbuild";
import path from "node:path";

/**
 * 需要自己修改 主入口 可以是多入口
 */
const entryPoints = [
  // "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/src/index.ts",
  "/Users/zhushijie/Desktop/workspace/AwesomeProject/index.js"
];
const workdir = "/Users/zhushijie/Desktop/workspace/AwesomeProject/";
const outputfile = path.resolve(__dirname, "../temp/demo.js");

makebundle(entryPoints, outputfile, workdir)
  .then((res) => {
    // res.outputFiles.map(file => { console.log(file.text.toString()) });
    console.log(`\n build success!`);
  })
  .catch((err) => {
    console.log(`err--->\n ${err}`);
  });
