import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";
import { CustomEsbuildStartPlugin } from "./interface/start_plugin";
import { CustomEsbuildLoadPlugin } from "./interface/load_plugin";

function calc_path(workdir: string, filepath: string): string {
  if (path.isAbsolute(filepath)) {
    return filepath;
  } else {
    return path.resolve(workdir, filepath);
  }
}

const EntryCalcPlugin: CustomEsbuildStartPlugin = {
  name: "entry_calc_plugin",
  type: "start-plugin",
  stage: 1,
  hook: (build) => {
    let entry_items: string[] = [];
    const workdir = build.initialOptions.absWorkingDir! ?? process.cwd();
    const entry = build.initialOptions.entryPoints;
    if (Array.isArray(entry)) {
      entry_items = entry_items.concat(
        (entry as string[]).map((t) => calc_path(workdir, t))
      );
    } else if (typeof entry === "string") {
      entry_items.push(calc_path(workdir, entry));
    } else {
      Object.values(entry as any).forEach((item) => {
        if (Array.isArray(item)) {
          entry_items = entry_items.concat(
            item.map((t) => calc_path(workdir, t))
          );
        } else if (typeof item === "string") {
          entry_items.push(calc_path(workdir, item));
        }
      });
    }
    Reflect.set(build.initialOptions, "check_entry_path", entry_items);
  },
};

const EntryAddConsole: CustomEsbuildLoadPlugin = {
  name: "entry_add_console",
  type: "load-plugin",
  stage: 0,
  hook: (build, arg) => {
    const entry_items =
      Reflect.get(build.initialOptions, "check_entry_path") ?? [];
    if (entry_items.includes(arg.path)) {
      let content = arg.pluginData?.code ?? fs.readFileSync(arg.path, "utf-8");
      if (!content.includes("console.log")) {
        content += `\nconsole.log('entry: ${arg.path}');\n`;
      }
      return {
        contents: content,
        loader: path.extname(arg.path).slice(1) as esbuild.Loader,
        pluginData: {
          code: content,
          loader: path.extname(arg.path).slice(1) as esbuild.Loader,
        },
      };
    }
    return undefined;
  },
};

export { EntryAddConsole, EntryCalcPlugin };
