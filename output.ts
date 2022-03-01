import { getInput, setOutput } from "./core.ts";
import { fsRead } from "./fs/read.ts";

async function main() {
  const name = getInput("name");
  const value = getInput("value");

  if (!value.startsWith("file://")) {
    await setOutput(name, value);
    return;
  }

  const decode = getInput("decode", false);

  await setOutput(
    name,
    await fsRead({
      src: value.replace("file://", ""),
      decode,
    }),
  );
}

if (import.meta.main) {
  main();
}
