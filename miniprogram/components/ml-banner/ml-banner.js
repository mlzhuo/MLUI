// components/ml-banner/ml-banner.js
let timer = null;
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		height: {
			type: Number,
			value: 250
		},
		list: {
			type: Array,
			value: []
		},
		autoPlay: {
			type: Boolean,
			value: true
		},
		time: {
			type: Number,
			value: 3000
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		pageX: 0, //滑动过程中记录X坐标，用于判断左划 or 右划
		goLeft: true, // 左划

		_current: 0, //当前索引

		// 常规
		_fullScreenWidth: 0,
		_fullScreenItemWidth: 0,
		_isMoving: false,

		// 带侧边
		_fullScreenLeft: 0,
		_sideTypeWidth: 0,
		_sideTypeItemWidth: 0
	},

	lifetimes: {
		attached() {
			const { list, autoPlay } = this.data;
			const { screenWidth } = wx.getSystemInfoSync();
			this.setData(
				{
					_fullScreenWidth: list.length * screenWidth,
					_fullScreenItemWidth: screenWidth,
					_sideTypeWidth: list.length * (screenWidth - 50),
					_sideTypeItemWidth: screenWidth - 50
				},
				() => {
					if (autoPlay) {
						this.play();
					}
				}
			);
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		touchStart(e) {
			clearInterval(timer);
			const { pageX } = e.touches[0];
			this.setData({ pageX });
		},
		touchMove(e) {
			const {
				_fullScreenWidth,
				_fullScreenItemWidth,
				_fullScreenLeft,
				pageX
			} = this.data;
			const x = e.touches[0].pageX;
			let left = _fullScreenLeft + (x - pageX);
			const goLeft = x - pageX < 0; // 左划
			const minLeft = -_fullScreenWidth + _fullScreenItemWidth;
			switch (goLeft) {
				case true:
					if (left < minLeft) {
						left = minLeft;
					}
					break;

				default:
					if (left > 0) {
						left = 0;
					}
					break;
			}
			this.setData({
				_fullScreenLeft: left,
				pageX: x,
				goLeft,
				_isMoving: true
			});
		},
		touchEnd() {
			const { _current, list, _fullScreenItemWidth, goLeft } = this.data;
			let index = _current;
			if (goLeft) {
				index++;
			} else {
				index--;
			}
			index = index < 0 ? 0 : index;
			index = index > list.length - 1 ? list.length - 1 : index;
			const left =
				index > list.length - 1
					? -_fullScreenItemWidth * (list.length - 1)
					: -_fullScreenItemWidth * index;

			this.setData({
				_current: index,
				_fullScreenLeft: left,
				_isMoving: false
			});
			this.play();
		},
		play() {
			const that = this;
			if (timer) {
				clearInterval(timer);
			}
			timer = setInterval(() => {
				if (that.data._current == that.data.list.length - 1) {
					this.setData({
						_current: 0,
						_fullScreenLeft: 0,
						_isMoving: true
					});
					return;
				}
				that.touchStart({ touches: [{ pageX: 1 }] });
				that.touchMove({ touches: [{ pageX: 0 }] });
				that.touchEnd();
			}, that.data.time);
		}
	}
});
