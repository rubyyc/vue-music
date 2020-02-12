import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		needNewCode: 1
	})
	return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
	// const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
	const url = '/api/getSearch'

	const data = Object.assign({}, commonParams, {
		// _: 1581129212860,
		g_tk: 373108139,
		// uin: 759337828
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
		w: `${query}`,
		zhidaqu: 1,
		catZhida: zhida ? 1 : 0,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage: perpage,
		n: perpage,
		uid: 0,
		p: `${page}`,
		remoteplace: 'txt.mqq.all'
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
