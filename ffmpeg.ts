import { runCommand } from "./command.ts";

export async function ffmpeg(args: string[]): Promise<string> {
  const cleanArgs = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  if (cleanArgs.length === 0) {
    throw new Error("No ffmpeg command provided");
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
  const args = Deno.env.get("INPUT_COMMAND") || "";
  const outputFilesGlob = Deno.env.get("INPUT_OUTPUT_FILES_GLOB") || "";

  // run the ffmpeg command with the args
  // we get from the INPUT_ env
  // these are are sanitized by the bridge server
  // so there isn't a need to check them here
  await ffmpeg(args.split(" "));

  const cwd = Deno.cwd();
  const globPaths = outputFilesGlob.split(",");

  // add all of the files in our input
  // back to the stage
  // for (const globPath of globPaths) {
  //   for await (const file of expandGlob(globPath)) {
  //     if (file.isFile) {
  //       addFileToStage(relative(file, cwd));
  //     }
  //   }
  // }
}

if (import.meta.main) {
  main();
}
