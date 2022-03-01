import { runCommand } from "../command.ts";
import { getBooleanInput, getInput } from "../core.ts";
import { fsWrite } from "../fs/write.ts";

export type FFProbeOptions = {
  json?: boolean;
};

export async function ffprobe(
  args: string[],
  options: FFProbeOptions = {},
): Promise<string> {
  const cleanArgs = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  if (cleanArgs.length === 0) {
    throw new Error("No ffmpeg command provided");
  }

  // add these to make sure ffmpeg doesn't get stuck
  // and we don't get a verbose banner
  args.unshift("-v", "quiet");

  if (options.json) {
    args.unshift("-print_format", "json");
  }

  // we only care about the output
  // the status code is never right
  // so we ignore
  const { data } = await runCommand("ffprobe", cleanArgs);
  return data;
}

async function main() {
  const args = getInput("args");
  const save_to = getInput("save_to", false);
  const as_json = getBooleanInput("as_json", false);

  const data = await ffprobe(args.split(" "), {
    json: as_json,
  });

  if (save_to) {
    await fsWrite({
      dest: save_to,
      content: data,
    });
  }
}

if (import.meta.main) {
  main();
}
