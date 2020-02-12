<template>
	<transition name="slide">
		<music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getDiscSongList} from 'api/recommend'
	// import {getSongmp3, createSong, jqueryUrl} from 'common/js/song'
	import {createSong} from 'common/js/song'

	export default {
		data() {
			return {
				songs: []
			}
		},
		computed: {
			title() {
				return this.disc.dissname
			},
			bgImage() {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		created() {
			this._getDiscSongList()
		},
		methods: {
			_getDiscSongList() {
				if (!this.disc.dissid) {
					this.$router.push('/recommend')
				}
				getDiscSongList(this.disc.dissid).then((res) => {
					// console.log(res.data[0].songlist)
					// this.songs = this._normalizeSongs(res.data[0].songlist)
					let temp = this._normalizeSongs(res.data[0].songlist)
						// let r = []
						// setTimeout(() => {
						// 		temp.sort((a, b) => {
						// 			return b.id - a.id
						// 		})
						// }, 500)
						// setTimeout(() => {
						// 	// console.log(r)
						// 	this.songs = temp
						// }, 1000)
						this.songs = temp
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.id && musicData.album.id) {
						// ret.push(createSong(musicData, 'www.baidu.com'))
						ret.push(createSong(musicData, '', true))
						// getSongmp3(musicData.mid).then((res) => {
						// 	let urlObject = jqueryUrl(res.data[0])
						// 	if (urlObject.vkey) {
						// 		ret.push(createSong(musicData, res.data[0], true))
						// 	}
						// })
					}
				})
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
