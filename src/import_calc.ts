import { resolve_diskpath } from "./resolve_diskpath";
import { CustomEsbuildResolvePlugin } from "./interface/resolve_plugin";

/**
 * esbuild plugin import recording file location and disk location
 * @returns
 */
const ImportRecordingPlugin: CustomEsbuildResolvePlugin = {
  name: "import_recording_plugin",
  type: "resolve-plugin",
  stage: 99,
  hook: (build, arg) => {
    if (arg.kind === "import-statement" || arg.kind === "require-call") {
      const import_recording = Reflect.get(
        build.initialOptions,
        "import_records"
      );
      const en_resolver = Reflect.get(build.initialOptions, "enhance_resolver");
      // import React from 'react'  ->  arg.path = "'react'" arg.importer ="../src/index.tsx" -> res ="{absdir}/node_modules/react/index.js"
      const res = resolve_diskpath(en_resolver!, arg.path, arg.importer);
      if (res) {
        if (!import_recording?.has(arg.importer)) {
          import_recording!.set(arg.importer, [res]);
        } else {
          import_recording!.get(arg.importer)?.push(res);
        }
      }
    }
    return { path: arg.path };
  },
};

export { ImportRecordingPlugin };
