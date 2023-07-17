"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memorycopy = void 0;
const node_child_process_1 = require("node:child_process");
function memorycopy(content) {
    var _a;
    (_a = (0, node_child_process_1.exec)('pbcopy').stdin) === null || _a === void 0 ? void 0 : _a.end(content);
}
exports.memorycopy = memorycopy;
