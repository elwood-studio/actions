import { ensureDir } from "https://deno.land/std@0.115.1/fs/mod.ts";
import {
  dirname,
  isAbsolute,
  join,
} from "https://deno.land/std@0.115.1/path/mod.ts";

import { getInput } from "../core.ts";
import { gitRun } from "./run.ts";

export type GitCloneInput = {
  url: string;
  ref?: string;
  dest?: string;
};

export async function gitClone(input: GitCloneInput) {
  const { url, ref = "main", dest = Deno.cwd() } = input;

  const _dest = isAbsolute(dest) ? dest : join(Deno.cwd(), dest);

  await ensureDir(dirname(_dest));

  await gitRun({
    args: ["clone", "-b", ref, url, _dest],
  });
}

async function main() {
  const url = getInput("url");
  const ref = getInput("ref", false) ?? "main";
  const dest = getInput("dest", false) ?? await Deno.makeTempDir();

  await gitClone({
    url,
    ref,
    dest,
  });
}

if (import.meta.main) {
  main();
}
