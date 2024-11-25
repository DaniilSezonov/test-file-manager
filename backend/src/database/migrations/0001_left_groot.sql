CREATE TABLE IF NOT EXISTS "files" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "files_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"size" real NOT NULL,
	"uploadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;