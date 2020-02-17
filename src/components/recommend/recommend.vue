<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="discList">
			<div>
				<div v-if="recommends.length" class="slider-wrapper">
					<slider>
						<div v-for="item in recommends" :key="item.id">
							<a href="#">
								<img class="needsclick" @load="loadImage" :src="item.picUrl" @click.stop="selectSong(item)">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li @click="selectItem(item)" v-for="item in discList" :key="item.dissid" class="item">
							<div class="icon">
								<img width="60" height="60" v-lazy="item.imgurl">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import Loading from 'base/loading/loading'
	import Scroll from 'base/scroll/scroll'
	import Slider from 'base/slider/slider'
	import {getRecommend, getDiscListHot} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import {playlistMixin} from 'common/js/mixin'
	import {mapMutations, mapActions} from 'vuex'
	import Song from 'common/js/song'

	export default {
		mixins: [playlistMixin],
		data() {
			return {
				recommends: [],
				discList: []
			}
		},
		created() {
			// setTimeout(() => {
			//   this._getRecommend()
			// }, 1000)
			this._getRecommend()
			this._getDiscListHot()
		},
		methods: {
			...mapActions([
				'insertSong'
			]),
			selectSong(item) {
				const song = new Song({
					album: '党旗飘扬的方向',
					duration: 257,
					id: 253853916,
					image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000mup1V3VtD6d.jpg?max_age=2592000',
					mid: '003FwwSW04BBcv',
					name: '党旗飘扬的方向',
					singer: '乌兰图雅/王凯/喻越越/周澎',
					url: 'https://v1.itooi.cn/tencent/url?id=003FwwSW04BBcv&quality=flac'
				})
				this.insertSong(song)
			},
			handlePlaylist(playlist) {
				const bottom = playlist.length > 0 ? '60px' : 0
				this.$refs.recommend.style.bottom = bottom
				this.$refs.scroll.refresh()
			},
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						// this.recommends = res.data.slider
						// this.recommends = res.data.slider
							this.recommends = [
							{
								id: 25518,
								linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1&_video=true&mid=002SNWPy1l3aax&g_f=shoujijiaodian',
								picUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000mup1V3VtD6d.jpg?max_age=2592000'
							}
							// ,
							// {
							// 	id: 25519,
							// 	linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1&_video=true&mid=002SNWPy1l3aax&g_f=shoujijiaodian',
							// 	picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2036464.jpg'
							// }
						]
						// console.log(res.data.slider)
						// https://y.gtimg.cn/music/photo_new/T002R300x300M000000mup1V3VtD6d.jpg?max_age=2592000
					}
				})
			},
			_getDiscListHot() {
				getDiscListHot().then((res) => {
					if (res.code === 200) {
						// #this.recommends = res.data.slider
						// console.log(res.data.list)
						this.discList = res.data.list
					}
				})
			},
			loadImage() {
				if (!this.checkLoaded) {
					this.$refs.scroll.refresh()
					this.checkLoaded = true
				}
			},
			selectItem(item) {
				this.$router.push({
					path: `/recommend/${item.dissid}`
				})
				this.setDisc(item)
				// console.log(item)
			},
			...mapMutations({
				setDisc: 'SET_DISC'
			})
		},
		components: {
			Slider,
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.needsclick
		height: 150px
		weight: 150px
	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.slider-wrapper
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme
				.item
					display: flex
					box-sizing: border-box
					align-items: center
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
					.text
						display: flex
						flex-direction: column
						justify-content: center
						flex: 1
						line-height: 20px
						overflow: hidden
						font-size: $font-size-medium
						.name
							margin-bottom: 10px
							color: $color-text
						.desc
							color: $color-text-d
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>