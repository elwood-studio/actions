import { join } from "https://deno.land/std@0.123.0/path/mod.ts";

import { getInput } from "../core.ts";
import { gitInstall } from "./install.ts";

export type GitCheckoutInput = {
  url: string;
  ref?: string;
  dest?: string;
};

export async function gitCheckout(input: GitCheckoutInput) {
  const { url, ref = "main", dest = Deno.cwd() } = input;

  await gitInstall();

  const stdout = await Deno.open(
    "/var/logs/git_checkout_stdout.log",
    { create: true, write: true, read: true },
  );

  const stderr = await Deno.open(
    "/var/logs/git_checkout_stdout.log",
    { create: true, write: true, read: true },
  );

  const proc = Deno.run({
    cmd: ["git", "clone", "-b", ref, url, dest],
    stdout: stdout.rid,
    stderr: stderr.rid,
  });

  await proc.status();
  proc.close();
  stdout.close();
  stderr.close();
}

async function main() {
  const repo = getInput("repo");
  const ref = getInput("ref", false) ?? "main";
  const tmp = await Deno.makeTempDir();

  await gitCheckout({
    url: `https://github.com/${repo}`,
    ref,
    dest: tmp,
  });
}

if (import.meta.main) {
  main();
}
