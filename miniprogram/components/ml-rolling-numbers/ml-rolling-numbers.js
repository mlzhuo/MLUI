// components/ml-rolling-numbers/ml-rolling-numbers.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		number: {
			type: Number,
			value: ''
		},
		fontSize: {
			type: Number,
			value: 14
		},
		speed: {
			type: String,
			value: 'normal'
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		_numberList: []
	},

	lifetimes: {
		attached() {
			const _number = this.data.number.toString();
			const _numberList = _number.split('');
			const _tempNumberList = _numberList.map(v => {
				if (isNaN(+v)) {
					return v;
				} else {
					return 0;
				}
			});
			this.setData({ _numberList: _tempNumberList });
			setTimeout(v => {
				this.setData({ _numberList });
			}, 100);
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {}
});
