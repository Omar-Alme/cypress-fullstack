import { db } from "../db";
import { seedEntries } from "./entry";

async function main() {
  await seedEntries();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
