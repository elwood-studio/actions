import { runCommand } from "../run/command.ts";
import { getInput } from "../core.ts";

export type FsCopyInput = {
  src: string;
  dest: string;
};

export async function fsPull(input: FsCopyInput): Promise<string> {
  const { data } = await runCommand("copy", [
    input.src,
    input.dest,
  ]);

  return data;
}

async function main() {
  const src = getInput("src");
  const dest = getInput("dest");

  await fsPull({
    src,
    dest,
  });
}

if (import.meta.main) {
  main();
}
