import { CustomEsbuildResolvePlugin } from "./interface/resolve_plugin";
import * as esbuild from "esbuild";
import { CustomEsbuildStartPlugin } from "./interface/start_plugin";
import { CustomEsbuildLoadPlugin } from "./interface/load_plugin";
import fs from "node:fs";
import { CustomEsbuildEndPlugin } from "./interface/end_plugin";

export function ComposeStartPlugin(
  plugins: CustomEsbuildStartPlugin[]
): esbuild.Plugin {
  return {
    name: "compose-start-plugin",
    setup(build: esbuild.PluginBuild) {
      let real_plugins = plugins.sort((a, b) => {
        return a.stage - b.stage;
      });
      build.onStart(async () => {
        for (const plugin of real_plugins) {
          try {
            await plugin.hook(build);
          } catch (ex: any) {
            throw new Error(
              `plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`
            );
          }
        }
      });
    },
  };
}

export function ComposeEndPlugin(
  plugins: CustomEsbuildEndPlugin[]
): esbuild.Plugin {
  return {
    name: "compose-end-plugin",
    setup(build: esbuild.PluginBuild) {
      let real_plugins = plugins.sort((a, b) => {
        return a.stage - b.stage;
      });
      build.onEnd(async (res) => {
        for (const plugin of real_plugins) {
          try {
            await plugin.hook(build, res);
          } catch (ex: any) {
            throw new Error(
              `plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`
            );
          }
        }
      });
    },
  };
}

/**
 * compose esbuild resolve plugin
 * @param plugins
 * @returns
 */
export function ComposeResolvePlugin(
  plugins: CustomEsbuildResolvePlugin[]
): esbuild.Plugin {
  return {
    name: "compose-resolve-plugin",
    setup(build: esbuild.PluginBuild) {
      let real_plugins = plugins.sort((a, b) => {
        return a.stage - b.stage;
      });
      build.onResolve({ filter: /.*/ }, async (arg: esbuild.OnResolveArgs) => {
        let step_arg = arg;
        let perresovle_result: esbuild.OnResolveResult | null | undefined =
          undefined;
        for (const plugin of real_plugins) {
          try {
            if (!(perresovle_result?.external ?? false)) {
              if (!perresovle_result) {
                perresovle_result = await plugin.hook(build, step_arg);
              } else {
                const temp_result = await plugin.hook(build, {
                  ...step_arg,
                  path: perresovle_result?.path ?? step_arg.path,
                });
                if (temp_result) {
                  perresovle_result = temp_result;
                }
              }
              if (perresovle_result?.external && perresovle_result?.path) {
                break;
              }
            }
          } catch (ex: any) {
            throw new Error(
              `plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`
            );
          }
        }
        return perresovle_result;
      });
    },
  };
}

export function ComposeLoadPlugin(
  plugins: CustomEsbuildLoadPlugin[]
): esbuild.Plugin {
  return {
    name: "compose-load-plugin",
    setup(build: esbuild.PluginBuild) {
      let real_plugins = plugins.sort((a, b) => {
        return a.stage - b.stage;
      });
      build.onLoad({ filter: /.*/ }, async (arg) => {
        let step_arg = arg;
        const content = fs.readFileSync(arg.path, "utf-8").toString();
        step_arg.pluginData = {
          ...step_arg.pluginData,
          code: content,
        };
        let perload_result:
          | esbuild.OnLoadResult
          | null
          | undefined
          | Promise<esbuild.OnLoadResult | null | undefined> = undefined;
        for (const plugin of real_plugins) {
          try {
            if (!perload_result) {
              perload_result = await plugin.hook(build, step_arg);
            } else {
              const temp_result = await plugin.hook(build, {
                ...step_arg,
                pluginData: perload_result.pluginData,
              });
              if (temp_result) {
                perload_result = {
                  ...temp_result,
                  loader: temp_result?.loader ?? perload_result?.loader,
                };
              }
            }
          } catch (ex: any) {
            throw new Error(
              `plugin ${plugin.name} \n error: ${ex.message} \n stack: ${ex.stack}`
            );
          }
        }
        return perload_result;
      });
    },
  };
}
