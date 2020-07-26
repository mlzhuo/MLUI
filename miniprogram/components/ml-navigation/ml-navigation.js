// components/ml-navigation/ml-navigation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      value: '#ffffff'
    },
    color: {
      type: String,
      value: '#353535'
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
    _customBarHeight: 65,
    _statusBarHeight: 20,
    _customBarStyle: '',
    _customBarInnerStyle: '',
    _iconViewStyle: '',
    _iconStyle: '',
    _page: []
  },

  lifetimes: {
    attached() {
      const _page = getCurrentPages()
      const { bgColor, color } = this.data;
      const menuRes = wx.getMenuButtonBoundingClientRect();
      const { height, top, width } = menuRes;
      const res = wx.getSystemInfoSync();
      const { statusBarHeight } = res;
      let _customBarHeight;
      if (res.platform == 'android') {
        _customBarHeight = statusBarHeight + 50;
      } else {
        _customBarHeight = statusBarHeight + 45;
      }
      this.setData({
        _page,
        _statusBarHeight: statusBarHeight,
        _customBarHeight,
        _customBarStyle: `height:${_customBarHeight * 2}rpx;padding-top: ${
          statusBarHeight * 2
        }rpx;background-color:${bgColor};color:${color}`,
        _customBarInnerStyle: `top:${top * 2}rpx;height:${
          height * 2
        }rpx;line-height:${height * 2}rpx`,
        _iconViewStyle: `width:${width * 2}rpx;height:${
          height * 2
        }rpx;line-height:${height * 2}rpx;top:${
          top * 2
        }rpx;left: 20rpx;border-radius:${height}rpx`,
        _iconStyle: `width:${height * 2}rpx;height:${
          height * 2
        }rpx;color:${color}`
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
