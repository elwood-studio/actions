import { getInput } from "../core.ts";
import { gitRun } from "./run.ts";

export type GitPushInput = {
  cwd?: string;
  repo?: string;
};

export async function gitPush(input: GitPushInput) {
  const { repo, cwd } = input;

  await gitRun({
    args: ["push", repo].filter(Boolean) as string[],
    cwd,
  });
}

async function main() {
  const cwd = getInput("cwd", false);
  const repo = getInput("repo", false);

  await gitPush({
    cwd,
    repo,
  });
}

if (import.meta.main) {
  main();
}
