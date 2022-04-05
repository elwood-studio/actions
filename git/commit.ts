import { getInput } from "../core.ts";
import { gitRun } from "./run.ts";

export type GitCommitInput = {
  cwd?: string;
  message: string;
};

export async function gitCommit(input: GitCommitInput) {
  const { message, cwd } = input;

  const proc = await gitRun({
    args: ["commit", "-m", message],
    cwd,
  });
}

async function main() {
  const cwd = getInput("cwd", false);
  const message = getInput("message");

  await gitCommit({
    cwd,
    message,
  });
}

if (import.meta.main) {
  main();
}
