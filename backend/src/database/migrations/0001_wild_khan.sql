ALTER TABLE "containerItemCatalogs" RENAME TO "relatedCatalogs";--> statement-breakpoint
ALTER TABLE "relatedCatalogs" DROP CONSTRAINT "containerItemCatalogs_catalogId_catalogs_id_fk";
--> statement-breakpoint
ALTER TABLE "relatedCatalogs" DROP CONSTRAINT "containerItemCatalogs_itemCatalog_catalogs_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relatedCatalogs" ADD CONSTRAINT "relatedCatalogs_catalogId_catalogs_id_fk" FOREIGN KEY ("catalogId") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relatedCatalogs" ADD CONSTRAINT "relatedCatalogs_itemCatalog_catalogs_id_fk" FOREIGN KEY ("itemCatalog") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
