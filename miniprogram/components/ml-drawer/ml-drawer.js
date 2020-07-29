// components/ml-drawer/ml-drawer.js
let screenWidth = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean,
      value: false
    },
    width: {
      type: String,
      value: '60%'
    },
    position: {
      type: String,
      value: 'left'
    },
    bgColor: {
      type: String,
      value: 'rgba(0,0,0,0.6)'
    },
    // 引用组件的页面是否自定义导航栏
    // 用于设置组件打开时的top
    isCustomNav: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _height: '',
    _top: '0'
  },

  lifetimes: {
    attached() {
      const res = wx.getSystemInfoSync();
      const { statusBarHeight, screenHeight } = res;
      let _customBarHeight;
      if (res.platform == 'android') {
        _customBarHeight = statusBarHeight + 48;
      } else {
        _customBarHeight = statusBarHeight + 44;
      }
      const _height = screenHeight - _customBarHeight;
      this.setData({ _height, _top: _customBarHeight });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _closeDrawer() {
      this.setData({ _position: '' });
      this.triggerEvent('closeDrawer', false);
    }
  }
});
