import { fsRename, main } from "./rename.ts";

export const fsMove = fsRename;

if (import.meta.main) {
  main();
}
