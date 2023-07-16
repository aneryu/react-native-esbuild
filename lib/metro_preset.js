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
const convert_1 = require("./convert");
/**
 * esbuild plugin support metro-preset
 * @returns
 */
const metro_perset_plugin = () => {
    return {
        name: "reactnatie-resolve-plugin",
        setup(build) {
            build.onEnd((res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!res.errors || ((_a = res.errors) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    if (build.initialOptions.outfile) {
                        const outfile = node_path_1.default.resolve(build.initialOptions.outfile);
                        const content = (0, convert_1.transform_metro_with_file)(outfile);
                        node_fs_1.default.writeFileSync(outfile, content);
                    }
                    else {
                        throw new Error("outfile not exist in the esbuild options");
                    }
                }
                console.log("-----------> react-natie-esbuild process success! \n");
                return undefined;
            }));
        },
    };
};
exports.metro_perset_plugin = metro_perset_plugin;
