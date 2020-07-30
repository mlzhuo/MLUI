// components/ml-gird/ml-gird.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 每行列数
    columnNum: {
      type: Number,
      value: 3
    },
    // 只显示文字
    onlyTitle: {
      type: Boolean,
      value: false
    },
    // 只显示icon 或 图片
    noTitle: {
      type: Boolean,
      value: false
    },
    // 类型：iconfont 或者 图片
    img: {
      type: Boolean,
      value: false
    },
    // 列表
    list: {
      type: Array,
      value: []
    },
    // item高度
    height: {
      type: Number,
      value: 75
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _itemStyle: '',
    _imgStyle: '',
    _iconStyle: ''
  },

  lifetimes: {
    attached() {
      const { columnNum, height } = this.data;
      const _itemStyle = `width:${100 / columnNum}%;height:${height * 2}rpx;`;
      const h = height * 0.7 * 0.7 * 2;
      const _imgStyle = `height:${h}rpx;width:${h}rpx;`;
      const _iconStyle = `font-size:${h}rpx;`;
      this.setData({ _itemStyle, _imgStyle, _iconStyle });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _girdClick(data) {
      this.triggerEvent('girdClick', data);
    }
  }
});
