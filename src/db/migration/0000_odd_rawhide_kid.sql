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
--> statement-breakpoint
CREATE TABLE "project_tech_stack" (
	"project_id" integer NOT NULL,
	"tech_name" varchar(255) NOT NULL,
	CONSTRAINT "project_tech_stack_project_id_tech_name_pk" PRIMARY KEY("project_id","tech_name")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"link" text,
	"is_private" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "technologies" (
	"id" serial PRIMARY KEY NOT NULL,
	"techName" varchar(255) NOT NULL,
	"imageUrl" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_tech_stack" ADD CONSTRAINT "project_tech_stack_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "index_tech_name" ON "project_tech_stack" USING btree ("tech_name");--> statement-breakpoint
CREATE INDEX "index_link" ON "projects" USING btree ("link");--> statement-breakpoint
CREATE INDEX "index_is_private" ON "projects" USING btree ("is_private");