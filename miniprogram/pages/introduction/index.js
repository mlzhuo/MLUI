// miniprogram/pages/introduction/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		versions: [],
		times: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		const resVersion = await wx.cloud.callFunction({
			name: 'getVersions',
			data: {}
		});
		const versions = resVersion.result.data;
		this.setData({ versions, times: getApp().globalData.times });
	}
});
