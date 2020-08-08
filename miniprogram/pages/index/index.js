//index.js
const app = getApp();
Page({
  data: {
    girdItemListIcon: [
      {
        title: 'Calendar',
        value: 'iconfont icon-rili',
        color: '#69cdff',
        url: '../mlui/calendar/index'
      },
      {
        title: 'NavigationBar',
        value: 'iconfont icon-daohanglan',
        color: '#69cdff',
        url: '../mlui/navigationbar/index'
      },
      {
        title: 'Drawer',
        value: 'iconfont icon-narrow',
        color: '#69cdff',
        url: '../mlui/drawer/index'
      },
      {
        title: 'Grid',
        value: 'iconfont icon-gongge1',
        color: '#69cdff',
        url: '../mlui/grid/index'
      },
      {
        title: 'Swiper',
        value: 'iconfont icon-carousel',
        color: '#69cdff',
        url: '../mlui/swiper/index'
      },
      {
        title: 'DraggableButton',
        value: 'iconfont icon-tuodonganniu',
        color: '#69cdff',
        url: '../mlui/draggable_button/index'
      },
      {
        title: 'RollingNumbers',
        value: 'iconfont icon-shuzi',
        color: '#69cdff',
        url: '../mlui/rolling_numbers/index'
      },
      {
        title: 'Timeline',
        value: 'iconfont icon-shijianzhou',
        color: '#69cdff',
        url: '../mlui/timeline/index'
      },
      {
        title: 'Waterfall',
        value: 'iconfont icon-pubuliu',
        color: '#69cdff',
        url: '../mlui/waterfall/index'
      }
    ]
  },

  onLoad() {},

  girdClick(data) {
    const { url } = data.detail.currentTarget.dataset.item;
    wx.navigateTo({ url });
  }
});
