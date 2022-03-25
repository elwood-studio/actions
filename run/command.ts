import { getInput, getInputWithJson } from "../core.ts";

let lastResponseBody: any = null;

export type RunCommandOutput = {
  code: number | null;
  data: string;
};

export async function runCommand(
  name: string,
  args: Array<string | undefined | null>,
): Promise<RunCommandOutput> {
  try {
    const execution_id = Deno.env.get("__EXECUTION_ID");
    const execution_server_url = Deno.env.get("__EXECUTION_SERVER_URL");

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
  } catch (err) {
    console.log(err.message);
    return { code: 1, data: "" };
  }
}

export function getLastResponseBody() {
  return lastResponseBody;
}

async function main() {
  const cmd = getInput("command");
  const args = getInputWithJson("args");

  const { code } = await runCommand(
    cmd,
    Array.isArray(args) ? args : [args],
  );

  // if there is no returned code
  // just assume the command failed to run
  Deno.exit(code ?? 1);
}

if (import.meta.main) {
  main();
}
