// components/ml-navigation/ml-navigation.js
let _customBarHeight = 65;
let _statusBarHeight = 20;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      value: '#69cdff'
    },
    color: {
      type: String,
      value: '#fff'
    },
    title: {
      type: String,
      value: 'MLUI 组件库'
    },
    isShowBack: {
      type: Boolean,
      value: true
    },
    isShowHome: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // _customBarHeight: 65,
    // _statusBarHeight: 20,
    _customBarStyle: '',
    _customBarInnerStyle: '',
    _iconViewStyle: '',
    _iconStyle: '',
    _page: []
  },

  lifetimes: {
    attached() {
      const _page = getCurrentPages();
      const { bgColor, color } = this.data;
      const menuRes = wx.getMenuButtonBoundingClientRect();
      const { height, top, width } = menuRes;
      const res = wx.getSystemInfoSync();
      const { statusBarHeight } = res;
      if (res.platform == 'android') {
        _customBarHeight = statusBarHeight + 48;
      } else {
        _customBarHeight = statusBarHeight + 44;
      }
      _statusBarHeight = statusBarHeight;
      this.setData({
        _page,
        _customBarStyle: `height:${_customBarHeight}px;padding-top: ${statusBarHeight}px;background-color:${bgColor};color:${color}`,
        _customBarInnerStyle: `top:${top}px;height:${height}px;line-height:${height}px`,
        _iconViewStyle: `width:${width}px;height:${height}px;line-height:${height}px;top:${top}px;left: 20rpx;border-radius:${height}px`,
        _iconStyle: `width:${height}px;height:${height}px;color:${color}`
      });
      if (bgColor.indexOf('#fff') === -1) {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: bgColor
        });
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      });
    },
    home() {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }
  }
});
