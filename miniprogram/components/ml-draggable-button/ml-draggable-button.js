// components/ml-draggable-button/ml-draggable-buttons.js
const { screenWidth, screenHeight } = wx.getSystemInfoSync();
let _startX = 0,
	_startY = 0,
	_pageY = 0,
	_pageX = 0, //滑动过程中记录X坐标，用于判断左划 or 右划
	_timer,
	_counter = 0;
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		bgColor: {
			type: String,
			value: '#69cdff'
		},
		sideLen: {
			type: Number,
			value: 50
		},
		shadow: {
			type: Boolean,
			value: true
		},
		position: {
			type: String,
			value: 'right'
		},
		top: {
			type: Number,
			value: 500
		},
		autoHide: {
			type: Boolean,
			value: true
		},
		time: {
			type: Number,
			value: 5000
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	lifetimes: {
		attached() {
			this.setData({
				_isHide: false,
				_counter: 0,
				_style: `${this.data.position}:0;top:${this.data.top * 2}rpx;`
			});
			this.startTimer();
		},
		detached() {
			clearInterval(_timer);
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		touchStart(e) {
			clearInterval(_timer);
			const { pageX, pageY } = e.touches[0];
			_startX = pageX;
			_startY = pageY;
			_pageX = pageX;
			_pageY = pageY;
			_counter = 0;
			this.setData({ _isHide: false, _isMoving: true });
		},
		touchMove(e) {
			_pageX = e.touches[0].pageX - this.data.sideLen / 2;
			_pageY = e.touches[0].pageY - this.data.sideLen / 2;
			this.setData({
				_style: `left:${_pageX * 2}rpx;top:${_pageY * 2}rpx;`
			});
		},
		touchEnd() {
			// 点击，处理touch 与 tap 的冲突
			if (
				Math.abs(_pageX - _startX) < 10 &&
				Math.abs(_pageY - _startY) < 10
			) {
				return;
			}
			let _top =
				_pageY < this.data.sideLen
					? 'top:auto;'
					: _pageY > screenHeight - this.data.sideLen
					? `bottom:0;`
					: `top:${_pageY * 2}rpx;`;
			let _style = `left:0;${_top};`;
			if (_pageX > screenWidth / 2) {
				_style = `left:${
					screenWidth - this.data.sideLen
				}px;${_top}`;
			}
			this.setData({ _isMoving: false, _style });
			// 右边
			this.startTimer(_pageX > screenWidth / 2);
		},
		startTimer(isRight = true) {
			const that = this;
			const { autoHide, time, _style, sideLen } = that.data;
			const [left, right] = _style.split(';');
			if (_timer) {
				clearInterval(_timer);
			}
			if (autoHide) {
				_timer = setInterval(() => {
					if (_counter * 1000 == time - 1000) {
						clearInterval(_timer);
						that.setData({
							_isHide: true,
							_style: `${
								isRight ? 'right' : 'left'
							}:-${sideLen}rpx;${right}; `
						});
					}
					_counter++;
				}, 1000);
			}
		},
		_tapTo(e) {
			this.triggerEvent('onDragBtnClick');
		}
	}
});
