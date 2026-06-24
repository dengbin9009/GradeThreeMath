ALTER TABLE "rate_limit" ADD COLUMN "id" text DEFAULT '' NOT NULL;
ALTER TABLE "rate_limit" ALTER COLUMN "bucket" SET DEFAULT 'better-auth';
ALTER TABLE "rate_limit" ALTER COLUMN "windowStartedAt" SET DEFAULT now();
ALTER TABLE "rate_limit" ALTER COLUMN "expiresAt" SET DEFAULT now();
