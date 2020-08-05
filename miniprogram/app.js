//app.js
App({
	globalData: {
		times: 0,
		filePath: 'cloud://ml-ui-mrr.6d6c-ml-ui-mrr-1302725761'
	},
	onLaunch: function () {
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力');
		} else {
			wx.cloud.init({ traceUser: true });
			wx.cloud
				.callFunction({
					name: 'updateGuest',
					data: {}
				})
				.then(res => {
					const { times } = res.result.data[0];
					this.globalData.times = times;
				});
		}
	}
});
