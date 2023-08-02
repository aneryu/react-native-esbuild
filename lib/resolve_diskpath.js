"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve_diskpath = void 0;
const node_path_1 = __importDefault(require("node:path"));
/**
 *
 * @param resolve_sys
 * @param path_value
 * @param importer
 * @returns
 */
function resolve_diskpath(resolve_sys, path_value, importer) {
    const dir = node_path_1.default.dirname(importer);
    const res = resolve_sys(dir, path_value);
    return res;
}
exports.resolve_diskpath = resolve_diskpath;
