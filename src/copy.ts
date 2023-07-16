import { exec } from 'node:child_process';

function memorycopy(content: string): void {
  exec('pbcopy').stdin?.end(content);
}

export { memorycopy };
