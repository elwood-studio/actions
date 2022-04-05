import { join } from "https://deno.land/std@0.123.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";

import { gitClone } from "./clone.ts";

Deno.test({
  name: "gitClone",
  async fn() {
    const tmp = await Deno.makeTempDir();

    await gitClone({
      url: "https://github.com/elwood-studio/actions-hello-world.git",
      ref: "main",
      dest: tmp,
    });

    assertEquals(
      (await Deno.stat(
        join(tmp, "index.js"),
      )).isFile,
      true,
    );

    await Deno.remove(tmp, { recursive: true });
  },
});
