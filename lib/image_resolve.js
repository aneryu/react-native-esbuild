"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageResolvePlugin = void 0;
const ImageResolvePlugin = {
    name: "image-resolve-plugin",
    type: "resolve-plugin",
    stage: 1,
    hook: (_build, arg) => {
        if (arg.path.endsWith(".gif") ||
            arg.path.endsWith(".png") ||
            arg.path.endsWith(".jpg")) {
            return {
                path: arg.path,
                external: true,
            };
        }
        return { path: arg.path };
    },
};
exports.ImageResolvePlugin = ImageResolvePlugin;
