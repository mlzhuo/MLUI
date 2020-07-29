// miniprogram/pages/mlui/drawer/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    position: 'right',
    width: '60%',
    isCustomNav: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  onTap(e) {
    const { position } = e.currentTarget.dataset;
    this.setData({
      position,
      open: true
    });
  },
  closeDrawer(e) {
    this.setData({ open: false });
  }
});
