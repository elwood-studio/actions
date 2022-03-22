import { runCommand } from "../run/command.ts";

export async function stageSync(): Promise<void> {
  await runCommand("syncStage", []);
}

async function main() {
  await stageSync();
}

if (import.meta.main) {
  main();
}
