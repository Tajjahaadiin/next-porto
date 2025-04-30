CREATE TABLE "profile" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"surname" varchar(255) DEFAULT 'Tajj' NOT NULL,
	"motto" varchar(255) DEFAULT 'Aspiring Fullstack Developer' NOT NULL,
	"location" varchar(255) DEFAULT 'Depok Sawangan, Indonesia' NOT NULL,
	"content" text DEFAULT 'So glad you stopped by!...' NOT NULL,
	"image" varchar(255) DEFAULT 'globe.svg' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profile_uuid_unique" UNIQUE("uuid")
);
