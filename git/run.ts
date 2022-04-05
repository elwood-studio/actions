import { isAbsolute, join } from "https://deno.land/std@0.133.0/path/mod.ts";

import { gitInstall } from "./install.ts";

export type GitRunInput = {
  install?: boolean;
  cwd?: string;
  args: string[];
};

export async function gitRun(input: GitRunInput) {
  const { args, install = true, cwd = Deno.cwd() } = input;

  if (install !== false) {
    await gitInstall();
  }

  const stdout = await Deno.open(
    "/var/logs/git_stdout.log",
    { create: true, write: true, read: true },
  );

  const stderr = await Deno.open(
    "/var/logs/git_stdout.log",
    { create: true, write: true, read: true },
  );

  const _cwd = isAbsolute(cwd) ? cwd : join(Deno.cwd(), cwd);

  const proc = Deno.run({
    cwd: _cwd,
    cmd: ["git", ...args],
    stdout: stdout.rid,
    stderr: stderr.rid,
  });

  await proc.status();
  proc.close();
  stdout.close();
  stderr.close();
}
