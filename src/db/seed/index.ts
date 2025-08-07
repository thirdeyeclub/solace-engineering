import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

const runSeed = async () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  try {
    const sql = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(sql);
    const records = await db.insert(advocates).values(advocateData).returning();
    
    console.log(`Successfully seeded ${records.length} advocates to the database.`);
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database:");
    console.error(error);
    process.exit(1);
  }
};

runSeed();
