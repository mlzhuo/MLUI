// miniprogram/pages/mlui/calendar/index.js
import MLUIUTIL from '../../../utils/mlUtil';
const mlutil = new MLUIUTIL();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    pointDayList: [],
    isShowPoint: true,
    colors: ['#69cdff', '#4bd197', '#ff5c5c', '#ffcb47', '#ff8ccb'],
    activeColor: '#69cdff'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { datestr } = mlutil.formatDate(new Date());
    this.setData({
      date: datestr
    });
    this.switchChange({ detail: { value: this.data.isShowPoint } });
  },

  tapDateAction(data) {
    const date = data.detail;
    this.setData({ date });
  },
  bindDateChange(e) {
    const ym = e.detail.value;
    let day = this.data.date.slice(8, 10);

    let date = '';
    const lastDay = new Date(ym.slice(0, 4), ym.slice(5, 7), 0).getDate();
    if (lastDay >= +day) {
      date = ym + '-' + day;
    } else {
      date = ym + '-' + lastDay;
    }
    this.setData({ date });
    this.switchChange({ detail: { value: this.data.isShowPoint } });
  },
  preMonth() {
    const { date } = this.data;
    const ym = date.slice(0, 7);
    const yearMonth = mlutil
      .formatDate(+new Date(ym + '-01 00:00:00') - 24 * 3600 * 1000)
      .datestr.slice(0, 7);
    this.bindDateChange({ detail: { value: yearMonth } });
  },
  nextMonth() {
    const { date } = this.data;
    const ym = date.slice(0, 7);
    const { len } = mlutil.formatDate(+new Date(ym + '-01 00:00:00'));
    const yearMonth = mlutil
      .formatDate(+new Date(ym + '-' + len + ' 00:00:00') + 24 * 3600 * 1000)
      .datestr.slice(0, 7);
    this.bindDateChange({ detail: { value: yearMonth } });
  },
  switchChange(e) {
    const checked = e.detail.value;
    const ym = this.data.date.slice(0, 7);
    let pointDayList = [];
    if (checked) {
      pointDayList = [1, 2, 3, 4, 5].map(v => {
        return ym + '-' + mlutil.getRandom(1, 28, true);
      });
    } else {
      pointDayList = [];
    }
    this.setData({ pointDayList, isShowPoint: checked });
  },
  setColor(e) {
    const { color } = e.currentTarget.dataset;
    this.setData({ activeColor: color });
  }
});
