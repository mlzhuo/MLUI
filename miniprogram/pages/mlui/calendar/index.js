// miniprogram/pages/mlui/calendar/index.js
import MLUIUTIL from '../../../utils/mlUtil';
const mlutil = new MLUIUTIL();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		date: '',
		pointDayList: [
			'2020-07-03',
			'2020-07-07',
			'2020-07-12',
			'2020-07-13',
			'2020-07-16',
			'2020-07-25',
			'2020-07-26'
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { datestr } = mlutil.formatDate(new Date());
		this.setData({
			date: datestr
		});
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
			.formatDate(
				+new Date(ym + '-' + len + ' 00:00:00') + 24 * 3600 * 1000
			)
			.datestr.slice(0, 7);
		this.bindDateChange({ detail: { value: yearMonth } });
	}
});
