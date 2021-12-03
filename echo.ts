import { getInput } from "./core";


async function main() {
    const message = getInput('message');
    console.log(message)
}

if (import.meta.main) {
    main();
  }