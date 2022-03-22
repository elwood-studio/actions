import { expandGlob } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { relative } from "https://deno.land/std@0.115.1/path/mod.ts";
import { runCommand } from "./command.ts";
import { getInput, inPath, setOutput } from "../core.ts";

export async function ffmpeg(args: string[]): Promise<string> {
  const cleanArgs = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  if (cleanArgs.length === 0) {
    throw new Error("No ffmpeg args provided");
  }

  // if the first arg is ffmpeg
  // ignore that since the command will add it
  if (cleanArgs[0] === "ffmpeg") {
    cleanArgs.shift();
  }

  // add these to make sure ffmpeg doesn't get stuck
  // and we don't get a verbose banner
  cleanArgs.unshift("-y");
  cleanArgs.unshift("-hide_banner");

  // check to see if ffmpeg has been installed
  // locally. if yes, use that instead of issuing a command
  if (inPath("ffmpeg")) {
    const p = Deno.run({
      cmd: ["ffmpeg", ...cleanArgs],
    });

    return (await p.output()).toString();
  } else {
    // we only care about the output
    // the status code is never right
    // so we ignore
    const { data } = await runCommand("ffmpeg", cleanArgs);
    return data;
  }
}

async function main() {
  const args = (getInput("args", false) ?? getInput("command", false) ?? "")
    .split(" ");
  await ffmpeg(args);
}

if (import.meta.main) {
  main();
}
