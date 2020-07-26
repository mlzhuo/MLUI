//index.js
const app = getApp();

Page({
  data: {},

  onLoad() {
    this.onGetOpenid();
  },

  async onGetOpenid() {
    const resLogin = await wx.cloud.callFunction({
      name: 'login',
      data: {}
    });
    const openId = resLogin.result.openid;
    app.globalData.openid = openId;
    const resGetGuest = await wx.cloud.callFunction({
      name: 'getGuest',
      data: { openId }
    });
    const guest = resGetGuest.result.guest[0];
    // 更新times
    if (guest) {
      const res = await wx.cloud.callFunction({
        name: 'updateGuest',
        data: { openId }
      });
    } else {
      // 新建guest
      const res = await wx.cloud.callFunction({
        name: 'addGuest',
        data: { openId }
      });
    }
    // 浏览总次数
    const res = await wx.cloud.callFunction({
      name: 'countTimes',
      data: {}
    });
    app.globalData.allTimes = res.result.allTimes;
  },

  jump(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  }
});
