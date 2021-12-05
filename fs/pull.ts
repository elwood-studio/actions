import { expandGlob } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { join, relative } from "https://deno.land/std@0.115.1/path/mod.ts";
import { runCommand } from "../command.ts";
import { addFileToStage, getInput } from "../core.ts";

export type FsPullInput = {
  src: string | string[];
  dest?: string;
  rename?: string;
};

export async function fsPull(input: FsPullInput): Promise<string> {
  if (Array.isArray(input.src) && input.rename) {
    throw new Error("Cannot use both src[] and rename");
  }

  const { data } = await runCommand("pull", [
    JSON.stringify(input.src),
    input.dest,
    input.rename,
  ]);

  return data;
}

async function main() {
  const src = getInput("src");
  const rename = getInput("rename", false);

  // create a temp director that the files will end up in
  // we need a good way of knowing what was added to the stage
  const tmpDest = join(Deno.cwd(), "tmp");

  await Deno.mkdir(tmpDest, { recursive: true });

  await fsPull({
    src: [src],
    dest: tmpDest,
    rename,
  });

  const cwd = Deno.cwd();

  // we need to move the files from the tempDest into the dest
  // that was requested. then we need to add them to the stage
  for await (const file of expandGlob(`${tmpDest}/**/*`)) {
    if (file.isFile) {
      const relPath = relative(tmpDest, file.path);
      const destPath = join(cwd, relPath);

      await Deno.rename(file.path, destPath);
      await addFileToStage(relPath);
    }
  }
}

if (import.meta.main) {
  main();
}
