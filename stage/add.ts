
import { addFileToStage, getBooleanInput, getInput } from "../core.ts";


async function main() {
  const path = getInput("path");
  const force = getBooleanInput("force", false);

  if (force === true && !Deno.statSync(path).isFile) {
    throw new Error("Path is not a file");
  }

  addFileToStage(path)
  
}

if (import.meta.main) {
  main();
}

