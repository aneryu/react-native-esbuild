import path from "node:path";
import type resolve from "enhanced-resolve";

/**
 *
 * @param resolve_sys
 * @param path_value
 * @param importer
 * @returns
 */
function resolve_diskpath(
    resolve_sys: resolve.ResolveFunction,
    path_value: string,
    importer: string
  ) {
    const dir = path.dirname(importer);
    const res = resolve_sys(dir, path_value);
    return res;
  }

  export { resolve_diskpath}