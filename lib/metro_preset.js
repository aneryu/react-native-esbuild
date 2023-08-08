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
        name: "metro-split-plugin",
        setup(build) {
            build.onEnd((res) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                if (!res.errors || ((_a = res.errors) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    console.log("Start the process of esbuild product supporting metro-preset! ----------->¸ \n");
                    const { outputFiles } = res;
                    for (const file of outputFiles !== null && outputFiles !== void 0 ? outputFiles : []) {
                        let entry_file_code = "";
                        const lib_dir_path = node_path_1.default.resolve(node_path_1.default.dirname(file.path), "lib");
                        if (!node_fs_1.default.existsSync(lib_dir_path)) {
                            node_fs_1.default.mkdirSync(lib_dir_path, { recursive: true });
                        }
                        if (file.path.endsWith(".js")) {
                            const output_chunks_map = yield (0, split_1.split_esbuild_output_chunk)(file.text, (_b = build.initialOptions.absWorkingDir) !== null && _b !== void 0 ? _b : process.cwd(), (_c = Reflect.get(build.initialOptions, "import_records")) !== null && _c !== void 0 ? _c : new Map());
                            for (let [index, info] of output_chunks_map.entries()) {
                                node_fs_1.default.writeFileSync(node_path_1.default.resolve(lib_dir_path, `shopee${index}.js`), info.code);
                                entry_file_code += `import "./lib/shopee${index}.js";\n`;
                            }
                            node_fs_1.default.writeFileSync(file.path, entry_file_code);
                        }
                        else if (file.path.endsWith(".png")) {
                            const png_file_path = node_path_1.default.resolve(node_path_1.default.dirname(file.path), "lib", node_path_1.default.basename(file.path));
                            node_fs_1.default.writeFileSync(png_file_path, file.text);
                        }
                        else {
                            node_fs_1.default.writeFileSync(file.path, file.text);
                        }
                    }
                    console.log("-----------> react-natie-esbuild process success! \n");
                    return undefined;
                }
            }));
        },
    };
};
exports.metro_perset_plugin = metro_perset_plugin;
