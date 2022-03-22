import { runCommand } from "./run/command.ts";

async function main() {
  await runCommand("wait", []);
}

if (import.meta.main) {
  main();
}
