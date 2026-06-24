interface WindowState {
  count: number;
  startedAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export class SlidingWindowRateLimiter {
  private readonly windows = new Map<string, WindowState>();

  consume(bucket: string, rawKey: string, limit: number, windowMs: number, now = new Date()): RateLimitResult {
    const key = `${bucket}:${rawKey.trim().toLocaleLowerCase("en-US")}`;
    const timestamp = now.getTime();
    let state = this.windows.get(key);
    if (!state || timestamp - state.startedAt >= windowMs) {
      state = { count: 0, startedAt: timestamp };
      this.windows.set(key, state);
    }

    if (state.count >= limit) {
      return { allowed: false, remaining: 0, retryAfterMs: Math.max(0, state.startedAt + windowMs - timestamp) };
    }

    state.count += 1;
    return { allowed: true, remaining: limit - state.count, retryAfterMs: 0 };
  }
}
