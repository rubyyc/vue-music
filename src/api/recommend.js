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

export function getDiscListHot() {
	// const url = 'https://v1.itooi.cn/tencent/songList/hot'
	const url = 'https://v1.itooi.cn/tencent/songList/hot?pageSize=60'

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

export function getDiscSongList(dissid) {
	// console.log(2222)
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=ape`
	const url = `https://v1.itooi.cn/tencent/songList?id=${dissid}`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId}&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=320`
	return axios.get(url, {
		params: ''
	}).then((res) => {
		// console.log(1)
		// console.log(res.data)
		// console.log(2)
		// return res.data.data[0]
		return Promise.resolve(res.data)
	})
}