CREATE TABLE IF NOT EXISTS "customDomain" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain" text NOT NULL,
	"userId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beginsAt" timestamp DEFAULT now(),
	"endsAt" timestamp,
	"userId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "shortlink" ADD COLUMN "customDomainId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shortlink" ADD CONSTRAINT "shortlink_customDomainId_customDomain_id_fk" FOREIGN KEY ("customDomainId") REFERENCES "customDomain"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customDomain" ADD CONSTRAINT "customDomain_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
