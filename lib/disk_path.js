"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve_disk_path = void 0;
const node_path_1 = __importDefault(require("node:path"));
/**
 * resolve disk path
 * @param filepath
 * @param working_dir
 * @returns
 */
function resolve_disk_path(filepath, working_dir) {
    if (filepath === "esbuild_runtime") {
        return filepath;
    }
    else {
        const with_not_comment_path = filepath.replace("// ", "").trim();
        if (node_path_1.default.isAbsolute(with_not_comment_path)) {
            return with_not_comment_path;
        }
        else {
            return node_path_1.default.resolve(working_dir, with_not_comment_path);
        }
    }
}
exports.resolve_disk_path = resolve_disk_path;
