"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_external = void 0;
// independent common packages
const common_external = [
    "prop-types",
    "redux",
    "react-redux",
    "react-native-geocoder",
    "react-native-linear-gradient",
    "react-native-maps",
    "react-native-shimmer-placeholder",
    "react-native",
    "@shopee/react-native-sdk",
    "@shopee-rn/app-env",
    "@shopee-rn/feature-toggles",
    "@shopee-rn/translation",
    "react-native-svg",
    "react-native-webview",
    "lottie-react-native",
    "@react-native-async-storage/async-storage",
    "@react-native-community/cameraroll",
    "@react-native-community/clipboard",
    "@react-native-community/netinfo",
    "@react-native-community/viewpager",
    "fetch_utils",
    "@shopee/global-env",
    "react",
];
// extra commonjs packages
const cjs_external = [
    "zlib",
    "http",
    "https",
    "fs",
    "net",
    "tty",
    "url",
    "stream",
    "assert",
    "crypto",
    "fetch_utils",
    "@shopee/platform",
];
// custom external packages
const custom_external = [
    "@shopee/item-redux",
    "@shopee-rn/ui-common",
    "@shopee/platform",
    "@shopee/rn-recommendation-item-card",
    "@shopee-rn/item-card",
    "*.png",
    "*.jpg",
    "*.gif",
    "*.js",
];
function get_external(type) {
    switch (type) {
        case "cjs_external":
            return cjs_external;
        case "common_external":
            return common_external;
        case "custom_external":
            return custom_external;
    }
}
exports.get_external = get_external;
