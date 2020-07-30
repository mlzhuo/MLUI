//index.js
const app = getApp();
import MLUTIL from '../../utils/mlUtil';
const mlutil = new MLUTIL();
Page({
  data: {
    girdItemListIcon: [
      {
        title: 'calendar',
        value: 'iconfont icon-rili',
        color: '#69cdff',
        url: '../mlui/calendar/index'
      },
      {
        title: 'navigation',
        value: 'iconfont icon-navigation-bar',
        color: '#69cdff',
        url: '../mlui/navigation/index'
      },
      {
        title: 'drawer',
        value: 'iconfont icon-narrow',
        color: '#69cdff',
        url: '../mlui/drawer/index'
      },
      {
        title: 'grid',
        value: 'iconfont icon-gongge1',
        color: '#69cdff',
        url: '../mlui/grid/index'
      }
    ]
  },

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

  girdClick(data) {
    const { url } = data.detail.currentTarget.dataset.item;
    wx.navigateTo({ url });
  }
});
