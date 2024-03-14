import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationDB, migrationClient } from "@/lib/drizzle";

import * as schema from "@/schema";

const main = async () => {
  await migrate(migrationDB, { migrationsFolder: "./drizzle" });
  await migrationClient.end();
  console.log("Migration done! at" + new Date());
};

main();
