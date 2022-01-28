import { join } from "https://deno.land/std@0.123.0/path/mod.ts";

import { getInput } from "../core.ts";

import { github } from "../github.ts";

async function main() {
  const dest = join(Deno.cwd(), crypto.randomUUID());

  await github({
    repo: "elwood-studio/actions-aws",
    entry: "transcribe.js",
    dest,
  });
}

if (import.meta.main) {
  main();
}
