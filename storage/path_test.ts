import {
  killCommandServer,
  startCommandServer,
} from "../_tools/command_server.js";
import { getLastResponseBody } from "../run/command.ts";
import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import {
  join,
  normalize,
  toFileUrl,
} from "https://deno.land/std@0.132.0/path/mod.ts";
import { createHash } from "https://deno.land/std@0.133.0/hash/mod.ts";

import { createStoragePath, createStoragePathId, storagePath } from "./path.ts";

Deno.test({
  name: "createStoragePathId",
  async fn() {
    async function t(path: string) {
      const normalizedPath = path.toLowerCase().replace(/^\//, "").replace(
        /\/$/,
        "",
      );
      return createHash("sha256").update(normalizedPath).toString();
    }

    assertEquals(await createStoragePathId("/test/1"), await t("/test/1"));
    assertEquals(
      await createStoragePathId("/test/1"),
      await createStoragePathId("test/1"),
    );
    assertEquals(
      await createStoragePathId("/Test/1"),
      await createStoragePathId("TEST/1"),
    );
  },
});

Deno.test({
  name: "storagePath",
  async fn() {
    await startCommandServer();

    const name = "test";
    const path = "/path/to";
    const prefix = "/poop";

    await storagePath({
      path,
      outputName: name,
    });

    console.log(getLastResponseBody().reqBody.args);

    assertEquals(getLastResponseBody().reqBody.name, "setOutput");
    assertEquals(getLastResponseBody().reqBody.args[0], name);
    assertEquals(
      getLastResponseBody().reqBody.args[1],
      await createStoragePath(path),
    );

    await storagePath({
      prefix,
      path,
      outputName: name,
    });

    assertEquals(getLastResponseBody().reqBody.name, "setOutput");
    assertEquals(getLastResponseBody().reqBody.args[0], name);
    assertEquals(
      getLastResponseBody().reqBody.args[1],
      join(prefix, await createStoragePath(path)),
    );

    await killCommandServer();
  },
});
