/* 功能清单 */
interface Features {
  name: string;
  label: string;
  category: string[];
}

const featuresList: Features[] = [
  {
    name: 'SCRYPT',
    label: 'SCRYPT',
    category: ['All', 'Encrypt'],
  },
  {
    name: 'PBKDF2',
    label: 'PBKDF2',
    category: ['All', 'Encrypt'],
  },
  {
    name: 'Base64',
    label: 'Base64',
    category: ['All', 'Encode'],
  },
  {
    name: 'AES',
    label: 'AES',
    category: ['All', 'Encrypt'],
  },
  {
    name: 'RSA',
    label: 'RSA',
    category: ['All', 'Encrypt'],
  },
  {
    name: 'MD5',
    label: 'MD5',
    category: ['All', 'Hash'],
  },
  {
    name: 'SHA',
    label: 'SHA',
    category: ['All', 'Hash'],
  },
  {
    name: 'QRcode',
    label: '二维码',
    category: ['All', 'Encode'],
  },
  {
    name: 'Password',
    label: '口令生成器',
    category: ['All', 'Other'],
  },
];

export default featuresList;
