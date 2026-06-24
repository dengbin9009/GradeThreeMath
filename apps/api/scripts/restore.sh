#!/usr/bin/env bash
set -euo pipefail

: "${RESTORE_DATABASE_URL:?RESTORE_DATABASE_URL is required}"
backup_file="${1:?Usage: restore.sh /path/to/math.dump}"

pg_restore --clean --if-exists --no-owner --no-privileges --dbname="$RESTORE_DATABASE_URL" "$backup_file"
psql "$RESTORE_DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
select count(*) as users from "user";
select count(*) as sessions from session;
select count(*) as audit_events from audit_event;
SQL
printf 'Restore verification completed for %s\n' "$backup_file"
