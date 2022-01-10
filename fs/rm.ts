import { getBooleanInput, getInput } from "../core.ts";

export type FsRemoveInput = {
  path:string;
  force?:boolean;
};

export async function fsRemove(input: FsRemoveInput): Promise<void> {
  const { path, force = false } = input;
  await Deno.remove(path, { recursive: force });
}

async function main() {
  const path = getInput("path");
  const force = getBooleanInput("force", false);

  await fsRemove({
    path,
    force
  });
}

if (import.meta.main) {
  main();
}
