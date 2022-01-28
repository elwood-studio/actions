import {
  killCommandServer,
  startCommandServer,
} from "./_tools/command_server.js";
import { getLastResponseBody } from "./command.ts";
import { setOutput } from "./core.ts";
import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";

Deno.test({
  name: "setOutput",
  async fn() {
    await startCommandServer();
    await setOutput("hello", "world");
    assertEquals(getLastResponseBody().reqBody.name, "setOutput");
    assertEquals(getLastResponseBody().reqBody.args, ["hello", "world"]);
    await killCommandServer();
  },
});
