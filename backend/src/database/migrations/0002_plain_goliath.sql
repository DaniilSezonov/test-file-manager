CREATE TABLE IF NOT EXISTS "catalogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "catalogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"uploadedAt" timestamp DEFAULT now() NOT NULL,
	"owner" integer NOT NULL,
	"isRoot" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "containers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "containers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"catalog" integer,
	"file" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containers" ADD CONSTRAINT "containers_catalog_catalogs_id_fk" FOREIGN KEY ("catalog") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containers" ADD CONSTRAINT "containers_file_files_id_fk" FOREIGN KEY ("file") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
