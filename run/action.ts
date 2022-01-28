import { join } from "https://deno.land/std@0.123.0/path/mod.ts";

import { getInput, setOutput } from "../core.ts";
import { runCommand } from "../command.ts";

export type RunActionInput = {
  dir?: string;
  entry?: string;
};

export async function runAction(input: RunActionInput) {
  const entry = input.entry ?? "index.js";
  const dir = input.dir ?? Deno.cwd();
  const entryPath = join(dir, entry);

  await Deno.stat(entryPath);

  await runCommand("node", [join(dir, entry)]);
}

async function main() {
  const dir = getInput("dir", false);
  const entry = getInput("entry", false);
  await runAction({
    dir,
    entry,
  });
}

if (import.meta.main) {
  main();
}
