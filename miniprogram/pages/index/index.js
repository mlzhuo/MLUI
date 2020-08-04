//index.js
const app = getApp();
Page({
	data: {
		girdItemListIcon: [
			{
				title: 'calendar',
				value: 'iconfont icon-rili',
				color: '#69cdff',
				url: '../mlui/calendar/index'
			},
			{
				title: 'navigation',
				value: 'iconfont icon-navigation-bar',
				color: '#69cdff',
				url: '../mlui/navigation/index'
			},
			{
				title: 'drawer',
				value: 'iconfont icon-narrow',
				color: '#69cdff',
				url: '../mlui/drawer/index'
			},
			{
				title: 'grid',
				value: 'iconfont icon-gongge1',
				color: '#69cdff',
				url: '../mlui/grid/index'
			},
			{
				title: 'swiper',
				value: '',
				color: '#69cdff',
				url: '../mlui/swiper/index'
			},
			{
				title: 'draggable\nbutton',
				value: '',
				color: '#69cdff',
				url: '../mlui/draggable_button/index'
			},
			{
				title: 'rolling\nnumbers',
				value: '',
				color: '#69cdff',
				url: '../mlui/rolling_numbers/index'
			}
		]
	},

	onLoad() {},

	girdClick(data) {
		const { url } = data.detail.currentTarget.dataset.item;
		wx.navigateTo({ url });
	}
});
