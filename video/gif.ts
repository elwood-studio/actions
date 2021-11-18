import { addFileToStage, getInput } from "../core.ts";
import { ffmpeg } from "../ffmpeg.ts";

export type VideoGifInput = {
  src: string;
  output: string;
  fps?: string;
  size?: string;
};

export async function videoGif(input: VideoGifInput) {
  const { src, output, fps = "10", size = "320" } = input;
  await ffmpeg([
    "-i",
    src,
    "-vf",
    `fps=${fps},scale=${size}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
    "-loop",
    "0",
    output,
  ]);
}

async function main() {
  const src = getInput("src");
  const output = getInput("output");
  const fps = getInput("fps", false);
  const size = getInput("size", false);

  await videoGif({
    src,
    output,
    fps,
    size
  });

  if (output) {
    addFileToStage(output);
  }
}

if (import.meta.main) {
  main();
}
