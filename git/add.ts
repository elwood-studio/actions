import { getInput } from "../core.ts";
import { gitRun } from "./run.ts";

export type GitAddInput = {
  cwd?: string;
  pathspec?: string;
};

export async function gitAdd(input: GitAddInput) {
  const { pathspec = ".", cwd } = input;

  const proc = await gitRun({
    args: ["add", pathspec],
    cwd,
  });
}

async function main() {
  const cwd = getInput("cwd", false);
  const pathspec = getInput("pathspec", false) ?? ".";

  await gitAdd({
    cwd,
    pathspec,
  });
}

if (import.meta.main) {
  main();
}
