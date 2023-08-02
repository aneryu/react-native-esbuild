import { CustomEsbuildResolvePlugin } from "./interface/resolve_plugin";

const ImageResolvePlugin: CustomEsbuildResolvePlugin = {
  name: "image-resolve-plugin",
  type: "resolve-plugin",
  stage: 1,
  hook: (_build, arg) => {
    if (
      arg.path.endsWith(".gif") ||
      arg.path.endsWith(".png") ||
      arg.path.endsWith(".jpg")
    ) {
      return {
        path: arg.path,
        external: true,
      };
    }
    return { path: arg.path };
  },
};

export { ImageResolvePlugin };
