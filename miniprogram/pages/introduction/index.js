// miniprogram/pages/introduction/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    version: '',
    times: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const resVersion = await wx.cloud.callFunction({
      name: 'getVersions',
      data: { limit: 1 }
    });
    const versions = resVersion.result.data;
    this.setData({
      version: `v${versions[0].version}`,
      times: getApp().globalData.times
    });
  },

  toTap(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  }
});
