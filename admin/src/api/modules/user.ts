import request from '../req';

export default {
  // 查询用户列表
  getList(data: object) {
    return request({
      url: '/user/get-list',
      data,
    });
  },

  // 查询用户详情
  getDetail(data: object) {
    return request({
      url: '/user/get-detail',
      data,
    });
  },

  // 删除用户
  deleteUser(data: object) {
    return request({
      url: '/user/delete',
      data,
    });
  },
};
