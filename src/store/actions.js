import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, deleteFavorite, saveFavorite} from 'common/js/cache'

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
}

export const selectPlay = function({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	if (state.mode === playMode.random) {
		let randomlist = shuffle(list)
		index = findIndex(randomlist, list[index])
		commit(types.SET_PLAYLIST, randomlist)
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit, state}, {list}) {
	let randomlist = shuffle(list)
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	commit(types.SET_PLAYLIST, randomlist)
	commit(types.SET_CURRENT_INDEX, 0)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({commit, state}, song) {
	// console.log(song)
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	// 记录当前歌曲
	let currentSong = playlist[currentIndex]
	// 查找当前列表中是否有待插入的歌曲并返回其索引
	let fpIndex = findIndex(playlist, song)
	// 插入歌曲,索引+1
	currentIndex++
	// 插入这首歌
	playlist.splice(currentIndex, 0, song)
	if (fpIndex > -1) {
		// 如果当前插入的序号大于列表的序号
		if (currentIndex > fpIndex) {
			playlist.splice(fpIndex, 1)
			currentIndex--
		} else {
			playlist.splice(fpIndex + 1, 1)
		}
	}

	let currentSIndex = findIndex(sequenceList, currentSong) + 1

	let fsIndex = findIndex(sequenceList, song)
	sequenceList.splice(currentSIndex, 0, song)

	if (fsIndex > -1) {
		// 如果当前插入的序号大于列表的序号
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
		} else {
			sequenceList.splice(fpIndex + 1, 1)
		}
	}
	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({commit}, query) {
	// console.log(query)
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const savePlayHistory = function({commit}, song) {
	// console.log(query)
	commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const deleteSearchHistory = function({commit}, query) {
	// console.log(query)
	commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
	// console.log(query)
	commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// export const deleteSong = function({commit, state}, song) {
// 	let playlist = state.playlist.slice()
// 	let sequenceList = state.sequenceList.slice()
// 	let currentIndex = state.currentIndex
// 	let pIndex = findIndex(playlist, song)
// 	playlist.splice(pIndex, 1)
// 	let sIndex = findIndex(sequenceList, song)
// 	sequenceList.splice(sIndex, 1)
// 	// console.log('currentIndex')
// 	// console.log(currentIndex)
// 	// console.log('pIndex')
// 	// console.log(pIndex)
// 	if (currentIndex > pIndex || currentIndex === playlist.length) {
// 		currentIndex--
// 	}
// 	commit(types.SET_PLAYLIST, playlist)
// 	commit(types.SET_SEQUENCE_LIST, sequenceList)
// 	commit(types.SET_CURRENT_INDEX, currentIndex)
// 	// commit(types.SET_FULL_SCREEN, true)
// 	if (!playlist.length) {
// 		commit(types.SET_PLAYING_STATE, false)
// 	} else {
// 		commit(types.SET_PLAYING_STATE, true)
// 	}
// }

export const deleteSong = function({commit, state}, song) {
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	let pIndex = findIndex(playlist, song)
	playlist.splice(pIndex, 1)
	let sIndex = findIndex(sequenceList, song)
	sequenceList.splice(sIndex, 1)
	// console.log('currentIndex')
	// console.log(currentIndex)
	// console.log('pIndex')
	// console.log(pIndex)
	if (currentIndex > pIndex || currentIndex === playlist.length) {
		currentIndex--
	}
	commit(types.SET_PLAYLIST, playlist)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	// commit(types.SET_FULL_SCREEN, true)
	const playingState = playlist.length > 0
	commit(types.SET_PLAYING_STATE, playingState)
	// if (!playlist.length) {
	// 	commit(types.SET_PLAYING_STATE, false)
	// } else {
	// 	commit(types.SET_PLAYING_STATE, true)
	// }
}

export const deleteSongList = function({commit}) {
	commit(types.SET_PLAYLIST, [])
	commit(types.SET_SEQUENCE_LIST, [])
	commit(types.SET_CURRENT_INDEX, -1)
	commit(types.SET_PLAYING_STATE, false)
}

export const saveFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
