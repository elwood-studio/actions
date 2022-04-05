import { join } from "https://deno.land/std@0.123.0/path/mod.ts";
import { inPath } from "../core.ts";

import { gitRun } from "./run.ts";

export async function gitInstall() {
  if (inPath("git")) {
    return;
  }

  const stdout = await Deno.open(
    "/var/logs/git_install_stdout.log",
    { create: true, write: true, read: true },
  );

  const stderr = await Deno.open(
    "/var/logs/git_install_stdout.log",
    { create: true, write: true, read: true },
  );

  const proc = Deno.run({
    cmd: ["apk", "add", "git"],
    stdout: stdout.rid,
    stderr: stderr.rid,
  });
  await proc.status();
  proc.close();
  stdout.close();
  stderr.close();

  await gitRun({
    args: ["config", "--global", "user.email", "you@example.com"],
  });

  await gitRun({
    args: ["config", "--global", "user.name", "Your Name"],
  });
}
