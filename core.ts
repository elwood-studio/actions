import { runCommand } from "./command.ts";

export function getInput(name: string, strict = true): string {
  const inputEnvName = `INPUT_${name.toUpperCase()}`;

  if (strict && !Deno.env.get(inputEnvName)) {
    throw new Error(`Missing required environment variable: ${inputEnvName}`);
  }

  return Deno.env.get(inputEnvName) as string;
}

export async function addFileToStage(...files: string[]): Promise<void> {
  await runCommand("addFile", files);
}

export async function setOutput(key: string, value: string): Promise<void> {
  await runCommand("setOutput", [key, value]);
}

export async function setJsonOutput(key: string, value: Record<string, any>): Promise<void> {
  return await setOutput(key, `json:${JSON.stringify(value)}`);
}

export async function setEnv(key:string,value:string): Promise<void> {
  await runCommand('setEnv', [key, value]);
}