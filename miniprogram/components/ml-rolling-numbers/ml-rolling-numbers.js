// components/ml-rolling-numbers/ml-rolling-numbers.js
let timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    number: {
      type: Number,
      value: ''
    },
    fontStyle: {
      type: String,
      value: ''
    },
    speed: {
      type: String,
      value: 'default'
    }
  },

  observers: {
    number(newVal) {
      const _number = newVal.toString();
      const _numberList = _number.split('');
      const _tempNumberList = _numberList.map(v => {
        if (isNaN(+v)) {
          return v;
        } else {
          return 0;
        }
      });
      this.setData({ _numberList: _tempNumberList });
      timer = setTimeout(v => {
        this.setData({ _numberList });
      }, 100);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _numberList: []
  },

  lifetimes: {
    attached() {},
    detached() {
      clearTimeout(timer);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});
