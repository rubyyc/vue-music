<template>
	<transition name="slide" appear>
		<music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getMusicList} from 'api/rank'
	import {ERR_OK} from 'api/config'
	// import {createSong, getSongmp3, jqueryUrl} from 'common/js/song'
	import {createSong} from 'common/js/song'
	import MusicList from 'components/music-list/music-list'

	export default {
		components: {
			MusicList
		},
		computed: {
			title() {
				return this.topList.topTitle
			},
			bgImage() {
				if (this.songs.length) {
					return this.songs[0].image
				}
				return this.topList.picUrl
			},
			...mapGetters([
				'topList'
			])
		},
		data() {
			return {
				songs: [],
				rank: true
			}
		},
		created() {
			this._getTopList()
		},
		methods: {
			_getTopList() {
				if (!this.topList.id) {
					this.$router.push('/rank')
					return
				}
				getMusicList(this.topList.id).then((res) => {
					if (ERR_OK === res.code) {
						this.songs = this._normalizeSongs(res.songlist)
						// console.log(this.songs)
						// let temp = this._normalizeSongs(res.songlist)
						// let r = []
						// setTimeout(() => {
						// 		temp.sort((a, b) => {
						// 			return b.id - a.id
						// 		})
						// }, 600)
						// setTimeout(() => {
							// console.log(r)
							// this.songs = temp
						// }, 3000)
						// console.log(this.songs)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item, index) => {
					// list[index].order = index
					// console.log(list[index].order)
					let musicData = item
					// console.log(musicData.data.songid)
					if (musicData.data.songid && musicData.data.albummid) {
						ret.push(createSong(musicData.data, '', 0, 1))
						// ret.push(createSong(musicData, 'www.baidu.com'))
						// ret.push(createSong(musicData.data, `${musicData.data.songmid}`, 0, 1))
						// getSongmp3(musicData.data.songmid, index).then((res) => {
						// 	// let urlObject = this.jqueryUrl(res.data[0])
						// 	let urlObject = jqueryUrl(res.data[0])
						// 	if (urlObject.vkey) {
						// 		// console.log(index)
						// 		ret.push(createSong(musicData.data, res.data[0], 0, 1))
						// 	}
						// })
					}
				})
				return ret
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>