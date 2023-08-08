"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowRemoveTypesPlugin = exports.FlowExternalPlugin = void 0;
const resolve_diskpath_1 = require("./resolve_diskpath");
const path_1 = __importDefault(require("path"));
const flowRemoveTypes = require("flow-remove-types");
const FlowExternalPlugin = (js_flow_files) => {
    return {
        name: "flow-external-plugin",
        type: "resolve-plugin",
        stage: 10,
        hook: (build, arg) => {
            if (arg.kind === "import-statement") {
                const en_resolver = Reflect.get(build.initialOptions, "enhance_resolver");
                const res = (0, resolve_diskpath_1.resolve_diskpath)(en_resolver, arg.path, arg.importer);
                if (res) {
                    const forbidlist = js_flow_files.map((item) => {
                        return path_1.default.resolve(build.initialOptions.absWorkingDir, item);
                    });
                    if (forbidlist.includes(res)) {
                        return {
                            path: arg.path,
                            external: true,
                        };
                    }
                }
            }
            return { path: arg.path };
        },
    };
};
exports.FlowExternalPlugin = FlowExternalPlugin;
const FlowRemoveTypesPlugin = {
    name: "flow-remove-types-plugin",
    type: "load-plugin",
    stage: 1,
    hook: (_build, arg) => {
        if (arg.path.endsWith(".js")) {
            const code = flowRemoveTypes(arg.pluginData.code, {
                all: true,
            }).toString();
            return {
                contents: code,
                loader: "tsx",
                pluginData: {
                    code: code,
                    loader: "tsx",
                },
            };
        }
        return undefined;
    },
};
exports.FlowRemoveTypesPlugin = FlowRemoveTypesPlugin;
