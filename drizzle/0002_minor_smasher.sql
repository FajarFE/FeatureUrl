ALTER TABLE "analytics" ADD COLUMN "ip" text NOT NULL;--> statement-breakpoint
ALTER TABLE "analytics" ADD COLUMN "visitedAt" timestamp DEFAULT now();