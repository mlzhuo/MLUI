// miniprogram/pages/mlui/timeline/index.js
const { filePath } = getApp().globalData;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		list: [
			{
				month: '08',
				day: '06',
				icon: 'icon-yuandian-xuanzhongcopy',
				color: 'green font-20',
				content: filePath + '/banner/banner1.png'
			},
			{
				month: '08',
				day: '05',
				icon: 'icon-xuanzhong',
				color: 'blue font-20',
				content:
					'春雨惊春清谷天，夏满芒夏暑相连。\n秋处露秋寒霜降，冬雪雪冬小大寒。'
			},
			{
				month: '08',
				day: '04',
				icon: 'icon-gaojing',
				color: 'orange font-20',
				content:
					'春雨惊春清谷天，夏满芒夏暑相连。\n秋处露秋寒霜降，冬雪雪冬小大寒。'
			},
			{
				month: '08',
				day: '03',
				icon: 'icon-cuowu',
				color: 'red font-20',
				content:
					'春雨惊春清谷天，夏满芒夏暑相连。\n秋处露秋寒霜降，冬雪雪冬小大寒。'
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {}
});
