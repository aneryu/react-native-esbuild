import * as esbuild from "esbuild";
import { CustomEsbuildPlugin } from "./plugin";

export type EsbuildLoadPlugin = (
  build: esbuild.PluginBuild,
  arg: esbuild.OnLoadArgs
) =>
  | esbuild.OnLoadResult
  | null
  | undefined
  | Promise<esbuild.OnLoadResult | null | undefined>;

export interface CustomEsbuildLoadPlugin extends CustomEsbuildPlugin {
  type: "load-plugin";
  hook: EsbuildLoadPlugin;
}
