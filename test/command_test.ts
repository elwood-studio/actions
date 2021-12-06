import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.115.0/testing/asserts.ts";
import { BufReader } from "https://deno.land/std@0.115.0/io/bufio.ts";
import { TextProtoReader } from "https://deno.land/std@0.115.0/textproto/mod.ts";
import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.115.0/path/mod.ts";

import { runCommand } from "./command.ts";

let server: Deno.Process<Deno.RunOptions & { stdout: "piped" }>;

const moduleDir = dirname(fromFileUrl(import.meta.url));
const testdataDir = resolve(moduleDir, "testdata");

async function startCommandServer() {
  server = Deno.run({
    cmd: [
      Deno.execPath(),
      "run",
      "--no-check",
      "--quiet",
      "--allow-read",
      "--allow-net",
      "testdata/command_server.ts",
    ],
    cwd: moduleDir,
    stdout: "piped",
    stderr: "null",
  });
  assert(server.stdout != null);
}

async function killCommandServer() {
  server.close();
  server.stdout!.close();
}

Deno.test("command is run", async () => {
  //   await startCommandServer();

  const { body } = await runCommand("addFile", {
    file: "xxx",
  });

  assertEquals(body, { name: "addFile", args: { file: "xxx" } });

  //   await killCommandServer();
});
