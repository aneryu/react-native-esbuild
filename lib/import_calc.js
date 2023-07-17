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
exports.import_recording_plugin = void 0;
const node_path_1 = __importDefault(require("node:path"));
const enhanced_resolve_1 = __importDefault(require("enhanced-resolve"));
let en_reolver = undefined;
let import_recording = undefined;
/**
 *
 * @param resolve_sys
 * @param path_value
 * @param importer
 * @returns
 */
function resolve_diskpath(resolve_sys, path_value, importer) {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = node_path_1.default.dirname(importer);
        const res = resolve_sys(dir, path_value);
        return res;
    });
}
/**
 * esbuild plugin import recording file location and disk location
 * @returns
 */
const import_recording_plugin = () => {
    return {
        name: 'reactnatie-resolve-plugin',
        setup(build) {
            build.onStart(() => {
                en_reolver = enhanced_resolve_1.default.create.sync({
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                });
                import_recording = new Map();
            });
            build.onResolve({ filter: /.*/ }, (arg) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                // console.log(arg.path, '\n', arg.kind);
                if (((_b = (_a = build.initialOptions.external) === null || _a === void 0 ? void 0 : _a.filter((exter) => arg.path.includes(exter)).length) !== null && _b !== void 0 ? _b : 0) == 0 &&
                    arg.kind === 'import-statement') {
                    const res = yield resolve_diskpath(en_reolver, arg.path, arg.importer);
                    if (res) {
                        if (!(import_recording === null || import_recording === void 0 ? void 0 : import_recording.has(arg.importer))) {
                            import_recording.set(arg.importer, [res]);
                        }
                        else {
                            (_c = import_recording.get(arg.importer)) === null || _c === void 0 ? void 0 : _c.push(res);
                        }
                    }
                }
                return undefined;
            }));
        },
    };
};
exports.import_recording_plugin = import_recording_plugin;
