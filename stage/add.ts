import { expandGlob } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { relative } from "https://deno.land/std@0.115.1/path/mod.ts";
import { runCommand } from "../command.ts";
import {  getInput, inPath, setOutput } from "../core.ts";

export async function stageAddTo(files: string[]): Promise<void> {
    await runCommand('addToStage',files);
}

export async function stageAddFrom(files: string[]): Promise<void> {
    await runCommand('addFromStage',files);
}

async function main() {
    const to = getInput('to', false);
    const from = getInput('from', false);

    if (to) {
        await stageAddTo(to.split(','));
    }

    if (from) {
        await stageAddFrom(from.split(','));
    }
}

if (import.meta.main) {
  main();
}
