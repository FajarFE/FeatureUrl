ALTER TABLE "xamap" RENAME TO "analytics";--> statement-breakpoint
ALTER TABLE "analytics" DROP CONSTRAINT "xamap_shortlinkId_shortlink_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics" ADD CONSTRAINT "analytics_shortlinkId_shortlink_id_fk" FOREIGN KEY ("shortlinkId") REFERENCES "shortlink"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
