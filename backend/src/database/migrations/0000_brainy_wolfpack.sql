CREATE TABLE IF NOT EXISTS "catalogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "catalogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"uploadedAt" timestamp DEFAULT now() NOT NULL,
	"owner" integer NOT NULL,
	"isRoot" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "containerItemCatalogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "containerItemCatalogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"catalogId" integer NOT NULL,
	"itemCatalog" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "containerItemFiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "containerItemFiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"catalogId" integer NOT NULL,
	"itemFile" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "files_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"verboseName" varchar(256) NOT NULL,
	"size" real NOT NULL,
	"uploadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"name" varchar(256),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containerItemCatalogs" ADD CONSTRAINT "containerItemCatalogs_catalogId_catalogs_id_fk" FOREIGN KEY ("catalogId") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containerItemCatalogs" ADD CONSTRAINT "containerItemCatalogs_itemCatalog_catalogs_id_fk" FOREIGN KEY ("itemCatalog") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containerItemFiles" ADD CONSTRAINT "containerItemFiles_catalogId_catalogs_id_fk" FOREIGN KEY ("catalogId") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "containerItemFiles" ADD CONSTRAINT "containerItemFiles_itemFile_files_id_fk" FOREIGN KEY ("itemFile") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "users" USING btree (lower("email"));