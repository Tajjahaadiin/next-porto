CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"techlist" varchar[],
	"repo_url" varchar(255),
	"demo_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "techstack" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tech_name" varchar(255) NOT NULL,
	"tech_url" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "techstack_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"surname" varchar(255) NOT NULL,
	"short_description" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(255),
	"is_available" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "work" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" varchar(255),
	"work_position" varchar(255),
	"work_place" varchar(255),
	"work_description" varchar[] NOT NULL,
	"work_tech" varchar[] NOT NULL,
	"start_date" varchar(255) NOT NULL,
	"end_date" varchar(255) NOT NULL,
	CONSTRAINT "work_id_unique" UNIQUE("id")
);
