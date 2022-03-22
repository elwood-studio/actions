import { getInput } from "../core.ts";

let lastResponseBody: any = null;

export type RunCommandOutput = {
  code: number | null;
  data: string;
};

export async function runCommand(
  name: string,
  args: Array<string | undefined | null>,
): Promise<RunCommandOutput> {
  const execution_id = Deno.env.get("EXECUTION_ID");
  const execution_server_url = Deno.env.get("EXECUTION_SERVER_URL");

  if (!execution_id) {
    throw new Error("No EXECUTION_ID");
  }

  if (!execution_server_url) {
    throw new Error("No EXECUTION_SERVER_URL");
  }

  const response = await fetch(execution_server_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ execution_id, name, args }),
  });

  if (response.status !== 200) {
    throw new Error(
      `Command "${name}(${
        JSON.stringify(args)
      })" failed with status ${response.status}`,
    );
  }

  lastResponseBody = await response.json();
  const { code, data } = lastResponseBody;
  return { code, data };
}

export function getLastResponseBody() {
  return lastResponseBody;
}

async function main() {
  const cmd = getInput("command");
  const args = getInput("args");

  await runCommand(cmd, [args]);
}

if (import.meta.main) {
  main();
}
