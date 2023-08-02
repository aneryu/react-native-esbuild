"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_import_alias = exports.ImportEnhanceResolvePlugin = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const enhanced_resolve_1 = __importDefault(require("enhanced-resolve"));
let en_resolver = undefined;
let import_recording = undefined;
/**
 * handle import alias like '~/assets'
 */
function handle_import_alias(workdir) {
    var _a;
    const alias_config_path = node_path_1.default.resolve(workdir, "./alias.config.js");
    if (node_fs_1.default.existsSync(alias_config_path)) {
        const alias_config = (_a = require(alias_config_path)) === null || _a === void 0 ? void 0 : _a.alias;
        let esbuild_alias_config = {};
        Object.entries(alias_config).forEach(([key, value]) => {
            esbuild_alias_config[key] = node_path_1.default.resolve(workdir, value);
        });
        return esbuild_alias_config;
    }
    else {
        console.warn(`alias.config.js not exist in ${workdir}!`);
        return {};
    }
}
exports.handle_import_alias = handle_import_alias;
const ImportEnhanceResolvePlugin = (platform) => {
    return {
        name: "import_enhance_resolve_plugin",
        type: "start-plugin",
        stage: 0,
        hook: (build) => {
            en_resolver = enhanced_resolve_1.default.create.sync({
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
                alias: handle_import_alias(build.initialOptions.absWorkingDir),
                mainFields: ["browser", "module", "main"],
                aliasFields: ["browser"],
                exportsFields: ["exports"],
            });
            import_recording = new Map();
            Reflect.set(build.initialOptions, "import_records", import_recording);
            Reflect.set(build.initialOptions, "enhance_resolver", en_resolver);
        },
    };
};
exports.ImportEnhanceResolvePlugin = ImportEnhanceResolvePlugin;
