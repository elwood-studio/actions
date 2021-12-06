import { ensureDir } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { dirname } from "https://deno.land/std@0.115.1/path/mod.ts";
import { decodeText, encodeText, getInput } from "../core.ts";

export type FSWriteInput = {
  dest: string;
  content: string;
  encoding?: string;
  decode?: string;
};

export async function fsWrite(input: FSWriteInput): Promise<void> {
  const { dest, content, decode, encoding } = input;
  const dir = dirname(dest);
  await ensureDir(dir);
  await Deno.writeTextFile(
    input.dest,
    encodeText(decodeText(content, decode), input.encoding),
  );
}

async function main() {
  const dest = getInput("dest");
  const content = getInput("content");
  const encoding = getInput("encoding", false);
  const decode = getInput("decode", false);

  await fsWrite({
    dest,
    content,
    encoding,
    decode,
  });
}

if (import.meta.main) {
  main();
}
