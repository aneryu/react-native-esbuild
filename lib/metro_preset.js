"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metro_perset_plugin = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const split_1 = require("./split");
/**
 * esbuild plugin support metro-preset
 * @returns
 */
const metro_perset_plugin = () => {
    return {
        name: 'metro-split-plugin',
        setup(build) {
            build.onEnd((res) => {
                var _a;
                if (!res.errors || ((_a = res.errors) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    const { outputFiles } = res;
                    outputFiles === null || outputFiles === void 0 ? void 0 : outputFiles.forEach((file) => {
                        var _a, _b;
                        let entry_file_code = '';
                        const lib_dir_path = node_path_1.default.resolve(node_path_1.default.dirname(file.path), 'lib');
                        if (!node_fs_1.default.existsSync(lib_dir_path)) {
                            node_fs_1.default.mkdirSync(lib_dir_path, { recursive: true });
                        }
                        if (file.path.endsWith('.js')) {
                            let index = 1;
                            const output_chunks_map = (0, split_1.split_esbuild_output_chunk)(file.text, (_a = build.initialOptions.absWorkingDir) !== null && _a !== void 0 ? _a : process.cwd(), (_b = build.initialOptions.external) !== null && _b !== void 0 ? _b : []);
                            for (let [index, info] of output_chunks_map.entries()) {
                                node_fs_1.default.writeFileSync(node_path_1.default.resolve(lib_dir_path, `shopee${index}.js`), info.code);
                                entry_file_code += `import "./lib/shopee${index}.js";\n`;
                            }
                            node_fs_1.default.writeFileSync(file.path, entry_file_code);
                        }
                        else if (file.path.endsWith('.png')) {
                            const png_file_path = node_path_1.default.resolve(node_path_1.default.dirname(file.path), 'lib', node_path_1.default.basename(file.path));
                            node_fs_1.default.writeFileSync(png_file_path, file.text);
                        }
                        else {
                            node_fs_1.default.writeFileSync(file.path, file.text);
                        }
                    });
                    console.log('-----------> react-natie-esbuild process success! \n');
                    return undefined;
                }
            });
        },
    };
};
exports.metro_perset_plugin = metro_perset_plugin;
