// miniprogram/pages/mlui/banner/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    list: [
      { type: 'video', url: 'cloud://ml-ui-mrr.6d6c-ml-ui-mrr-1302725761/demo.mp4' },
      { type: 'image', url: '/images/banner1.png' },
      { type: 'image', url: '/images/banner2.png' },
      { type: 'image', url: '/images/banner3.png' },
      { type: 'image', url: '/images/banner4.png' },
      { type: 'image', url: '/images/banner5.png' },
      { type: 'image', url: '/images/banner6.png' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {}
});
