import * as esbuild from "esbuild";
import { CustomEsbuildPlugin } from "./plugin";

export type EsbuildResolvePlugin = (
  build: esbuild.PluginBuild,
  args: esbuild.OnResolveArgs
) =>
  | esbuild.OnResolveResult
  | null
  | undefined
  | Promise<esbuild.OnResolveResult | null | undefined>;

export interface CustomEsbuildResolvePlugin extends CustomEsbuildPlugin {
  type: "resolve-plugin";
  hook: EsbuildResolvePlugin;
}
