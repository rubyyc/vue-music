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
// export function createSong(musicData, musicUrl, isDiscSongList, isTopListSong) {
// 	let musicTime = musicData.interval
// 	if (!isDiscSongList) {
// 		if (isTopListSong) {
// 			// console.log(musicData)
// 			return new Song({
// 				id: musicData.songid,
// 				mid: musicData.songmid,
// 				singer: filterSinger(musicData.singer),
// 				name: musicData.songname,
// 				album: musicData.albumname,
// 				duration: musicTime,
// 				image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
// 				// url: `https://v1.itooi.cn/tencent/url?id=&quality=ape`
// 				// url: `https://v1.itooi.cn/tencent/url?${musicData.mid}&quality=ape`
// 				url: musicUrl
// 				// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
// 			})
// 		}
// 		// let urlObject = jqueryUrl(musicUrl)
// 		// if (!urlObject.vkey) {
// 		// 	musicUrl = 'http://dl.stream.qqmusic.qq.com/M5000013DImv4HrsDd.mp3?guid=BZQLL&vkey=76285130A1016073B1DC0481C88456D099856DD71848DC7EAA52B03EBE98E4F8888EB81B6424D2B3A17E6EE40253641E4EF21AB5F1470DE2&uin=0&fromtag=8&name=123123'
// 		// 	musicTime = 94
// 		// 	// console.log(1)
// 		// 	return false
// 		// }
// 		// console.log(2)
// 		return new Song({
// 			id: musicData.songid,
// 			mid: musicData.songmid,
// 			singer: filterSinger(musicData.singer),
// 			name: musicData.songname,
// 			album: musicData.albumname,
// 			duration: musicTime,
// 			image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
// 			// url: `https://v1.itooi.cn/tencent/url?id=&quality=ape`
// 			// url: `https://v1.itooi.cn/tencent/url?${musicData.mid}&quality=ape`
// 			url: musicUrl
// 			// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
// 		})
// 	} else {
// 		return new Song({
// 			id: musicData.id,
// 			mid: musicData.mid,
// 			singer: filterSinger(musicData.singer),
// 			name: musicData.name,
// 			album: musicData.album.name,
// 			duration: musicTime,
// 			// https://y.gtimg.cn/music/photo_new/T002R300x300M000001VRyrj0s7U3K.jpg?max_age=2592000
// 			image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
// 			// url: `https://v1.itooi.cn/tencent/url?id=&quality=ape`
// 			// url: `https://v1.itooi.cn/tencent/url?${musicData.mid}&quality=ape`
// 			url: musicUrl
// 			// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
// 		})
// 	}
// }

export function createSong(musicData, musicUrl, isDiscSongList, isTopListSong) {
	let musicTime = musicData.interval
	if (!isDiscSongList) {
		if (isTopListSong) {
			// console.log(musicData)
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
				url: `https://v1.itooi.cn/tencent/url?id=${musicData.songmid}&quality=flac`
				// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
			})
		}
		// let urlObject = jqueryUrl(musicUrl)
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
			url: `https://v1.itooi.cn/tencent/url?id=${musicData.songmid}&quality=flac`
			// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
		})
	} else {
		return new Song({
			id: musicData.id,
			mid: musicData.mid,
			singer: filterSinger(musicData.singer),
			name: musicData.name,
			album: musicData.album.name,
			duration: musicTime,
			// https://y.gtimg.cn/music/photo_new/T002R300x300M000001VRyrj0s7U3K.jpg?max_age=2592000
			image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
			// url: `https://v1.itooi.cn/tencent/url?id=&quality=ape`
			// url: `https://v1.itooi.cn/tencent/url?${musicData.mid}&quality=ape`
			url: `https://v1.itooi.cn/tencent/url?id=${musicData.mid}&quality=flac`
			// url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
		})
	}
}

export function filterSinger(singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}

export async function getSongmp3(songId, index) {
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=ape`
	const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId}&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=320`
	return await axios.get(url, {
		params: ''
	}).then((res) => {
		// console.log(index)
		// console.log(res.data.data[0])
		// console.log(2)
		// return res.data.data[0]
		return Promise.resolve(res.data)
	})
}

export function getSongmp3Detail(songId) {
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=ape`
	const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId}&quality=flac`
	// const url = `https://v1.itooi.cn/tencent/url?id=${songId},001fXNWa3t8EQQ&quality=320`
	return axios.get(url, {
		params: ''
	}).then((res) => {
		// console.log(index)
		// console.log(res.data.data[0])
		// console.log(2)
		// return res.data.data[0]
		return Promise.resolve(res.data)
	})
}

export function jqueryUrl(url) {
	var arr = url.split('?')
	var obj = {}
	if (arr[1]) {
		var params = arr[1].split('&')
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split('=')
			obj[param[0]] = param[1]
		}
	}
	return obj
}
