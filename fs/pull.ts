import { writableStreamFromWriter } from "https://deno.land/std@0.127.0/streams/mod.ts";
import { ensureDir } from "https://deno.land/std@0.127.0/fs/mod.ts";
import { dirname } from "https://deno.land/std@0.127.0/path/mod.ts";
import { runCommand } from "../command.ts";
import { getInput, inPath } from "../core.ts";

export type FsPullInput = {
  src: string;
  dest: string;
};

export async function fsPull(input: FsPullInput): Promise<void> {
  const response = await fetch(input.src);

  if (response.body) {
    const file = await Deno.open(input.dest, { write: true, create: true });
    const writableStream = writableStreamFromWriter(file);
    await response.body.pipeTo(writableStream);
  }
}

async function main() {
  const src = getInput("src");
  const dest = getInput("dest");

  // ensture the dest dir exists
  // before trying to put files there
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
