import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache({
  max: 500,
  ttl: 1000 * 60 * 15, // 15 minutes
});

export function checkRateLimit(ip: string, maxRequests: number = 5): boolean {
  const key = `rate-limit-${ip}`;
  const current = rateLimit.get(key) as number || 0;
  
  if (current >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  rateLimit.set(key, current + 1);
  return true; // Within rate limit
}

export function getRemainingRequests(ip: string, maxRequests: number = 5): number {
  const key = `rate-limit-${ip}`;
  const current = rateLimit.get(key) as number || 0;
  return Math.max(0, maxRequests - current);
} 