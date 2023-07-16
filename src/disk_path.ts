import path from 'node:path';

/**
 *
 * @param filepath
 * @param working_dir
 * @returns
 */
function resolve_disk_path(filepath: string, working_dir: string) {
  const with_not_comment_path = filepath.replace('// ', '').trim();
  if (path.isAbsolute(with_not_comment_path)) {
    return with_not_comment_path;
  } else {
    return path.resolve(working_dir, with_not_comment_path);
  }
}

export { resolve_disk_path };
