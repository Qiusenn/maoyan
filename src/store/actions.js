/* 提交函数 */
import {
  RECEIVE_BEST_FA_MOVIE,
  RECEIVE_LAT_LNG_CITY,
  RECEIVE_CITY_LIST,
  SET_CURRENT_CITY,
  RECEIVE_MOVIE_ON_INFO_LIST_ID,
  RECEIVE_MOVIE_ON_INFO_LIST,
  RECEIVE_MOVIE_LIST_CINEMA_SUBWAY,
  RECEIVE_NEAR_CITY_CINEMA,
  RECEIVE_NEAR_CITY_CINEMA_MORE,
  RECEIVE_BEST_FORWARD_MOVIE,
  RECEIVE_COMING_LIST_ID,
  RECEIVE_MORE_COMING_LIST,
  RECEIVE_CLASSIC_MOVIE,
  RECEIVE_CINEMA_DETAIL,
  RECEIVE_COMMEND_VIDEO,
  RECEIVE_SEARCH_SUGGEST,
  RECEIVE_SEARCH_SUGGEST_CINEMA,
  RECEIVE_SEARCH_MOVIE
} from './mutations-type.js'

import {
  reqBestFaMovie,
  reqCityLanLng,
  reqCityList,
  reqMovieOnInfoListId,
  reqMovieOnInfoList,
  reqMovieListCinemaSubway,
  reqNearCityCinema,
  reqBestForwardMovie,
  reqComingListId,
  reqMoreComingList,
  reqClassicMovie,
  reqCinemaDetail,
  reqCommendVideo,
  reqSearchSuggest,
  reqSearchSuggestCinema,
  reqMoreSearchMovie
} from '../api/index.js'

export default {
  // 提交首页最受好评电影列表
  async getBestFaMovie ({commit}) {
    let result = await reqBestFaMovie()
    if (result.title) {
      let bestFaMovie = result.movieList
      commit(RECEIVE_BEST_FA_MOVIE, {bestFaMovie})
    }
  },

  // 最受期待电影
  async getBestForwardMovie ({commit},listOption) {
    let result = await reqBestForwardMovie(listOption)
    if (result.coming) {
      let bestForwardMovie = result
      commit(RECEIVE_BEST_FORWARD_MOVIE, {bestForwardMovie})
    }
  },
  
  // 提交根据经纬度获取当前城市
  async getCityLanLng ({commit}, lanLng) {
    let result = await reqCityLanLng(lanLng)
      let currentCity = result.data
      commit(RECEIVE_LAT_LNG_CITY, {currentCity})
  },

  // 异步获取所有城市列表
  async getCityList ({commit}) {
    let result = await reqCityList()
    let cityList = result  
    commit(RECEIVE_CITY_LIST, {cityList})
  },

  // 同步设置当前城市
  setCurrentCity ({commit}, value) {
    commit(SET_CURRENT_CITY, {value})
  },

  // 异步获取首页更多热门电影列表
  async getMovieOnInfoListId ({commit}) {
    let result = await reqMovieOnInfoListId()
    if (result.total) {
      let movieOnInfoListID = result
      commit(RECEIVE_MOVIE_ON_INFO_LIST_ID,{movieOnInfoListID})
    }
  },

  // 根据id异步获取首页更多热门电影列表
  async getMovieOnInfoListById ({commit}, movieId) {
    let result = await reqMovieOnInfoList(movieId)
    if (result.coming) {
      let movieOnInfoList = result.coming
      commit(RECEIVE_MOVIE_ON_INFO_LIST, {movieOnInfoList})
    }
  },

  // 下拉获取更多电影院
  async getNearCityCinemaMore ({commit,state},offset) {
    state.filterCinemaListOption = Object.assign(state.filterCinemaListOption,offset)
    let result = await reqNearCityCinema(state.filterCinemaListOption)
    if (result) {
      let NearCityCinema = result
      commit(RECEIVE_NEAR_CITY_CINEMA_MORE, {NearCityCinema})
    }
  },

  // 根据id异步获取影院列表以及当前城市详细信息和地铁线路
  async getMovieListCinemaSubway ({commit}, id) {
    let result = await reqMovieListCinemaSubway(id)
    if (result.brand) {
      let MovieListCinemaSubway = result
      commit(RECEIVE_MOVIE_LIST_CINEMA_SUBWAY, {MovieListCinemaSubway})
    }
  },

  // 根据params异步获取附近影院列表
  async getNearCityCinema ({commit,state}, params) {
    state.filterCinemaListOption = Object.assign(state.filterCinemaListOption,params)
    let result = await reqNearCityCinema(params)
    if (result) {
      let NearCityCinema = result
      commit(RECEIVE_NEAR_CITY_CINEMA, {NearCityCinema})
    }
  },

  // 异步刷新获取更多电影院列表
  async getMoreComingList ({commit}, params) {
    let result = await reqMoreComingList(params)
    if (result) {
      let moreComingList = result.coming
      commit(RECEIVE_MORE_COMING_LIST, {moreComingList})
    }
  },

  // 获取待映列表id 用于截取10个id
  async getComingListId ({commit}) {
    let result = await reqComingListId()
    if (result.movieIds) {
      let comingListId = result
      commit(RECEIVE_COMING_LIST_ID, {comingListId})
    }
  },

  // 获取经典电影
  async getClassicMovie ({commit},offset) {
    let result = await reqClassicMovie(offset)
    if (result) {
      let classicMovie = result
      commit(RECEIVE_CLASSIC_MOVIE,{classicMovie})
    }
  },

  // 获取影院详情
  async getCinemaDetail ({commit},cinemaOption) {
    let result = await reqCinemaDetail(cinemaOption)
    if (result.code == 0) {
      let cinemaDetail = result.data
      commit(RECEIVE_CINEMA_DETAIL,{cinemaDetail})
    }
  },

  // 获取推荐视屏
  async getCommendVideo ({commit},offsetNumber) {
    let result = await reqCommendVideo(offsetNumber)
    if (result.success) {
      let CommendVideo = result.data.feeds
      commit(RECEIVE_COMMEND_VIDEO,{CommendVideo})
    }
  },

  // 获取搜索建议
  async getSearchSuggest ({commit},searchOption) {
    let result = await reqSearchSuggest(searchOption)
    if (result.success) {
      let searchSuggest = result.movies
      commit(RECEIVE_SEARCH_SUGGEST,{searchSuggest})
    }
  },

  // 获取搜索建议影院
  async getSearchSuggestCinema ({commit},searchOption) {
    let result = await reqSearchSuggestCinema(searchOption)
    if (result) {
      let searchSuggestCinema = result
      commit(RECEIVE_SEARCH_SUGGEST_CINEMA,{searchSuggestCinema})
    }
  },
  // 获取搜索建议影院
  async getMoreSearchMovie ({commit},searchOption) {
    let result = await reqMoreSearchMovie(searchOption)
    if (result) {
      let moreSearchMovie = result
      commit(RECEIVE_SEARCH_MOVIE,{moreSearchMovie})
    }
  },
}