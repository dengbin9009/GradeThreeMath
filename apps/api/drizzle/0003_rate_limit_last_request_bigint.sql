ALTER TABLE "rate_limit" ALTER COLUMN "lastRequest" TYPE bigint USING "lastRequest"::bigint;
