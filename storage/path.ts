import { join } from "https://deno.land/std@0.132.0/path/mod.ts";
import { createHash } from "https://deno.land/std@0.133.0/hash/mod.ts";

import { getInput, setOutput } from "../core.ts";

export type StoragePathInput = {
  prefix?: string;
  postfix?: string;
  subFolder?: string;
  path: string;
  outputName: string;
};

export async function createStoragePathId(path: string): Promise<string> {
  const normalizedPath = path.toLowerCase().replace(/^\//, "").replace(
    /\/$/,
    "",
  );
  return createHash("sha256").update(normalizedPath).toString();
}

export async function createStoragePath(
  path: string,
  subFolder: string = "",
): Promise<string> {
  return join(
    ".elwood-studio",
    subFolder,
    await createStoragePathId(path),
  );
}

export async function storagePath(input: StoragePathInput): Promise<void> {
  const { path, outputName, subFolder, prefix = "", postfix = "" } = input;

  await setOutput(
    outputName,
    join(prefix, await createStoragePath(path, subFolder), postfix),
  );
}

async function main() {
  const path = getInput("path");
  const outputName = getInput("output_name", false) ?? "path";
  const prefix = getInput("prefix", false) ?? "";
  const postfix = getInput("postfix", false) ?? "";
  const subFolder = getInput("sub_folder", false);

  await storagePath({ path, outputName, prefix, postfix, subFolder });
}

if (import.meta.main) {
  main();
}
