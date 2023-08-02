import resolve from "enhanced-resolve";
import { resolve_diskpath } from "../src/resolve_diskpath";

const platform = "ios";
const en_resolver = resolve.create.sync({
  extensions: [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".mjs",
    `.${platform}.js`,
    `.${platform}.jsx`,
    `.${platform}.ts`,
    `.${platform}.tsx`,
    `.${platform}.mjs`,
    ".node",
    ".json",
  ],
  conditionNames: [
    "import",
    "browser",
    "require",
    "default",
    "module",
    "node",
    "webpack",
  ],
  alias: {},
  mainFields: ["browser", "module", "main"],
  aliasFields: ["browser"],
  exportsFields: ["exports"],
});

const filepath =
  "/Users/jason.zhu/Desktop/company/shopeepay-plugin/node_modules/react-native-qrcode-svg/index.js";
const import_path = "qrcode";

const res = resolve_diskpath(en_resolver, import_path, filepath);

console.log(res);
