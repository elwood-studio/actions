import { expandGlobSync } from "https://deno.land/std@0.122.0/fs/mod.ts";

import { runCommand } from "../command.ts";
import { getInput } from "../core.ts";

export async function exportToStage(files: string[]): Promise<void> {
  await runCommand("addToStage", files);
}

async function main() {
  const path = getInput("path", false);
  const glob = getInput("glob", false);

  if (path) {
    await exportToStage([path]);
  }

  if (glob) {
    await exportToStage(
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
