<template>
	<transition name="slide" appear>
		<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {ERR_OK} from 'api/config'
	// import {createSong, getSongmp3, jqueryUrl} from 'common/js/song'
	import {createSong} from 'common/js/song'
	import MusicList from 'components/music-list/music-list'

	export default {
		data() {
			return {
				songs: []
				// sortSongs: []
			}
		},
		computed: {
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			this._getDetail()
			// console.log(this.singer)
		},
		methods: {
			_getDetail() {
				if (!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						// this.songs =res.data.list
						// console.log(res.data.list)
						// this._normalizeSongs(res.data.list)
						this.songs = this._normalizeSongs(res.data.list)
						// setTimeout(() => {
						// 	// console.log(r)
						// 	this.songs = temp
						// }, 1000)
						// let temp = this._normalizeSongs(res.data.list)
						// // let r = []
						// setTimeout(() => {
						// 		temp.sort((a, b) => {
						// 			return b.id - a.id
						// 		})
						// }, 600)
						// setTimeout(() => {
						// 	// console.log(r)
						// 	this.songs = temp
						// }, 2000)
						// setTimeout(() => {
						// 	// this.songs = this._normalizeSongs(res.data.list)
						// 	// console.log(temp)
						// 	// temp.forEach((item) => {
						// 	// 	let {musicData} = item
						// 	// 	console.log(musicData)
						// 	// })
						// 	setTimeout(() => {
						// 		temp.sort((a, b) => {
						// 			return b.id - a.id
						// 			// console.log()
						// 			// console.log(9999)
						// 		})
						// 		// console.log(66666661)
						// 		// console.log(r)
						// 		// console.log(66666662)
						// 	}, 1000)
						// 	setTimeout(() => {
						// 		// console.log(r)
						// 		this.songs = temp
						// 	}, 1500)
						// }, 1000)
						// console.log(this.songs.length)
						// console.log(temp)
						// temp.forEach((item) => {
						// 	let {musicData} = item
						// 	console.log(musicData)
						// })
						// console.log(3333)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					// console.log(item)
					if (musicData.songid && musicData.albummid) {
						// ret.push(createSong(musicData, 'www.baidu.com'))
						// let song = createSong(musicData, '')
						// getSongmp3(musicData.songmid).then((res) => {
						// 	// let urlObject = this.jqueryUrl(res.data[0])
						// 	let urlObject = jqueryUrl(res.data[0])
						// 	if (urlObject.vkey) {
						// 		ret.push(createSong(musicData, res.data[0]))
						// 	}
						// })
						ret.push(createSong(musicData, ''))
					}
				})
				// this.sortSongs = ret
				// console.log(this.sortSongs.length)
				// this.$nextTick(() => {
				// 	console.log(this.sortSongs.length)
				// })
				// console.log(1200)
				// ret.forEach((item) => {
				// 	console.log(100)
				// })
				return ret
			},
			findIndex(list, songid) {
				return list.findIndex((item) => {
					// console.log('test111')
					console.log(item)
					return item.id === songid
				})
			}
		},
		components: {
			MusicList
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	// .singer-detail
	// 	position: fixed
	// 	z-index: 100
	// 	top: 0
	// 	left: 0
	// 	right: 0
	// 	bottom: 0
	// 	background: $color-background
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
	// .slide-enter-active, .slide-leave-active
	// 	transition: all 3s

	// .slide-enter
	// 	transform: translate3d(-100%, 0, 0)
	// .slide-leave-to
	// 	transform: translate3d(100%, 0, 0)
</style>
