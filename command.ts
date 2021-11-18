export type RunCommandOutput = {
  code: number | null;
  data: string;
};

export async function runCommand(
  name: string,
  args: string[]
): Promise<RunCommandOutput> {
  const execution_id = Deno.env.get("EXECUTION_ID");

  if (!execution_id) {
    throw new Error("No EXECUTION_ID");
  }

  const response = await fetch("http://runner:4000/command", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ execution_id, name, args }),
  });

  if (response.status !== 200) {
    throw new Error(`Command "${name}(${JSON.stringify(args)})" failed with status ${response.status}`);
  }

  const { code, data } = await response.json();
  return { code, data };
}
