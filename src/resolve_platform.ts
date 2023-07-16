import * as esbuild from "esbuild";
import path from "path";
import fs from "fs";

const platform_ResolvePlugin = (platform: string) => {
  return {
    name: "reactnatie-resolve-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (arg: esbuild.OnResolveArgs) => {
        if (arg.importer.includes("node_modules")) {
          const extname = path.extname(arg.importer);
          const import_extname = path.extname(arg.path);
          if (
            (arg.kind == "import-statement" || arg.kind == "require-call") &&
            import_extname === ""
          ) {
            if (
              extname.includes("js") ||
              extname.includes("jsx") ||
              extname.includes("tsx") ||
              extname.includes("ts")
            ) {
              if (arg.path.startsWith("./") || arg.path.startsWith("../")) {
                if (!ehance_resolve(arg.importer, arg.path)) {
                  const final_filepath = ehance_native_resolve(
                    arg.importer,
                    arg.path,
                    platform
                  );
                  return { path: final_filepath };
                }
              }
            }
          }
        }
        return undefined;
      });
    },
  };
};

function ehance_resolve(basepath: string, filepath: string): boolean {
  const joinpath = path.resolve(path.dirname(basepath), filepath);
  const trypath = [
    joinpath + ".js",
    joinpath + ".jsx",
    joinpath + ".ts",
    joinpath + ".tsx",
    joinpath + "/index.js",
    joinpath + "/index.jsx",
    joinpath + "/index.ts",
    joinpath + "/index.tsx",
  ];
  if (
    trypath.map((p) => fs.existsSync(p)).filter((x) => x === true).length == 0
  ) {
    return false;
  }
  return true;
}

function ehance_native_resolve(
  basepath: string,
  filepath: string,
  platform: string
): string {
  let existpath = "";
  const joinpath = path.resolve(path.dirname(basepath), filepath);
  const trypath = [
    joinpath + "." + platform + ".js",
    joinpath + "." + platform + ".jsx",
    joinpath + "." + platform + ".ts",
    joinpath + "." + platform + ".tsx",
    joinpath + "." + platform + "/index.js",
    joinpath + "." + platform + "/index.jsx",
    joinpath + "." + platform + "/index.ts",
    joinpath + "." + platform + "/index.tsx",
  ];
  for (let p of trypath) {
    if (fs.existsSync(p)) {
      existpath = p;
      break;
    }
  }
  if (existpath === "") {
    throw new Error(
      `"can't find ${basepath} and ${filepath} to platform ${platform} file exist file system!"` +
        "\n"
    );
  }
  return existpath;
}

export { platform_ResolvePlugin };
