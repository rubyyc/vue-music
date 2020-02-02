import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})

	return jsonp(url, data, options)
}

// axios请求
// export function getDiscList() {
// 	// const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
// 	const url = '/api/getDiscList'

// 	const data = Object.assign({}, commonParams, {
// 		platform: 'yqq',
// 		hostUin: 0,
// 		sin: 0,
// 		ein: 29,
// 		sortId: 5,
// 		needNewCode: 0,
// 		categoryid: 10000000,
// 		rnd: Math.random(),
// 		format: 'json'
// 	})

// 	return axios.get(url, {
// 		params: data
// 	}).then((res) => {
// 		return Promise.resolve(res.data)
// 	})
// }

export function getDiscList() {
	const url = 'https://v1.itooi.cn/tencent/songList/hot'

	const data = Object.assign({}, {}, {
		categoryId: 10000000,
		sortId: 5,
		pageSize: 10,
		page: 1
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})

	// return jsonp(url, data, {})
}