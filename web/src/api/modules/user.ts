import request from '../req';

export default {
  // 用户进入页面
  userEntry(data: object) {
    return request({
      url: '/user/user-entry',
      data,
    });
  },

  // 用户玩游戏上报
  gameReport(data: object) {
    return request({
      url: '/user/game-report',
      data,
    });
  },

  // 用户分享上报
  shareReport(data: object) {
    return request({
      url: '/user/share-report',
      data,
    });
  },

  // 用户浏览上报
  browseReport(data: object) {
    return request({
      url: '/user/browse-report',
      data,
    });
  },

  // 抽奖
  lottery(data: object) {
    return request({
      url: '/user/lottery',
      data,
    });
  },

  // 提交手机号
  submitPhone(data: object) {
    return request({
      url: '/user/submit-phone',
      data,
    });
  },
};
