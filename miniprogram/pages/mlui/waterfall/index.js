// miniprogram/pages/mlui/waterfall/index.js
const { filePath } = getApp().globalData;
const listData = [
  { url: filePath + '/waterfall/waterfall0.png', title: '春雨惊春清谷天' },
  {
    url: filePath + '/waterfall/waterfall1.png',
    title: '春雨惊春清谷天，夏满芒夏暑相连。'
  },
  { url: filePath + '/waterfall/waterfall2.png', title: '秋处露秋寒霜降' },
  { url: filePath + '/waterfall/waterfall3.png', title: '冬雪雪冬小大寒' },
  {
    url: filePath + '/waterfall/waterfall4.png',
    title: '春雨惊春清谷天，夏满芒夏暑相连。秋处露秋寒霜降，冬雪雪冬小大寒'
  },
  {
    url: filePath + '/waterfall/waterfall5.png',
    title: '春雨惊春清谷天，夏满芒夏暑相连。秋处露秋寒霜降'
  },
  { url: filePath + '/waterfall/waterfall6.png', title: '秋处露秋寒霜降' },
  {
    url: filePath + '/waterfall/waterfall7.png',
    title: '春雨惊春清谷天，夏满芒夏暑相连。'
  }
];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    column: 2,
    gap: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onReachBottom();
  },

  onReachBottom() {
    const { list } = this.data;
    this.setData({
      list: [...list, ...listData]
    });
  },

  onWaterfallClick(e) {
    const item = e.detail;
  }
});
