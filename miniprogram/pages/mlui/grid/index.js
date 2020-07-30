// miniprogram/pages/mlui/gird/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    girdItemListImg: [
      {
        title: '春',
        value: '../../images/mlui-active.png'
      },
      {
        title: '雨',
        value: '../../images/mlui-active.png'
      },
      { title: '惊', value: '../../images/mlui-active.png' },
      { title: '春', value: '../../images/mlui-active.png' },
      { title: '清', value: '../../images/mlui-active.png' },
      {
        title: '谷',
        value: '../../images/mlui-active.png'
      }
    ],
    girdItemListIcon: [
      {
        title: '春',
        value: 'iconfont icon-home_light',
        color: '#69cdff'
      },
      {
        title: '雨',
        value: 'iconfont icon-home_light',
        color: '#69cdff'
      },
      { title: '惊', value: 'iconfont icon-home_light', color: '#69cdff' },
      { title: '春', value: 'iconfont icon-home_light', color: '#69cdff' },
      { title: '清', value: 'iconfont icon-home_light', color: '#69cdff' },
      {
        title: '谷',
        value: 'iconfont icon-home_light',
        color: '#69cdff'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  girdClick(data) {
    console.log(data.detail.currentTarget.dataset.item);
  }
});
