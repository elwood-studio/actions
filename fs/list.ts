import { getBooleanInput, getInput, setJsonOutput } from "../core.ts";

export type FSListInput = {
  dir: string;
};

export function fsList(input: FSListInput): AsyncIterable<Deno.DirEntry> {
  const { dir } = input;
  return Deno.readDir(dir);
}

async function main() {
  const dir = getInput("dir", false) ?? Deno.cwd();
  const outputName = getInput("output_name", false);
  const echo = getBooleanInput("echo", false);
  const items = [];



  for await (const item of fsList({ dir })) {
    items.push(item);
  }

  if (outputName) {
    await setJsonOutput(outputName, items);
  }

  if (echo) {
    console.log(items);
  }
}

if (import.meta.main) {
  main();
}
