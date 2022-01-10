import { getInput } from "../core.ts";

export type FSRemoveInput = {
  path: string;
};

export async function fsRemove(input: FSRemoveInput): Promise<void> {
  const { path } = input;
  await Deno.remove(path, { recursive: true });
}

async function main() {
  const path = getInput("path");
  await fsRemove({ path });
}

if (import.meta.main) {
  main();
}
