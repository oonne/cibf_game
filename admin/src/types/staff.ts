// 角色类型：1管理员 2合伙人 3CIBF工作人员
export type Role = 1 | 2 | 3;

/* 账号 */
export interface IStaff {
  id?: string;
  staffId: string;
  name: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
  [key: string]: any;
}
