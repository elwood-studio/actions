import { getInput } from "../core.ts";
import { ffmpeg } from "../ffmpeg.ts";

export type VideoClipInput = {
  src: string;
  output: string;
  start: string;
  end: string;
};

export async function videoClip(input: VideoClipInput) {
  const { src, output, start, end } = input;
  await ffmpeg([
    "-ss",
    start,
    "-i",
    src,
    "-c",
    "copy",
    "-t",
    end,
    output,
  ]);
}

async function main() {
  const src = getInput("src");
  const output = getInput("output");
  const start = getInput("start");
  const end = getInput("end");

  await videoClip({
    src,
    output,
    start,
    end,
  });
}

if (import.meta.main) {
  main();
}
