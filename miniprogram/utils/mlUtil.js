class MLUIUTIL {
  constructor() {}

  addZero(num) {
    return num < 10 ? '0' + num : num + '';
  }

  formatDate(date) {
    if (!date) {
      return '';
    }
    date = new Date(date);
    const y = date.getFullYear(); //年
    const M = this.addZero(date.getMonth() + 1); //月
    const d = this.addZero(date.getDate()); //日
    const h = this.addZero(date.getHours()); //小时
    const m = this.addZero(date.getMinutes()); //分
    const s = this.addZero(date.getSeconds()); //秒
    const w = date.getDay(); //周
    const datestr = y + '-' + M + '-' + d;
    const len = new Date(y, M, 0).getDate();

    const dateObj = { y, M, d, h, m, s, w, datestr, len };
    return dateObj;
  }

  navTo(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  }
}

export default MLUIUTIL;
