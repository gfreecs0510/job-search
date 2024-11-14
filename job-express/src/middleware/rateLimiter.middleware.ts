import { Request, Response, NextFunction } from 'express';

const MAX_REQUESTS_PER_MINUTE = 5;
const MAX_REQUESTS_PER_DAY = 10;
const DELAY_TIME = 20000;

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
  if (ipRequestData[ip]) {
    const { minute, day } = ipRequestData[ip];

    ipRequestData[ip].day.count += 1;

    if (currentTime - minute.timestamp < 60000) {
      if (minute.count >= MAX_REQUESTS_PER_MINUTE) {
        await timeout();
        res.status(429).json({
          error: 'Rate limit exceeded (per minute). Please try again later.',
        });
        return;
      }
      ipRequestData[ip].minute.count += 1;
    } else {
      ipRequestData[ip].minute = { count: 1, timestamp: currentTime };
    }

    if (currentTime - day.timestamp < 24 * 60 * 60 * 1000) {
      if (day.count >= MAX_REQUESTS_PER_DAY) {
        await timeout();
        res.status(429).json({
          error: 'Rate limit exceeded (per day). Please try again later.',
        });
        return;
      }
    } else {
      ipRequestData[ip].day = { count: 1, timestamp: currentTime };
    }
  } else {
    ipRequestData[ip] = {
      minute: { count: 1, timestamp: currentTime },
      day: { count: 1, timestamp: currentTime },
    };
  }

  next();
}
