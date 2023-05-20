type IntervalFn = (...args: any[]) => any;
type IntervalKey = string | number | symbol;

const internalIntervals = new Map<
  IntervalKey,
  number | ReturnType<typeof setInterval>
>();

export const setIntervalById = (
  fn: IntervalFn,
  delay = 0,
  key: IntervalKey
): void => {
  if (!key) throw new Error('setIntervalById requires a key');
  if (!internalIntervals.has(key)) {
    internalIntervals.set(key, setInterval(fn, delay));
  }
};

export const clearIntervalById = (key: string): void => {
  const intervalId = internalIntervals.get(key);
  if (intervalId) {
    clearTimeout(intervalId);
    internalIntervals.delete(key);
  }
};
