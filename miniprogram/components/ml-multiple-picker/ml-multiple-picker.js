// components/ml-multiple-picker/ml-multiple-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pickerList: {
      // 选项列表
      type: Array,
      value: []
    },
    checkList: {
      // 默认选中
      type: Array,
      value: []
    },
    os: {
      // Android和iOS
      // UI不同
      // 不传自动区分
      type: String,
      value: ''
    },
    key: {
      // picker item 唯一key
      type: String,
      value: 'id'
    },
    labelKey: {
      // 显示内容 key
      type: String,
      value: 'name'
    },
    open: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    checkList(newVal) {
      this.setData({ _checkList: newVal });
    },
    open(newVal) {
      this.setData({ _open: newVal });
    },
    os(newVal) {
      const { platform } = wx.getSystemInfoSync();
      let _os = platform == 'devtools' ? 'ios' : platform;
      switch (newVal) {
        case 'android':
        case 'ios':
          _os = newVal;
          break;
        default:
          break;
      }
      this.setData({ _os });
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _os: '',
    _checkList: [],
    _open: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _itemTap(e) {
      const { item } = e.currentTarget.dataset;
      const { key, _checkList } = this.data;
      let _tempCheckList = [..._checkList];
      const index = _tempCheckList.findIndex(v => v[key] == item[key]);
      if (index !== -1) {
        _tempCheckList.splice(index, 1);
      } else {
        _tempCheckList.push(item);
      }
      this.setData({ _checkList: _tempCheckList });
    },
    _confirm() {
			this.triggerEvent('confirm', this.data._checkList);
			this.setData({ _open: false });
    },
    _cancel() {
      this.setData({ _open: false });
    }
  }
});
