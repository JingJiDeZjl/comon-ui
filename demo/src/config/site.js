import {menu} from './menu'

export const getSiteConfig = ()=>{

	window.siteConfig = {
		title: '运营系统',
	  city_id: 1,
	  city_name: "北京市",
		user_name: "刘长锋",
	  role_name: "超级管理员",
	  city_ids: "1,2",
	  city_names: "北京市,天津市"
	}

	let config = window.siteConfig || {};
	config['menu'] = menu;
	config['otherPlt'] = [{
		url: 'test.com',
		description: 'test'
	}]
	return config
}
