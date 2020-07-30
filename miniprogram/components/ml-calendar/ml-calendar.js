// components/calendar/index.js
import MLUIUTIL from '../../utils/mlUtil';
const mlUtils = new MLUIUTIL();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		selectedDate: {
			type: String,
			value: mlUtils.formatDate(new Date()).datestr
		},
		dataObj: {
			type: Array,
			value: []
		}
	},

	observers: {
		selectedDate(newVal) {
			this.setData(
				{
					_chooseDay: newVal,
					_today: mlUtils.formatDate(new Date()).datestr
				},
				() => {
					this.setMonthDay();
				}
			);
		},
		dataObj(newVal) {
			this.setData({ _dataObj: newVal }, () => {
				this.setMonthDay();
			});
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		_today: '', // 2020-07-26
		_dataObj: [],
		_dayList: [],
		_chooseDay: '' // 2020-07-26
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		setMonthDay() {
			const defaultTime = ' 00:00:00';
			const { selectedDate, _dataObj } = this.data;
			const { w, datestr, len } = mlUtils.formatDate(
				selectedDate.slice(0, 7) + '-01' + defaultTime
			);
			let _dayList = [];
			for (let i = 0; i < w; i++) {
				_dayList.push({});
			}

			for (let i = 0; i < len; i++) {
				const _dayItem = mlUtils.formatDate(
					+new Date(datestr + defaultTime) + i * 24 * 3600 * 1000
				);
				_dayList.push({
					_date: _dayItem.datestr,
					_day: _dayItem.d,
					_isShowPoint:
						_dataObj.findIndex(v => v == _dayItem.datestr) !== -1
				});
			}
			const _last =
				_dayList.length % 7 === 0 ? 0 : 7 - (_dayList.length % 7);
			for (let i = 0; i < _last; i++) {
				_dayList.push({});
			}
			let _tempArr = [];
			for (let i = 0; i < _dayList.length / 7; i++) {
				_tempArr.push(_dayList.slice(i * 7, i * 7 + 7));
			}
			this.setData({
				_dayList: _tempArr
			});
		},
		_dayTap(e) {
			const { date } = e.currentTarget.dataset;
			if (!date) {
				return;
			}
			this.setData(
				{
					_chooseDay: date
				},
				() => {
					this._tapDateAction(date);
				}
			);
		},
		_tapDateAction(date) {
			this.triggerEvent('tapDateAction', date);
		}
	}
});
