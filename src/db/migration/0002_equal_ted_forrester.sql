ALTER TABLE "table" ADD COLUMN "tags1" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "table" ADD COLUMN "tags2" text[] DEFAULT ARRAY[]::text[] NOT NULL;