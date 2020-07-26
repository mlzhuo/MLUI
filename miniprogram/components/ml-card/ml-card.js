// components/ml-card/ml-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: String,
    width: String,
    bgColor: {
      type: String,
      value: '#fff'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _cardStyle: ''
  },

  lifetimes: {
    attached() {
      const { height, width, bgColor } = this.data;
      const _cardStyle = `height:${height};width:${width};background-color:${bgColor}`;
      this.setData({ _cardStyle });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {}
});
