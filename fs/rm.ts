import { getInput } from "../core.ts";

export type FSRemoveInput = {
  path: string;
};

export async function fsRemove(input: FSRemoveInput): Promise<void> {
  const { path } = input;

  try {
    if (Deno.statSync(path)) {
      await Deno.remove(path, { recursive: true });
    }
  } catch (_) {
    // don't do anything if the file doesn't exist
  }
}

async function main() {
  const path = getInput("path");
  await fsRemove({ path });
}

if (import.meta.main) {
  main();
}
