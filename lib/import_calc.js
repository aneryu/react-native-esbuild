"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportRecordingPlugin = void 0;
const resolve_diskpath_1 = require("./resolve_diskpath");
/**
 * esbuild plugin import recording file location and disk location
 * @returns
 */
const ImportRecordingPlugin = {
    name: "import_recording_plugin",
    type: "resolve-plugin",
    stage: 99,
    hook: (build, arg) => {
        var _a;
        if (arg.kind === "import-statement" || arg.kind === "require-call") {
            const import_recording = Reflect.get(build.initialOptions, "import_records");
            const en_resolver = Reflect.get(build.initialOptions, "enhance_resolver");
            // import React from 'react'  ->  arg.path = "'react'" arg.importer ="../src/index.tsx" -> res ="{absdir}/node_modules/react/index.js"
            const res = (0, resolve_diskpath_1.resolve_diskpath)(en_resolver, arg.path, arg.importer);
            if (res) {
                if (!(import_recording === null || import_recording === void 0 ? void 0 : import_recording.has(arg.importer))) {
                    import_recording.set(arg.importer, [res]);
                }
                else {
                    (_a = import_recording.get(arg.importer)) === null || _a === void 0 ? void 0 : _a.push(res);
                }
            }
        }
        return { path: arg.path };
    },
};
exports.ImportRecordingPlugin = ImportRecordingPlugin;
