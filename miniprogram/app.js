//app.js
App({
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
					this.globalData = { times };
				});
		}
	}
});
