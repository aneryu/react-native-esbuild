import { CustomEsbuildLoadPlugin } from "./interface/load_plugin";
import { CustomEsbuildResolvePlugin } from "./interface/resolve_plugin";
import { resolve_diskpath } from "./resolve_diskpath";
import path from "path";

const flowRemoveTypes = require("flow-remove-types");

const FlowExternalPlugin: (
  js_flow_files: string[]
) => CustomEsbuildResolvePlugin = (js_flow_files) => {
  return {
    name: "flow-external-plugin",
    type: "resolve-plugin",
    stage: 10,
    hook: (build, arg) => {
      if (arg.kind === "import-statement") {
        const en_resolver = Reflect.get(
          build.initialOptions,
          "enhance_resolver"
        );
        const res = resolve_diskpath(en_resolver!, arg.path, arg.importer);
        if (res) {
          const forbidlist = js_flow_files.map((item) => {
            return path.resolve(build.initialOptions.absWorkingDir!, item);
          });
          if (forbidlist.includes(res)) {
            return {
              path: arg.path,
              external: true,
            };
          }
        }
      }
      return { path: arg.path };
    },
  };
};

const FlowRemoveTypesPlugin: CustomEsbuildLoadPlugin = {
  name: "flow-remove-types-plugin",
  type: "load-plugin",
  stage: 1,
  hook: (_build, arg) => {
    if (arg.path.endsWith(".js")) {
      const code = flowRemoveTypes(arg.pluginData.code, {
        all: true,
      }).toString();
      return {
        contents: code,
        loader: "tsx",
        pluginData: {
          code: code,
          loader: "tsx",
        },
      };
    }
    return undefined;
  },
};
export { FlowExternalPlugin, FlowRemoveTypesPlugin };
