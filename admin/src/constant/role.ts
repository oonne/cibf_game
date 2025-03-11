import type { Role } from '@/types/staff';

interface IRole {
  type: Role;
  name: string;
}

const roleList: IRole[] = [
  {
    type: 1,
    name: '管理员',
  },
  {
    type: 2,
    name: '合伙人',
  },
  {
    type: 3,
    name: 'CIBF工作人员',
  },
];

export default roleList;
