import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
const db = drizzle(process.env.DATABASE_URL as string, {
  schema,
  mode: "default",
});

export { db };
