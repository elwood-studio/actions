import { join } from "https://deno.land/std@0.123.0/path/mod.ts";

import { getInput } from "../core.ts";
import { runAction } from "./action.ts";
import { gitClone } from "../git/clone.ts";

export type GithubInput = {
  repo: string;
  ref?: string;
  dest: string;
  entry: string;
};

export async function github(input: GithubInput) {
  const { repo, ref, dest, entry } = input;
  await gitClone({
    url: `https://github.com/${repo}`,
    ref,
    dest,
  });

  await runAction({
    dir: dest,
    entry,
  });
}

async function main() {
  const repo = getInput("repo", false) ?? Deno.args[0];
  const ref = getInput("ref", false) ?? "main";
  const entry = getInput("entry", false);

  if (!repo) {
    throw new Error("No repo provided in input or args");
  }

  const dest = join(Deno.cwd(), crypto.randomUUID());

  await github({
    repo,
    ref,
    dest,
    entry,
  });
}

if (import.meta.main) {
  main();
}
