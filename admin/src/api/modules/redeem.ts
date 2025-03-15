import request from '../req';

export default {
  // 查询兑换码列表
  getList(data: object) {
    return request({
      url: '/redeem/get-list',
      data,
    });
  },

  // 查询兑换码详情
  getDetail(data: object) {
    return request({
      url: '/redeem/get-detail',
      data,
    });
  },

  // 删除兑换码
  deleteRedeem(data: object) {
    return request({
      url: '/redeem/delete',
      data,
    });
  },

  // 批量生成兑换码
  batchGenerate(data: object) {
    return request({
      url: '/redeem/batch-generate',
      data,
    });
  },

  // 批量删除兑换码
  batchDelete(data: object) {
    return request({
      url: '/redeem/batch-delete',
      data,
    });
  },

  // 兑换码兑奖
  redeemCode(data: object) {
    return request({
      url: '/redeem/redeem',
      data,
    });
  },
};
