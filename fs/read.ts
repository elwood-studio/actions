import {
  decodeText,
  encodeText,
  getInput,
  setEnv,
  setOutput,
} from "../core.ts";

export type FSReadInput = {
  src: string;
  decode?: string;
};

export async function fsRead(input: FSReadInput): Promise<string> {
  const { src, decode } = input;

  Deno.stat(src);

  const content = await Deno.readTextFile(
    src,
  );

  return decodeText(content.toString(), decode);
}

async function main() {
  const src = getInput("src");
  const output = getInput("output", false);
  const envName = getInput("env_name", false);
  const encoding = getInput("encoding", false);
  const decode = getInput("decode", false);

  const content = encodeText(
    await fsRead({
      src,
      decode,
    }),
    encoding,
  );

  if (output) {
    setOutput(output, content);
  }

  if (envName) {
    setEnv(envName, content);
  }
}

if (import.meta.main) {
  main();
}
