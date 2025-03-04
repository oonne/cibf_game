import { defineComponent } from 'vue';

export type Timer = ReturnType<typeof setTimeout> | null;
export type Interval = ReturnType<typeof setInterval> | null;
export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

// JSEncrypt RSA 签名/校验 哈希算法
// eslint-disable-next-line no-unused-vars
export type RSAHashFun = (str: string) => string;
export type RSAHashMethod = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512' | 'RIPEMD160';

// CryptoJS AES 加密模式和填充模式
export type AESMode = 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR';
export type AESPadding = 'AnsiX923' | 'Iso10126' | 'Iso97971' | 'Pkcs7' | 'ZeroPadding' | 'NoPadding';

// 输出格式
export type Formatter = 'Base64' | 'Hex';

/* 导航栏 */
export interface Tab {
  key: string;
  name: string;
  component: ReturnType<typeof defineComponent>;
}

/* 链接 */
export interface Link {
  href: string;
  text: string;
}

/* 下拉框 */
export interface SelectOption {
  value: string | number;
  name: string;
  selected?: boolean;
}
