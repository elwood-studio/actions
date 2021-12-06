import { expandGlob } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { relative } from "https://deno.land/std@0.115.1/path/mod.ts";
import { runCommand } from "./command.ts";
import { addFileToStage, getInput } from "./core.ts";

export async function ffmpeg(args: string[]): Promise<string> {
  const cleanArgs = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  if (cleanArgs.length === 0) {
    throw new Error("No ffmpeg command provided");
  }

  // if the first arg is ffmpeg
  // ignore that since the command will add it
  if (cleanArgs[0] === "ffmpeg") {
    cleanArgs.shift();
  }

  // add these to make sure ffmpeg doesn't get stuck
  // and we don't get a verbose banner
  args.unshift("-y");
  args.unshift("-hide_banner");

  // we only care about the output
  // the status code is never right
  // so we ignore
  const { data } = await runCommand("ffmpeg", cleanArgs);
  return data;
}

async function main() {
  const args = (getInput("command", false) ?? "").split(" ");
  const output = getInput("output", false);
  const outputGlobs = getInput("output_globs", false);

  if (output) {
    args.push(output);
  }

  // run the ffmpeg command with the args
  // we get from the INPUT_ env
  // these are are sanitized by the bridge server
  // so there isn't a need to check them here
  await ffmpeg(args);

  // if there is an output file specified
  // add it to the stage
  if (output) {
    addFileToStage(output);
  }

  if (outputGlobs) {
    const cwd = Deno.cwd();
    const globPaths = outputGlobs.split(",");

    for (const globPath of globPaths) {
      for await (const file of expandGlob(globPath)) {
        if (file.isFile) {
          addFileToStage(relative(file.path, cwd));
        }
      }
    }
  }
}

if (import.meta.main) {
  main();
}
