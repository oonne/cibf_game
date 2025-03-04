import { Timer } from '../types/type';

/**
 *  获取n位的数字随机数
 */
const randomDigits = (n: number): number => {
  if (n > 21) {
    return 0;
  }
  return Math.round((Math.random() + 1) * 10 ** (n - 1));
};

/**
 *  获取n以内的随机整数
 */
const randomWithin = (n: number): number => Math.floor(Math.random() * n);

/**
 *  延迟一定时间，单位毫秒。
 */
const sleep = async (time: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, time);
});

/**
 * 函数防抖
 * @param {function} fn 要执行的函数
 * @param {number} waitTime 等待时间
 * @returns {function}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const debounce = (fn: Function, waitTime: number) => {
  let timer: Timer = null;

  return (...args: any[]) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    // 停止触发n秒后才执行
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, waitTime);
  };
};

export default {
  randomDigits,
  randomWithin,
  sleep,
  debounce,
};
