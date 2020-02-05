import axios from 'axios'
export default class Song {
	constructor({id, mid, singer, name, album, duration, image, url}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}

	getLyric() {
		const url = `https://v1.itooi.cn/tencent/lrc?id=${this.mid}`
		return axios.get(url, {
				params: ''
		}).then((res) => {
			// console.log(1)
			// console.log(res.data)
			// console.log(2)
			this.lyric = res.data
			// console.log(1)
			// console.log(this.lyric)
			return Promise.resolve(res.data)
		})
	}
}

// export function createSong(musicData, musicUrl) {
export function createSong(musicData, musicUrl) {
	// let urlObject = jqueryUrl(musicUrl)
	let musicTime = musicData.interval
	// if (!urlObject.vkey) {
	// 	musicUrl = 'http://dl.stream.qqmusic.qq.com/M5000013DImv4HrsDd.mp3?guid=BZQLL&vkey=76285130A1016073B1DC0481C88456D099856DD71848DC7EAA52B03EBE98E4F8888EB81B6424D2B3A17E6EE40253641E4EF21AB5F1470DE2&uin=0&fromtag=8&name=123123'
	// 	musicTime = 94
	// 	// console.log(1)
	// 	return false
	// }
	// console.log(2)
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicTime,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		// url: `https://v1.itooi.cn/tencent/url?id=&quality=ape`
		// url: `https://v1.itooi.cn/tencent/url?${musicData.mid}&quality=ape`
		url: musicUrl
		// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
	})
}

function filterSinger(singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}

export function getSongmp3(songId) {
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=ape`
	const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId}&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=320`
	return axios.get(url, {
		params: ''
	}).then((res) => {
		// console.log(1)
		// console.log(res.data.data[0])
		// console.log(2)
		// return res.data.data[0]
		return Promise.resolve(res.data)
	})
}

// function jqueryUrl(url) {
// 	var arr = url.split('?')
// 	var obj = {}
// 	if (arr[1]) {
// 		var params = arr[1].split('&')
// 		for (var i = 0; i < params.length; i++) {
// 			var param = params[i].split('=')
// 			obj[param[0]] = param[1]
// 		}
// 	}
// 	return obj
// }
