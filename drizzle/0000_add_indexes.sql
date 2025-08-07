CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"payload" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes for search optimization
CREATE INDEX IF NOT EXISTS "idx_advocates_name" ON "advocates" ("first_name", "last_name");
CREATE INDEX IF NOT EXISTS "idx_advocates_city" ON "advocates" ("city");
CREATE INDEX IF NOT EXISTS "idx_advocates_degree" ON "advocates" ("degree");
CREATE INDEX IF NOT EXISTS "idx_advocates_specialties" ON "advocates" USING GIN ("payload");
