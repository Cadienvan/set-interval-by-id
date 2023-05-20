import { setIntervalById, clearIntervalById } from '.';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('setIntervalById', () => {
  it('should throw an error if no key is provided', () => {
    // @ts-ignore
    expect(() => setIntervalById(() => {}, 0)).toThrowError(
      'setIntervalById requires a key'
    );
  });

  it('should call setInterval with the provided function and delay', async () => {
    let key = 'key-1';
    const fn = jest.fn();
    const delay = 10;
    setIntervalById(fn, delay, key);
    expect(fn).not.toHaveBeenCalled();
    await sleep(delay);
    expect(fn).toHaveBeenCalled();
    clearIntervalById(key); // cleanup to prevent open handles
  });

  it('should not call setInterval if the key already exists', async () => {
    let key = 'key-2';
    const fn = jest.fn();
    const delay = 10;
    setIntervalById(fn, delay, key);
    setIntervalById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(1);
    clearIntervalById(key); // cleanup to prevent open handles
  });

  it('should not call setInterval twice if the key already exists even if time has passed', async () => {
    let key = 'key-3';
    const fn = jest.fn();
    const delay = 10;
    setIntervalById(fn, delay, key);
    await sleep(delay);
    setIntervalById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(2);
    clearIntervalById(key); // cleanup to prevent open handles
  });

  it('should call setInterval if the key is deleted', async () => {
    let key = 'key-4';
    const fn = jest.fn();
    const delay = 10;
    setIntervalById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(1);
    clearIntervalById(key);
    setIntervalById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(2);
    clearIntervalById(key); // cleanup to prevent open handles
  });
});
