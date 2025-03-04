/* 功能分类 */
interface Category {
  cn: string;
  en: string;
}

const categoryList: Category[] = [
  {
    cn: '全部',
    en: 'All',
  },
  {
    cn: '编码解码',
    en: 'Encode',
  },
  {
    cn: '散列函数',
    en: 'Hash',
  },
  {
    cn: '加密解密',
    en: 'Encrypt',
  },
  {
    cn: '其他',
    en: 'Other',
  },
];

export default categoryList;
