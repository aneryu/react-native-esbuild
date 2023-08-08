import * as esbuild from "esbuild";
import { CustomEsbuildPlugin } from "./plugin";

export type EsbuildStartPlugin = (
  build: esbuild.PluginBuild
) => esbuild.OnStartResult | void | Promise<esbuild.OnStartResult | void>;

export interface CustomEsbuildStartPlugin extends CustomEsbuildPlugin {
  type: "start-plugin";
  hook: EsbuildStartPlugin;
}
