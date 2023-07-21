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
exports.entry_add_console = void 0;
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
const entry_add_console = () => {
    return {
        name: "entry_add_console",
        setup(build) {
            build.onStart(() => {
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
            });
            build.onLoad({ filter: /.*/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const entry_items = (_a = Reflect.get(build.initialOptions, "check_entry_path")) !== null && _a !== void 0 ? _a : [];
                if (entry_items.includes(args.path)) {
                    let content = node_fs_1.default.readFileSync(args.path, "utf-8");
                    if (!content.includes("console.log")) {
                        content += `\nconsole.log('entry: ${args.path}');\n`;
                    }
                    return {
                        contents: content,
                        loader: node_path_1.default.extname(args.path).slice(1),
                    };
                }
                return undefined;
            }));
        },
    };
};
exports.entry_add_console = entry_add_console;
