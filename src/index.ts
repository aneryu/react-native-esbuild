import { makebundle } from "./metro_esbuild";
import path from "node:path";

interface ITestCase {
  entryPoints: string[];
  workdir: string;
}

enum TestCase {
  "productpage",
  "AwesomeProject",
  "myplugin",
}

function getCase(casename: TestCase): ITestCase {
  switch (casename) {
    case TestCase.productpage:
      return {
        entryPoints: [
          "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/src/index.ts",
        ],
        workdir:
          "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/",
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
        workdir:
          "/Users/jason.zhu/Desktop/company/product-page/plugins/product-page/",
      };
  }
}

const { entryPoints, workdir } = getCase(TestCase.myplugin);
if (process.env.NodeBundle === "true") {
  const outputfile2 = path.resolve(__dirname, "../output/lib.js");
  makebundle(entryPoints, outputfile2, workdir, true)
    .then((res) => {
      // res.outputFiles.map(file => { console.log(file.text.toString()) });
      console.log(`\n build success!`);
    })
    .catch((err) => {
      console.log(`err--->\n ${err}`);
    });
} else {
  const outputfile = path.resolve(__dirname, "../temp/demo.js");
  makebundle(entryPoints, outputfile, workdir)
    .then((res) => {
      // res.outputFiles.map(file => { console.log(file.text.toString()) });
      console.log(`\n build success!`);
    })
    .catch((err) => {
      console.log(`err--->\n ${err}`);
    });
}
