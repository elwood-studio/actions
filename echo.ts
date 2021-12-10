import { getInput } from "./core.ts";
import { fsRead } from "./fs/read.ts";

async function main() {
  const message = getInput("message", false);
  const file = getInput("file", false);
  const decode = getInput("decode", false);

  if (message) {
    console.log(message);
  }

  if (file) {
    await Deno.stat(file);

    console.log(
      await fsRead({
        src: file,
        decode,
      }),
    );
  }
}

if (import.meta.main) {
  main();
}

