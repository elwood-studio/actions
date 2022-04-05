import { ensureDir } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { dirname } from "https://deno.land/std@0.115.1/path/mod.ts";
import { getInput } from "../core.ts";

export type FSRename = {
  dest: string;
  src: string;
};

export async function fsRename(input: FSRename): Promise<void> {
  const { dest, src } = input;
  const dir = dirname(dest);
  await ensureDir(dir);
  await Deno.rename(src, dest);
}

export async function main() {
  const dest = getInput("dest");
  const src = getInput("src");

  await fsRename({
    dest,
    src,
  });
}

if (import.meta.main) {
  main();
}
