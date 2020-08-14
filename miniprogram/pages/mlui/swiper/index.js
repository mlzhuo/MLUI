// miniprogram/pages/mlui/banner/index.js
const { filePath } = getApp().globalData;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		current: 0,
		list: [
			{
				type: 'video',
				url: filePath + '/banner/demo.mp4'
			},
			{ type: 'image', url: filePath + '/banner/banner1.png' },
			{ type: 'image', url: filePath + '/banner/banner2.png' },
			{ type: 'image', url: filePath + '/banner/banner3.png' },
			{ type: 'image', url: filePath + '/banner/banner4.png' },
			{ type: 'image', url: filePath + '/banner/banner5.png' },
			{ type: 'image', url: filePath + '/banner/banner6.png' }
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},
	itemClick(swiperItem) {
		console.log(swiperItem);
	}
});
