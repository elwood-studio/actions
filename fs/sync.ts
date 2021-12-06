import { expandGlob } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { join, relative } from "https://deno.land/std@0.115.1/path/mod.ts";
import { runCommand } from "../command.ts";
import { addFileToStage, getInput } from "../core.ts";

export type FSSyncInput = {
  src: string[];
  dest: string;
};

export async function fsSync(input: FSSyncInput): Promise<string> {
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
  const ignore = getInput("ignore", false);
  const dest = getInput("dest");

  await fsSync({
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
