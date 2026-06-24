# Contract: Authentication And User Administration API

## General Rules

- Base path: `/api`
- Content type: `application/json`
- Production transport: HTTPS only
- Authentication: Better Auth database Session in host-only HttpOnly Cookie
- Time exchange: ISO 8601 UTC strings; UI displays Asia/Shanghai
- Admin authorization is enforced on the server for every `/api/admin/*` request
- No response includes password, password hash, internal auth email, Session token or Cookie value
- Session absolute lifetime is 12 hours, idle timeout is 2 hours, and `expiresAt` is capped by account `validUntil`
- The static application shell and non-sensitive build assets may be public; learning blueprint, user and administration payloads are never embedded in them

## Account Status Policy

Every protected request executes:

```text
session exists
AND user.isActive = true
AND now >= user.validFrom
AND (user.validUntil IS NULL OR now < user.validUntil)
AND route permission includes user.role
```

When `mustChangePassword=true`, only these routes are allowed:

- `GET /api/auth/get-session`
- `POST /api/account/change-password`
- `POST /api/auth/sign-out`

## Authentication Endpoints

### POST `/api/auth/sign-in/username`

Handled by Better Auth Username plugin with additional server validity check.

```json
{
  "username": "student001",
  "password": "four-word-temporary-passphrase"
}
```

**Success**: `200`, sets Session Cookie and returns safe user/session profile.

**Failure**:

- `401 AUTH_INVALID`: wrong credentials or unusable account; public message remains generic.
- `429 AUTH_RATE_LIMITED`: too many attempts.

The server must not reveal whether a username exists.

Rate limits:

- Same normalized username + IP: 5 failed attempts per 15 minutes.
- Same IP across usernames: 30 failed attempts per 15 minutes.
- No permanent account lockout; counters expire with the window.

### GET `/api/auth/get-session`

Returns safe current profile:

```json
{
  "user": {
    "id": "usr_...",
    "username": "student001",
    "displayName": "小明",
    "role": "user",
    "status": "active",
    "validFrom": "2026-06-22T00:00:00.000Z",
    "validUntil": "2026-09-30T16:00:00.000Z",
    "mustChangePassword": false
  },
  "session": {
    "expiresAt": "2026-06-22T12:00:00.000Z"
  }
}
```

### POST `/api/auth/sign-out`

Revokes current Session and clears Cookie. Response includes `Cache-Control: no-store`.

### POST `/api/account/change-password`

```json
{
  "currentPassword": "current-passphrase",
  "newPassword": "new-long-passphrase"
}
```

**Behavior**:

- Requires valid or restricted first-login Session.
- New password follows configured strength policy and may be pasted.
- Sets `mustChangePassword=false`.
- Revokes all other Sessions and rotates current Session.
- Writes non-sensitive audit event.

## Protected Content

### GET `/api/blueprint`

Requires a valid `admin` or `user` Session and returns validated knowledge/母题 content. Supports `ETag` and `If-None-Match`; unauthorized responses never include blueprint payload or cache validator derived from private content.

## Health Endpoints

### GET `/api/health/live`

Public liveness endpoint. Returns only process status and no environment, dependency, user, build-path or database details.

### GET `/api/health/ready`

Public readiness endpoint. Checks database connectivity and migration readiness but returns only ready/not-ready status. If the database is unavailable, protected content and admin APIs return generic `503` responses and never serve stale private payloads.

## Admin Endpoints

All endpoints require valid `admin` role. Ordinary users receive `403 AUTH_FORBIDDEN` regardless of whether the target user exists.

### GET `/api/admin/users`

Query:

```text
q=<username or display name>
status=pending|active|expiring-soon|expired|suspended
expiresBefore=<ISO UTC>
cursor=<opaque cursor>
limit=20
```

Response:

```json
{
  "items": [
    {
      "id": "usr_...",
      "username": "student001",
      "displayName": "小明",
      "role": "user",
      "status": "active",
      "isActive": true,
      "validFrom": "2026-06-22T00:00:00.000Z",
      "validUntil": "2026-09-30T16:00:00.000Z",
      "mustChangePassword": false,
      "version": 3,
      "updatedAt": "2026-06-22T08:15:00.000Z"
    }
  ],
  "nextCursor": null
}
```

### POST `/api/admin/users`

```json
{
  "username": "student001",
  "displayName": "小明",
  "temporaryPassword": "four-word-temporary-passphrase",
  "validFrom": "2026-06-22T00:00:00.000Z",
  "validUntil": "2026-09-30T16:00:00.000Z"
}
```

Rules:

- Creates role `user` only.
- `validUntil=null` means long-term valid.
- `mustChangePassword=true` always.
- Generates internal non-deliverable auth email server-side.
- Duplicate username returns `409 USERNAME_CONFLICT`.
- Returns temporary password only as an echo in the immediate success response; it is never retrievable later.

### GET `/api/admin/users/:userId`

Returns user detail, active Session count and recent audit summary. Does not return tokens, password data or internal auth email.

### PATCH `/api/admin/users/:userId`

```json
{
  "displayName": "小明",
  "isActive": true,
  "validFrom": "2026-06-22T00:00:00.000Z",
  "validUntil": "2026-12-31T16:00:00.000Z",
  "version": 3
}
```

Rules:

- `version` is required; stale value returns `409 USER_VERSION_CONFLICT` with latest safe record.
- If the update makes the account currently invalid or narrows access, revoke all Sessions in the same transaction or coordinated operation.
- UI endpoint cannot change role to `admin`.
- Username and internal authentication email cannot be changed after creation.
- Last active administrator protection applies to controlled operations that can change an administrator role or status; ordinary admin UI endpoints cannot mutate administrator accounts or roles.
- User update, required Session revocation and AuditEvent insert are atomic; any failure rolls back the full operation and returns `503 ADMIN_OPERATION_ROLLED_BACK`.

### POST `/api/admin/users/:userId/reset-password`

```json
{
  "temporaryPassword": "new-four-word-passphrase",
  "version": 4
}
```

Sets the password, sets `mustChangePassword=true`, increments version and revokes all Sessions.

### POST `/api/admin/users/:userId/revoke-sessions`

Revokes every Session for target user and writes an audit event.

### GET `/api/admin/users/:userId/audit-events`

Returns cursor-paginated non-sensitive audit events for the target user. Audit events are admin-only and retained for 365 days.

## Standard Error Shape

```json
{
  "error": {
    "code": "USER_VERSION_CONFLICT",
    "message": "用户信息已被更新，请刷新后重试。",
    "requestId": "req_...",
    "fieldErrors": {}
  }
}
```

## Security Headers And Caching

- Auth and admin responses: `Cache-Control: no-store`.
- Logout clears Cookie and may clear sensitive browser cache/storage state.
- Trusted origins are explicit; CSRF and origin checks remain enabled.
- Login endpoint uses stricter rate limits than ordinary read APIs.
- Sensitive admin writes are limited to 30 requests per administrator per minute.
- Logs redact Authorization, Cookie, Set-Cookie, password fields and Session tokens.

## Audit Actions

| Action | Actor | Session Revocation |
|---|---|---|
| `CREATE_USER` | admin | N/A |
| `UPDATE_VALIDITY` | admin | when access narrows or becomes invalid |
| `SUSPEND_USER` | admin | all target Sessions |
| `RESUME_USER` | admin | none; old Sessions stay revoked |
| `RESET_PASSWORD` | admin | all target Sessions |
| `CHANGE_PASSWORD` | user | all other Sessions |
| `REVOKE_SESSIONS` | admin | all target Sessions |
| `ROLE_CHANGE` | controlled ops | all target Sessions |
