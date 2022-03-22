import { expandGlobSync } from "https://deno.land/std@0.122.0/fs/mod.ts";

import { runCommand } from "../run/command.ts";
import { getInput } from "../core.ts";

export async function importFromStage(files: string[]): Promise<void> {
  await runCommand("addFromStage", files);
}

async function main() {
  const path = getInput("path", false);
  const glob = getInput("glob", false);

  if (path) {
    await importFromStage([path]);
  }

  if (glob) {
    await importFromStage(
      Array.from(expandGlobSync(glob)).filter((item) => item.isFile).map(
        (item) => {
          return item.path;
        },
      ),
    );
  }
}

if (import.meta.main) {
  main();
}
