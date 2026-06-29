const HOURLY_LIMIT = Number(process.env.RATE_LIMIT_HOURLY) || 150; // max bot requests per clock hour, site-wide

let currentHour = getHourKey();
let count = 0;

function getHourKey(): string {
  // 'YYYY-MM-DDTHH'
  return new Date().toISOString().slice(0, 13);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetInSeconds: number;
}

export function checkRateLimit(): RateLimitResult {
  const nowHour = getHourKey();

  if (nowHour !== currentHour) {
    currentHour = nowHour;
    count = 0;
  }

  const now = new Date();
  const minutesIntoHour = now.getUTCMinutes();
  const secondsIntoHour = minutesIntoHour * 60 + now.getUTCSeconds();
  const resetInSeconds = 3600 - secondsIntoHour;

  if (count >= HOURLY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: HOURLY_LIMIT,
      resetInSeconds,
    };
  }

  count++;
  return {
    allowed: true,
    remaining: HOURLY_LIMIT - count,
    limit: HOURLY_LIMIT,
    resetInSeconds,
  };
}
