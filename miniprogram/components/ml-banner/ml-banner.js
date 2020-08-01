// components/ml-banner/ml-banner.js
let timer = null;

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
    },
    isDot: {
      type: Boolean,
      value: true
    },
    dotColor: {
      type: String,
      value: '#69cdff'
    },
    type: {
      type: String,
      value: 'default' // default:默认不带侧边栏  side: 带侧边栏
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // _startX: 0, //划动开始点  用于计算划动距离
    // _pageX: 0, //滑动过程中记录X坐标，用于判断左划 or 右划
    // _goLeft: true, // 左划
    // _distance: 0, // 划动距离
    _current: 0, //当前索引
    // 常规
    _fullScreenLeft: 0,
    _isMoving: false
  },

  lifetimes: {
    attached() {
      if (this.data.autoPlay) {
        this.play();
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      clearInterval(timer);
      const { pageX } = e.touches[0];
      _pageX = pageX;
      _startX = pageX;
      _distance = 0;
      this.setData({
        _isMoving: true
      });
    },
    touchMove(e) {
      _pageX = e.touches[0].pageX;
      _distance = _pageX - _startX;
      _goLeft = _distance < 0; // 左划
    },
    touchEnd() {
      const {  list, autoPlay, _current } = this.data;
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
      const left = `-${index * 100}vw`;
      this.setData({
        _current: index,
        _fullScreenLeft: left,
        _isMoving: false
      });
      if (autoPlay) {
        this.play();
      }
    },
    play() {
      const that = this;
      const { _current, time, list } = that.data;
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        if (_current == list.length - 1) {
          this.setData({
            _current: 0,
            _fullScreenLeft: 0,
            _isMoving: true
          });
          return;
        }
        that.touchStart({ touches: [{ pageX: 21 }] });
        that.touchMove({ touches: [{ pageX: 0 }] });
        that.touchEnd();
      }, time);
    },

    stopVideo() {
      this.data.list.forEach((v, i) => {
        if (v.type === 'video') {
          const videoContext = wx.createVideoContext('banner-video-' + i, this); //这里对应的视频id
          videoContext.pause();
        }
      });
    }
  }
});
