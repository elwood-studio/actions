import { ensureDir } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { basename, dirname, relative } from "https://deno.land/std@0.115.1/path/mod.ts";
import { runCommand } from "../command.ts";
import {  getBooleanInput, getInput } from "../core.ts";

export type FsPullInput = {
  src: string;
  dest: string;
};

export async function fsPull(input: FsPullInput): Promise<string> {
  const { data } = await runCommand("pull", [
    input.src,
    input.dest,
  ]);

  return data;
}

async function main() {
  const src = getInput("src");
  const dest = getInput("dest");
  const addToStage = getBooleanInput("stage", false) ?? false;

  // create a temp director that the files will end up in
  // we need a good way of knowing what was added to the stage
  const destDir = dirname(dest);

  await ensureDir(destDir);
  await fsPull({
    src,
    dest,
  });
}

if (import.meta.main) {
  main();
}
