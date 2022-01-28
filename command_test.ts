import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";

import {
  killCommandServer,
  startCommandServer,
} from "./_tools/command_server.js";
import { runCommand } from "./command.ts";

Deno.test({
  name: "command is run",
  fn: async () => {
    await startCommandServer({}, 0);
    const { code } = await runCommand("addFile", ["test"]);
    assertEquals(code, 0);
    await killCommandServer();
  },
});
