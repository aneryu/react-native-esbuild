import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";

function calc_path(workdir: string, filepath: string): string {
  if (path.isAbsolute(filepath)) {
    return filepath;
  } else {
    return path.resolve(workdir, filepath);
  }
}

const entry_add_console: () => esbuild.Plugin = () => {
  return {
    name: "entry_add_console",
    setup(build) {
      build.onStart(() => {
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
      });
      build.onLoad({ filter: /.*/ }, async (args) => {
        const entry_items =
          Reflect.get(build.initialOptions, "check_entry_path") ?? [];
        if (entry_items.includes(args.path)) {
          let content = fs.readFileSync(args.path, "utf-8");
          if (!content.includes("console.log")) {
            content += `\nconsole.log('entry: ${args.path}');\n`;
          }
          return{
            contents: content,
            loader: path.extname(args.path).slice(1) as esbuild.Loader,
          }
        }
        return undefined;
      });
    },
  };
};

export { entry_add_console };
