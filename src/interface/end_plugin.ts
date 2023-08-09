import * as esbuild from "esbuild";
import { CustomEsbuildPlugin } from "./plugin";

export type EsbuildEndPlugin = (
  build: esbuild.PluginBuild,
  res: esbuild.BuildResult
) =>
  | esbuild.OnEndResult
  | null
  | void
  | Promise<esbuild.OnEndResult | null | void>;

export interface CustomEsbuildEndPlugin extends CustomEsbuildPlugin {
  type: "end-plugin";
  hook: EsbuildEndPlugin;
}
