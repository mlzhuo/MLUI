// miniprogram/pages/mlui/multiple_picker/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    key: 'id',
    labelKey: 'name',
    list: [
      {
        name: '多效驻颜疗程',
        id: 1007431
      },
      {
        name: '亮颜焕透疗程',
        id: 1007442
      },
      {
        name: '水光保湿疗程',
        id: 1007453
      },
      {
        name: '眼部按摩疗程',
        id: 1007464
      },
      {
        name: '无针水光凝时疗程',
        id: 1007755
      },
      {
        name: '【免费版】多效驻颜疗程',
        id: 1007439
      },
      {
        name: '【免费版】亮颜焕透疗程',
        id: 1007449
      },
      {
        name: '【免费版】水光保湿疗程',
        id: 1007459
      },
      {
        name: '【免费版】眼部按摩疗程',
        id: 1007469
      },
      {
        name: '【免费版】无针水光冰肌疗程',
        id: 1007779
      }
    ],
    checkList: [],
    open: false,
    os: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  confirmPick(e) {
    const checkList = e.detail;
    console.log(checkList);
  },
  onTap(e) {
    const { os } = e.currentTarget.dataset;
    this.setData({
      os,
      open: true
    });
  }
});
