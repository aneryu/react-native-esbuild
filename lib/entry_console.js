"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryCalcPlugin = exports.EntryAddConsole = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
function calc_path(workdir, filepath) {
    if (node_path_1.default.isAbsolute(filepath)) {
        return filepath;
    }
    else {
        return node_path_1.default.resolve(workdir, filepath);
    }
}
const EntryCalcPlugin = {
    name: "entry_calc_plugin",
    type: "start-plugin",
    stage: 1,
    hook: (build) => {
        var _a;
        let entry_items = [];
        const workdir = (_a = build.initialOptions.absWorkingDir) !== null && _a !== void 0 ? _a : process.cwd();
        const entry = build.initialOptions.entryPoints;
        if (Array.isArray(entry)) {
            entry_items = entry_items.concat(entry.map((t) => calc_path(workdir, t)));
        }
        else if (typeof entry === "string") {
            entry_items.push(calc_path(workdir, entry));
        }
        else {
            Object.values(entry).forEach((item) => {
                if (Array.isArray(item)) {
                    entry_items = entry_items.concat(item.map((t) => calc_path(workdir, t)));
                }
                else if (typeof item === "string") {
                    entry_items.push(calc_path(workdir, item));
                }
            });
        }
        Reflect.set(build.initialOptions, "check_entry_path", entry_items);
    },
};
exports.EntryCalcPlugin = EntryCalcPlugin;
const EntryAddConsole = {
    name: "entry_add_console",
    type: "load-plugin",
    stage: 0,
    hook: (build, arg) => {
        var _a, _b, _c;
        const entry_items = (_a = Reflect.get(build.initialOptions, "check_entry_path")) !== null && _a !== void 0 ? _a : [];
        if (entry_items.includes(arg.path)) {
            let content = (_c = (_b = arg.pluginData) === null || _b === void 0 ? void 0 : _b.code) !== null && _c !== void 0 ? _c : node_fs_1.default.readFileSync(arg.path, "utf-8");
            if (!content.includes("console.log")) {
                content += `\nconsole.log('entry: ${arg.path}');\n`;
            }
            return {
                contents: content,
                loader: node_path_1.default.extname(arg.path).slice(1),
                pluginData: {
                    code: content,
                    loader: node_path_1.default.extname(arg.path).slice(1),
                },
            };
        }
        return undefined;
    },
};
exports.EntryAddConsole = EntryAddConsole;
