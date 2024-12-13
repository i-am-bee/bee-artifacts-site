import { getNewYorkTodayMidnight } from '@/utils/datetime';
import { NEXT_PUBLIC_MAX_DAILY_COMPLETION_REQUESTS_PER_APP } from '@/utils/constants';
import { DailyLimitExceededError } from '@/app/api/errors';

const RATE_LIMIT_KEY = 'rate_limit';

interface RateLimitData {
  count: number;
  nyDay: string;
}

function getUsageLimitErrorMessage() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour12: true,
    hour: 'numeric',
  });
  const resetTime = getNewYorkTodayMidnight();
  const isResetToday = new Date().getDate() === resetTime.getDate();
  return (
    "**You've reached your daily usage limit**\n\n" +
    'You’ve been busy as a bee today! It looks like you’ve hit your daily ' +
    `limit for now.\n\nCome back ${isResetToday ? '' : 'tomorrow '}` +
    `at ${formatter.format(resetTime)} to continue.`
  );
}

/** Naive daily limit using local storage */
export function checkDailyUsageLimit(token: string) {
  const key = `${RATE_LIMIT_KEY}_${token}`;
  const rawData = localStorage.getItem(key);
  const today = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
  });

  const storedData: RateLimitData = rawData
    ? JSON.parse(rawData)
    : { count: 0, nyDay: today };

  const newCount = storedData.nyDay === today ? storedData.count + 1 : 1;

  if (newCount > NEXT_PUBLIC_MAX_DAILY_COMPLETION_REQUESTS_PER_APP) {
    throw new DailyLimitExceededError(getUsageLimitErrorMessage());
  }

  localStorage.setItem(key, JSON.stringify({ count: newCount, nyDay: today }));
}
