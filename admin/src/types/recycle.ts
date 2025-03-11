// 回收类型: 1账号
export type RecycleType = 1;

/* 回收站 */
export interface IRecycle {
  id?: string;
  recycleId: string;
  type: RecycleType;
  content: string;
  deleteStaffId?: string;
  deleteStaffName?: string;
  [key: string]: any;
}
