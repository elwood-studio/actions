import { getInput } from "./core.ts";


async function main() {
    const message = getInput('message');
    console.log(message)
}

if (import.meta.main) {
    main();
  }