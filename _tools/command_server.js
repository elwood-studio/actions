import { serve } from "https://deno.land/std@0.123.0/http/server.ts";

let server;
let result = { code: 0, data: undefined };

export async function startCommandServer(data = {}, code = 0) {
  Deno.env.set("__EXECUTION_ID", "XX_TEST");
  Deno.env.set("__EXECUTION_SERVER_URL", "http://0.0.0.0:4000");

  const serverPath = new URL("./command_server.js", import.meta.url).href;
  server = new Worker(serverPath, {
    type: "module",
    deno: {
      namespace: true,
    },
  });
  server.postMessage({ code, data });
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export async function killCommandServer() {
  server.terminate();
}

async function main() {
  await serve(async (req) => {
    return new Response(
      JSON.stringify({ ...result, reqBody: await req.json() }),
    );
  }, { port: 4000, hostname: "0.0.0.0" });
}

if (import.meta.main) {
  main();
}
