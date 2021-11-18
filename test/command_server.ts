import { readAll } from "https://deno.land/std@0.115.0/streams/conversion.ts";
import { serve } from "https://deno.land/std@0.115.0/http/server.ts";

const addr = "0.0.0.0:4000";

await serve(async (req: Request) => {
  return new Response(JSON.stringify({
    code: 0,
    data: {
      url: req.url,
      body: await req.json(),
    },
  }));
}, { addr });

console.log(`Listening on ${addr}`);
