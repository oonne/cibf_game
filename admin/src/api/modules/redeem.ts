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
};
