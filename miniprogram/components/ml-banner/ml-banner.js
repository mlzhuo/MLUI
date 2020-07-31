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
    screenWidth: 375,

    pageX: 0, //滑动过程中记录X坐标，用于判断左划 or 右划
    goLeft: true, // 左划

    _current: 0, //当前索引

    // 常规
    _fullScreenWidth: 0,
    _fullScreenItemWidth: 0,
    _fullScreenLeft: 0,
    _isMoving: false,

    // 带侧边
    _sideTypeWidth: 0,
    _sideTypeItemWidth: 0,
    _sideTypeScreenLeft: 0
  },

  lifetimes: {
    attached() {
      const { list, autoPlay } = this.data;
      const { screenWidth } = wx.getSystemInfoSync();
      this.setData(
        {
          screenWidth,
          _fullScreenWidth: list.length * screenWidth,
          _fullScreenItemWidth: screenWidth,
          _sideTypeWidth:
            50 +
            list.length * (screenWidth - 100) +
            (list.length - 1) * 15 +
            50,
          _sideTypeItemWidth: screenWidth - 100
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
      this.setData({ pageX, _isMoving: true });
    },
    touchMove(e) {
      const {
        screenWidth,
        _fullScreenWidth,
        _fullScreenItemWidth,
        _fullScreenLeft,
        _sideTypeWidth,
        _sideTypeItemWidth,
        _sideTypeScreenLeft,
        pageX,
        type
      } = this.data;
      const x = e.touches[0].pageX;
      const goLeft = x - pageX < 0; // 左划
      if (type === 'default') {
        let left = _fullScreenLeft + (x - pageX);
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
          goLeft
        });
      } else {
        // type=side
        let left = _sideTypeScreenLeft + (x - pageX);
        const minLeft = -_sideTypeWidth + screenWidth;
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
          _sideTypeScreenLeft: left,
          pageX: x,
          goLeft
        });
      }
    },
    touchEnd() {
      const {
        _current,
        list,
        _fullScreenItemWidth,
        _sideTypeItemWidth,
        goLeft,
        autoPlay,
        type
      } = this.data;
      let index = _current;
      if (goLeft) {
        index++;
      } else {
        index--;
      }
      index = index < 0 ? 0 : index;
      index = index > list.length - 1 ? list.length - 1 : index;
      if (type === 'default') {
        const left =
          index > list.length - 1
            ? -_fullScreenWidth + _fullScreenItemWidth
            : -_fullScreenItemWidth * index;

        this.setData({
          _current: index,
          _fullScreenLeft: left,
          _isMoving: false
        });
      } else {
        const left =
          index > list.length - 1
            ? -_sideTypeWidth + screenWidth
            : -(_sideTypeItemWidth + 15) * index;

        this.setData({
          _current: index,
          _sideTypeScreenLeft: left,
          _isMoving: false
        });
      }
      if (autoPlay) {
        this.play();
      }
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
            _sideTypeScreenLeft: 0,
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
