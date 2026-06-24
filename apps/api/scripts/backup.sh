#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
target="$BACKUP_DIR/math-$timestamp.dump"

pg_dump --format=custom --no-owner --no-privileges --file="$target" "$DATABASE_URL"
find "$BACKUP_DIR" -type f -name 'math-*.dump' -mtime +30 -delete
printf 'Backup created: %s\n' "$target"
