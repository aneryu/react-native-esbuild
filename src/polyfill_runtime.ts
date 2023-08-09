import { CustomEsbuildEndPlugin } from "./interface/end_plugin";

const polyfills = [
  `Object.getOwnPropertyDescriptors || (Object.getOwnPropertyDescriptors = function (obj) {
    if (obj === null || obj === undefined) {
      throw new TypeError('Cannot convert undefined or null to object')
    }
    const protoPropDescriptor = Object.getOwnPropertyDescriptor(obj, '__proto__')
    const descriptors = protoPropDescriptor ? { ['__proto__']: protoPropDescriptor } : {}
    for (const name of Object.getOwnPropertyNames(obj)) {
      descriptors[name] = Object.getOwnPropertyDescriptor(obj, name)
    }
    return descriptors
  });`,
];

export const RuntimePolyfillPlugin: CustomEsbuildEndPlugin = {
  name: "polyfill-plugin",
  stage: 1,
  type: "end-plugin",
  hook(build, res) {
    const { outputFiles, errors } = res;
    if ((errors && errors.length !== 0) || !outputFiles) {
      return;
    }

    const encoder = new TextEncoder();
    outputFiles.forEach((file) => {
      for (const polyfill of polyfills) {
        const polyfillBuffer = new Uint8Array(encoder.encode(polyfill + "\n"));
        const buffer = new Uint8Array(
          polyfillBuffer.length + file.contents.length
        );
        buffer.set(polyfillBuffer, 0);
        buffer.set(file.contents, polyfillBuffer.length);
        file.contents = buffer;
      }
    });
  },
};
