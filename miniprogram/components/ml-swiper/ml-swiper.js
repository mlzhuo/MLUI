// components/ml-banner/ml-banner.js
let _timer = null;
let _startX = 0; //划动开始点  用于计算划动距离
let _pageX = 0; //滑动过程中记录X坐标，用于判断左划 or 右划
let _goLeft = true; // 左划
let _distance = 0; // 划动距离

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		height: {
			type: Number,
			value: 200
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
		},
		isDot: {
			type: Boolean,
			value: true
		},
		dotColor: {
			type: String,
			value: '#69cdff'
		},
		showPreNext: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		_current: 0, //当前索引
		_fullScreenLeft: 0, //全屏图片
		_widthSideLeft: 0, //带前后一部分
		_noTransition: false
	},

	lifetimes: {
		attached() {
			if (this.data.autoPlay) {
				this.play();
			}
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
			const { pageX } = e.touches[0];
			_pageX = pageX;
			_startX = pageX;
			_distance = 0;
			this.setData({ _noTransition: false });
		},
		touchMove(e) {
			_pageX = e.touches[0].pageX;
			_distance = _pageX - _startX;
			_goLeft = _distance < 0; // 左划
		},
		touchEnd() {
			const { list, autoPlay, _current } = this.data;
			if (Math.abs(_distance) < 20) {
				return;
			}
			let index = _current;
			if (_goLeft) {
				index++;
			} else {
				index--;
			}
			index = index < 0 ? 0 : index;
			index = index > list.length - 1 ? list.length - 1 : index;
			if (list[index].type !== 'video') {
				this.stopVideo();
			}
			this.setData(
				{
					_current: index,
					_fullScreenLeft: `-${index * 100}vw`,
					_widthSideLeft: `-${index * 80}vw`
				},
				() => {
					if (autoPlay) {
						this.play();
					}
				}
			);
		},
		play() {
			const that = this;
			if (_timer) {
				clearInterval(_timer);
			}
			_timer = setInterval(() => {
				const { _current, list } = that.data;
				if (_current == list.length - 1) {
					that.setData({
						_current: 0,
						_fullScreenLeft: 0,
						_widthSideLeft: 0,
						_noTransition: true
					});
					return;
				}
				that.touchStart({ touches: [{ pageX: 25 }] });
				that.touchMove({ touches: [{ pageX: 0 }] });
				that.touchEnd();
			}, that.data.time);
		},

		stopVideo() {
			this.data.list.forEach((v, i) => {
				if (v.type === 'video') {
					const videoContext = wx.createVideoContext(
						'banner-video-' + i,
						this
					);
					videoContext.pause();
				}
			});
		}
	}
});
