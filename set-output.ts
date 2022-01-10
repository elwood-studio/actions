
import { getInput, setOutput } from "./core.ts";

async function main() {
  const name = getInput("name");
  const value = getInput("value");

  await setOutput(name, value);
}

if (import.meta.main) {
  main();
}

