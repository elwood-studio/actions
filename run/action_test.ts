import { join } from "https://deno.land/std@0.123.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";

import {
  killCommandServer,
  startCommandServer,
} from "../_tools/command_server.js";
import { getLastResponseBody } from "../command.ts";

import { runAction } from "./action.ts";

Deno.test({
  name: "runAction",
  async fn() {
    await startCommandServer();

    const tmp = await Deno.makeTempDir();

    Deno.writeTextFile(
      join(tmp, "index.js"),
      'console.log("hello world")',
    );

    await runAction({
      dir: tmp,
      entry: "index.js",
    });

    assertEquals(getLastResponseBody().reqBody.name, "node");
    assertEquals(getLastResponseBody().reqBody.args, [
      join(tmp, "index.js"),
    ]);

    await killCommandServer();
  },
});
