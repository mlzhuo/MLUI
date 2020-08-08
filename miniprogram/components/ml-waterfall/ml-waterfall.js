// components/ml-waterfall/ml-waterfall.js
const { screenWidth, screenHeight } = wx.getSystemInfoSync();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    column: {
      type: Number,
      value: 2
    },
    gap: {
      type: Number,
      value: 10
    }
  },

  observers: {
    list(newVal) {
      if (newVal.length === 0) {
        return;
      }
      this.initData();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _column: 2,
    _columns: [],
    _columnsHeights: []
  },

  lifetimes: {
    attached() {
      const { column, gap } = this.data;
      let _column = parseInt(column);
      _column = _column < 1 ? 2 : _column;
      const _itemWidth = (screenWidth - (_column - 1) * gap) / _column;
      const _columns = Array.from({ length: _column }, (v, k) => []);
      const _columnsHeights = Array.from({ length: _column }, (v, k) => 0);
      this.setData({
        _column,
        _columns,
        _columnsHeights,
        _itemWidth
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async initData() {
      const { list } = this.data;
      for (let i = 0; i < list.length; i++) {
        const { _columns, _columnsHeights } = this.data;
        const item = list[i];
        const minHeightIndex = _columnsHeights.findIndex(
          v => v == Math.min(..._columnsHeights)
        );
        _columns[minHeightIndex].push(item);
        this.setData({ _columns });
        await this.setColumnHeight();
      }
    },
    setColumnHeight() {
      const that = this;
      const { _columnsHeights } = that.data;
      let _newColumnsHeights = [];
      const query = that.createSelectorQuery();
      return new Promise((resolve, reject) => {
        for (let i = 0; i < _columnsHeights.length; i++) {
          query.select('#inner-content-' + i).boundingClientRect();
        }
        query.exec(res => {
          _newColumnsHeights = res.map(v => v.height);
          that.setData({ _columnsHeights: _newColumnsHeights }, () => {
            resolve();
          });
        });
      });
    }
  }
});
