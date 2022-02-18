import { runCommand } from "../command.ts";
import { getInput } from "../core.ts";

export async function awsCli(args: string[]): Promise<string> {
  const cleanArgs = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  if (cleanArgs.length === 0) {
    throw new Error("No aws-cli command provided");
  }

  const { data } = await runCommand("aws-cli", cleanArgs);
  return data;
}

async function main() {
  const args = (getInput("args", false) ?? "").split(" ");

  await awsCli(args);
}

if (import.meta.main) {
  main();
}
