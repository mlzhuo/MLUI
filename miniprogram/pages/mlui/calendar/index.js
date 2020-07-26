// miniprogram/pages/mlui/calendar/index.js
import MLUIUTIL from '../../../utils/mlUtil';
const mlUtils = new MLUIUTIL();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    yearMonth: '',
    dataObj: {
      '2020-07-03': true,
      '2020-07-07': true,
      '2020-07-12': true,
      '2020-07-13': true,
      '2020-07-16': true,
      '2020-07-25': true,
      '2020-07-26': true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { y, M, datestr } = mlUtils.formatDate(new Date());
    this.setData({
      date: datestr,
      yearMonth: y + '-' + M
    });
  },

  tapDateAction(data) {
    const date = data.detail;
    this.setData({ date });
  },
  bindDateChange(e) {
    this.setData({
      yearMonth: e.detail.value
    });
  },
  preMonth() {
    const yearMonth = mlUtils
      .formatDate(
        +new Date(this.data.yearMonth + '-01 00:00:00') - 24 * 3600 * 1000
      )
      .datestr.slice(0, 7);
    this.setData({ yearMonth });
  },
  nextMonth() {
    const { len } = mlUtils.formatDate(
      +new Date(this.data.yearMonth + '-01 00:00:00')
    );
    const yearMonth = mlUtils
      .formatDate(
        +new Date(this.data.yearMonth + '-' + len + ' 00:00:00') +
          24 * 3600 * 1000
      )
      .datestr.slice(0, 7);
    this.setData({ yearMonth });
  }
});
