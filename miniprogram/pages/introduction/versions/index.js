// miniprogram/pages/introduction/versions/index.js
import MLUIUTIL from '../../../utils/mlUtil';
const mlutil = new MLUIUTIL();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVersion();
  },

  async getVersion() {
    const res = await wx.cloud.callFunction({
      name: 'getVersions',
      data: {}
    });
    res.result.data.forEach(v => {
      const { M, d } = mlutil.formatDate(v.date);
      v.month = M;
      v.day = d;
      v.description = v.description.replace(/;|；/g, '\n');
    });
    const list = res.result.data;
    this.setData({ list });
  }
});
