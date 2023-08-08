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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposeLoadPlugin = exports.ComposeResolvePlugin = exports.ComposeStartPlugin = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
function ComposeStartPlugin(plugins) {
    return {
        name: "compose-start-plugin",
        setup(build) {
            let real_plugins = plugins.sort((a, b) => {
                return a.stage - b.stage;
            });
            build.onStart(() => __awaiter(this, void 0, void 0, function* () {
                for (const plugin of real_plugins) {
                    try {
                        yield plugin.hook(build);
                    }
                    catch (ex) {
                        throw new Error(`plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`);
                    }
                }
            }));
        },
    };
}
exports.ComposeStartPlugin = ComposeStartPlugin;
/**
 * compose esbuild resolve plugin
 * @param plugins
 * @returns
 */
function ComposeResolvePlugin(plugins) {
    return {
        name: "compose-resolve-plugin",
        setup(build) {
            let real_plugins = plugins.sort((a, b) => {
                return a.stage - b.stage;
            });
            build.onResolve({ filter: /.*/ }, (arg) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                let step_arg = arg;
                let perresovle_result = undefined;
                for (const plugin of real_plugins) {
                    try {
                        if (!((_a = perresovle_result === null || perresovle_result === void 0 ? void 0 : perresovle_result.external) !== null && _a !== void 0 ? _a : false)) {
                            if (!perresovle_result) {
                                perresovle_result = yield plugin.hook(build, step_arg);
                            }
                            else {
                                const temp_result = yield plugin.hook(build, Object.assign(Object.assign({}, step_arg), { path: (_b = perresovle_result === null || perresovle_result === void 0 ? void 0 : perresovle_result.path) !== null && _b !== void 0 ? _b : step_arg.path }));
                                if (temp_result) {
                                    perresovle_result = temp_result;
                                }
                            }
                            if ((perresovle_result === null || perresovle_result === void 0 ? void 0 : perresovle_result.external) && (perresovle_result === null || perresovle_result === void 0 ? void 0 : perresovle_result.path)) {
                                break;
                            }
                        }
                    }
                    catch (ex) {
                        throw new Error(`plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`);
                    }
                }
                return perresovle_result;
            }));
        },
    };
}
exports.ComposeResolvePlugin = ComposeResolvePlugin;
function ComposeLoadPlugin(plugins) {
    return {
        name: "compose-load-plugin",
        setup(build) {
            let real_plugins = plugins.sort((a, b) => {
                return a.stage - b.stage;
            });
            build.onLoad({ filter: /.*/ }, (arg) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                let step_arg = arg;
                const content = node_fs_1.default.readFileSync(arg.path, "utf-8").toString();
                step_arg.pluginData = Object.assign(Object.assign({}, step_arg.pluginData), { code: content });
                let perload_result = undefined;
                for (const plugin of real_plugins) {
                    try {
                        if (!perload_result) {
                            perload_result = yield plugin.hook(build, step_arg);
                        }
                        else {
                            const temp_result = yield plugin.hook(build, Object.assign(Object.assign({}, step_arg), { pluginData: perload_result.pluginData }));
                            if (temp_result) {
                                perload_result = Object.assign(Object.assign({}, temp_result), { loader: (_a = temp_result === null || temp_result === void 0 ? void 0 : temp_result.loader) !== null && _a !== void 0 ? _a : perload_result === null || perload_result === void 0 ? void 0 : perload_result.loader });
                            }
                        }
                    }
                    catch (ex) {
                        throw new Error(`plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`);
                    }
                }
                return perload_result;
            }));
        },
    };
}
exports.ComposeLoadPlugin = ComposeLoadPlugin;
