import { runCommand } from "./command.ts";

export async function ffprobe(args: string[]): Promise<string> {
  const cleanArgs = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  if (cleanArgs.length === 0) {
    throw new Error("No ffmpeg command provided");
  }

  // add these to make sure ffmpeg doesn't get stuck
  // and we don't get a verbose banner
  args.unshift("-y");
  args.unshift("-hide_banner");
w
  // we only care about the output
  // the status code is never right 
  // so we ignore
  const { data } = await runCommand("ffprobe", cleanArgs);
  return data;
}

async function main() {
  const args = Deno.env.get("INPUT_COMMAND") || "";

  // run the ffmpeg command with the args
  // we get from the INPUT_ env
  // these are are sanitized by the bridge server
  // so there isn't a need to check them here
  await ffprobe(args.split(" "));

}

if (import.meta.main) {
  main();
}
