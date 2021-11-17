import { runCommand } from "./command.ts";

export async function addFileToStage(...file: string[]): Promise<void> {
  await runCommand("addFile", {
    file,
  });
}
