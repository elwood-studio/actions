import { getInput } from "../core.ts";

async function main() {
  const script = getInput("script");

  const p = Deno.run({
    cmd: [
      "deno",
      "run",
      "-A",
      "-q",
      "--unstable",
      "-",
    ],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  await p.stdin.write(new TextEncoder().encode(script));

  p.stdin.close();

  const { code } = await p.status();

  // Reading the outputs closes their pipes
  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  if (code === 0) {
    await Deno.stdout.write(rawOutput);
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }

  Deno.exit(code);
}

if (import.meta.main) {
  main();
}
