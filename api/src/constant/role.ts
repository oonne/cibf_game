/* 角色类型 */
interface IRole {
  key: number;
  name: string;
}

const roleList: IRole[] = [
  {
    key: 1,
    name: '管理员',
  },
  {
    key: 2,
    name: '合伙人',
  },
  {
    key: 3,
    name: 'CIBF工作人员',
  },
];

/* 角色key枚举 */
const roleKeyArr = roleList.map((item) => item.key);

/* 角色说明文案 */
const roleDesc = roleList.map((item) => `${item.key} ${item.name} `).join(',');

export { roleList, roleKeyArr, roleDesc };
