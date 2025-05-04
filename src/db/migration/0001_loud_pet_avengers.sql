CREATE TYPE "public"."mood" AS ENUM('sad', 'ok', 'happy');--> statement-breakpoint
CREATE TABLE "table" (
	"mood" "mood",
	"testArray" varchar(255) DEFAULT ARRAY[]::varchar[] NOT NULL
);
