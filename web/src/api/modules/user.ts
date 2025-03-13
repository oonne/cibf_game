import request from '../req';

export default {
  // 用户进入页面
  userEntry(data: object) {
    return request({
      url: '/user/user-entry',
      data,
    });
  },
};
