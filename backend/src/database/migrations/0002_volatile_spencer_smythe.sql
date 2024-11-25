ALTER TABLE "containerItemFiles" RENAME TO "relatedFiles";--> statement-breakpoint
ALTER TABLE "relatedFiles" DROP CONSTRAINT "containerItemFiles_catalogId_catalogs_id_fk";
--> statement-breakpoint
ALTER TABLE "relatedFiles" DROP CONSTRAINT "containerItemFiles_itemFile_files_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relatedFiles" ADD CONSTRAINT "relatedFiles_catalogId_catalogs_id_fk" FOREIGN KEY ("catalogId") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relatedFiles" ADD CONSTRAINT "relatedFiles_itemFile_files_id_fk" FOREIGN KEY ("itemFile") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
