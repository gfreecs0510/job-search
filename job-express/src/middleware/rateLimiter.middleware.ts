import { Request, Response, NextFunction } from 'express';

const MAX_REQUESTS_PER_MINUTE = 5;
const MAX_REQUESTS_PER_DAY = 10;
const DELAY_TIME = 20000; // 20 seconds delay in milliseconds

const ipRequestData: {
  [key: string]: {
    minute: { count: number; timestamp: number };
    day: { count: number; timestamp: number };
  };
} = {};

function timeout() {
  return new Promise((resolve) => {
    setTimeout(resolve, DELAY_TIME);
  });
}

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ip = req.ip;
  const currentTime = Date.now();
  // Check if the IP address is already tracked
  if (ipRequestData[ip]) {
    const { minute, day } = ipRequestData[ip];

    ipRequestData[ip].day.count += 1;

    // Check minute-based rate limit
    if (currentTime - minute.timestamp < 60000) {
      if (minute.count >= MAX_REQUESTS_PER_MINUTE) {
        // Delay the response by 20 seconds if rate limit exceeded
        await timeout();
        res.status(429).json({
          error: 'Rate limit exceeded (per minute). Please try again later.',
        });
        return; // return early to prevent next middleware execution
      }
      ipRequestData[ip].minute.count += 1;
    } else {
      // Reset minute count if the time window has expired
      ipRequestData[ip].minute = { count: 1, timestamp: currentTime };
    }

    // Check day-based rate limit
    if (currentTime - day.timestamp < 24 * 60 * 60 * 1000) {
      if (day.count >= MAX_REQUESTS_PER_DAY) {
        // Delay the response by 20 seconds if rate limit exceeded
        await timeout();
        res.status(429).json({
          error: 'Rate limit exceeded (per day). Please try again later.',
        });
        return; // return early to prevent next middleware execution
      }
    } else {
      // Reset day count if the time window has expired
      ipRequestData[ip].day = { count: 1, timestamp: currentTime };
    }
  } else {
    // If the IP is not tracked, start counting for both minute and day
    ipRequestData[ip] = {
      minute: { count: 1, timestamp: currentTime },
      day: { count: 1, timestamp: currentTime },
    };
  }

  // Proceed to the next middleware or route handler if rate limits are not exceeded
  next();
}
