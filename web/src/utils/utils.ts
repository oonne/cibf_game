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
 *  获取n位的随机数字或字母
 */
const randomChars = (n: number): string => {
  const arr: string[] = [];
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  for (let i = 0; i < n; i += 1) {
    arr.push(chars[randomWithin(chars.length)]);
  }

  return arr.join('');
};

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

/**
 * 获取url中的参数
 */
const getUrlParams = (name: string): string => {
  const reg = new RegExp(`(^|&)${name}=([^&#]*)(#|&|$)`, 'i');
  const url = window.location.href;
  const search = url.substring(url.lastIndexOf('?'));
  const r = search.substring(1).match(reg);
  if (r === null) {
    return '';
  }
  return decodeURIComponent(r[2]);
};

// 获取url中的所有参数
const getAllUrlParams = (): { [key: string]: string } => {
  const url = window.location.href;
  const queryString = url.split('?')[1] || '';
  return queryString.split('&').reduce((params, param) => {
    const [key, value] = param.split('=');
    if (key) {
      // eslint-disable-next-line no-param-reassign
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return params;
  }, {} as { [key: string]: string });
};

/* 初始化UUID */
const initUUID = () => {
  const uuid = localStorage.getItem('UUID');
  if (!uuid) {
    localStorage.setItem('UUID', `${randomChars(12)}-${randomChars(4)}`);
  }
};

export default {
  randomDigits,
  randomWithin,
  randomChars,
  sleep,
  debounce,
  getUrlParams,
  getAllUrlParams,
  initUUID,
};
