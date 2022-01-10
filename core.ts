import * as base64 from "https://deno.land/std@0.115.1/encoding/base64.ts";
import { runCommand } from "./command.ts";

export function getInput(name: string, strict = true): string {
  const inputEnvName = `INPUT_${name.toUpperCase()}`;

  if (strict && !Deno.env.get(inputEnvName)) {
    throw new Error(`Missing required environment variable: ${inputEnvName}`);
  }

  return Deno.env.get(inputEnvName) as string;
}

export function getBooleanInput(name: string, strict = true): boolean {
  const value = getInput(name, strict);

  if (!value) {
    return false;
  }

  switch (value.toLowerCase()) {
    case "1":
    case "yes":
    case "true":
      return true;

    default:
      return false;
  }
}

export async function addFileToStage(...files: string[]): Promise<void> {
  await runCommand("addFile", files);
}

export async function setOutput(key: string, value: string): Promise<void> {
  console.log('set output')

  await runCommand("setOutput", [key, value]);
}

export async function setJsonOutput(
  key: string,
  value: Record<string, any> | any[],
): Promise<void> {
  return await setOutput(key, `json:${JSON.stringify(value)}`);
}

export async function setEnv(key: string, value: string): Promise<void> {
  await runCommand("setEnv", [key, value]);
}

export function encodeText(content: any, encoding: string = ""): string {
  const encodings = encoding?.split("+");
  let out: any = content;

  if (encodings.length > 1) {
    for (const enc of encodings) {
      switch (enc) {
        case "base64": {
          out = base64.encode(out);
          break;
        }
        case "json": {
          out = JSON.stringify(content);
          break;
        }
        default:
          // nothing
      }
    }
  }

  return out;
}

export function decodeText(content: string, encoding: string = ""): any {
  const encodings = encoding?.split("+");
  let out: any = content;

  if (encodings.length > 1) {
    for (const enc of encodings) {
      switch (enc) {
        case "base64": {
          out = base64.decode(out);
          break;
        }
        case "json": {
          out = JSON.parse(content);
          break;
        }
        default:
          // nothing
      }
    }
  }

  return out;
}

export function inPath(bin: string): boolean {
  const path = (Deno.env.get("PATH") || "").split(":");

  for (const p of path) {
    try {
      if (Deno.statSync(`${p}/${bin}`).isFile) {
        return true;
      }
    } catch (_) {
      // nothing
    }
  }

  return false;
}
