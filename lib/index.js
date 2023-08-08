"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const metro_esbuild_1 = require("./metro_esbuild");
const node_path_1 = __importDefault(require("node:path"));
const external_flow_1 = require("./external_flow");
const js_flow_files = [
    "packages/App/redux/user/reducer.js",
    "packages/shared/redux/account/actions.js",
    "workspaces/components/components-apm-cardcenter/src/components/DetailSection/index.js",
    "workspaces/components/components-payment-selection/src/Components/PaymentMethodRow/PaymentMethodParentRow/WalletParentRow/index.js",
    "workspaces/components/components-payment-selection/src/Components/LinkedBankAccountRow/index.js",
    "workspaces/components/components-payment-selection/src/Components/SPMWalletRow/index.js",
    "packages/App/Components/PageComponent.js",
    "packages/App/Utils/navigateRN.js",
    "packages/shared/api/index.js",
    "packages/App/Wallet/WalletController.js",
    "packages/@shopee/user-redux/src/selectors.js",
    "packages/App/Utils/Sharing/genericSharing.js",
    "packages/root/WalletShopee/PinInput/config.js",
    "packages/SRNPlatform/NativeViews/index.js",
    "packages/App/ShopeeContainer/ConnectPageState.js",
    "packages/App/WalletAirpay/TransactionDetail/WalletWithdrawalDetail/utils.js",
    "packages/App/WalletAirpay/WalletHome/index.js",
];
var TestCase;
(function (TestCase) {
    TestCase[TestCase["productpage"] = 0] = "productpage";
    TestCase[TestCase["AwesomeProject"] = 1] = "AwesomeProject";
    TestCase[TestCase["myplugin"] = 2] = "myplugin";
    TestCase[TestCase["shopeepay"] = 3] = "shopeepay";
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
        case TestCase.shopeepay:
            return {
                entryPoints: [
                    "/Users/jason.zhu/Desktop/company/shopeepay-plugin/bundles/shopee/src/index.ts",
                ],
                workdir: "/Users/jason.zhu/Desktop/company/shopeepay-plugin/",
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
const caseName = TestCase.shopeepay;
const { entryPoints, workdir } = getCase(caseName);
let user_plugin = [];
let extra_externals = [];
// 打印 依赖图 的日志
process.env.WRITE_LOG_INFO = "true";
// 忽略剩余 含有未定义的变量
process.env.IGNORE_CHECK_VARS = "true";
if (caseName == TestCase.shopeepay) {
    user_plugin = [
        ...user_plugin,
        (0, external_flow_1.FlowExternalPlugin)(js_flow_files),
        external_flow_1.FlowRemoveTypesPlugin,
    ];
}
else if (caseName == TestCase.productpage) {
    user_plugin = [
        ...user_plugin,
        (0, external_flow_1.FlowExternalPlugin)(js_flow_files),
        external_flow_1.FlowRemoveTypesPlugin,
    ];
    extra_externals = [
        ...extra_externals,
        "@shopee-rn/recommendation-item-sdk",
        "@shopee/rn-recommendation-ftss",
        "@shopee/product-price",
        "@shopee/item-card-types",
    ];
}
const IF_BUNDLE = ((_a = process.env.NodeBundle) !== null && _a !== void 0 ? _a : "false") === "true";
(0, metro_esbuild_1.makebundle)(entryPoints, IF_BUNDLE
    ? node_path_1.default.resolve(__dirname, "../output/lib.js")
    : node_path_1.default.resolve(__dirname, "../temp/demo.js"), workdir, "ios", IF_BUNDLE, user_plugin, extra_externals)
    .then((res) => {
    // res.outputFiles.map(file => { console.log(file.text.toString()) });
    console.log(`\n build success!`);
})
    .catch((err) => {
    console.log(`err--->\n ${err}`);
});
