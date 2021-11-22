/* 执行函数 */
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
  RECEIVE_SEARCH_SUGGEST_CINEMA
} from './mutations-type'

export default {
  // 首页最受好评电影
  [RECEIVE_BEST_FA_MOVIE] (state, {bestFaMovie}) {
    state.bestFaMovie = bestFaMovie
  },

  // 根据经纬度获取城市
  [RECEIVE_LAT_LNG_CITY] (state, {currentCity}) {
    state.currentCity = currentCity
  },

  // 异步获取城市列表
  [RECEIVE_CITY_LIST] (state, {cityList}) {
    state.cityList = cityList
  },

  // 同步设置当前城市
  [SET_CURRENT_CITY] (state, {value}) {
    state.currentCity = value
  },

  // 异步获取首页更多热门电影列表
  [RECEIVE_MOVIE_ON_INFO_LIST_ID] (state, {movieOnInfoListID}) {
    state.movieOnInfoListID = movieOnInfoListID
  },
  
  // 根据id异步获取首页更多热门电影列表
  [RECEIVE_MOVIE_ON_INFO_LIST] (state, {movieOnInfoList}) {
    state.movieOnInfoList = [...state.movieOnInfoList,...movieOnInfoList]
  },

  // 异步获取影院列表以及当前城市详细信息和地铁线路
  [RECEIVE_MOVIE_LIST_CINEMA_SUBWAY] (state, {MovieListCinemaSubway}) {
    state.MovieListCinemaSubway = MovieListCinemaSubway
  },

  [RECEIVE_NEAR_CITY_CINEMA] (state, {NearCityCinema}) {
    state.NearCityCinema = NearCityCinema
  },

  // 待映列表最受期待电影
  [RECEIVE_BEST_FORWARD_MOVIE] (state, {bestForwardMovie}) {
    state.bestForwardMovie = bestForwardMovie
  },

  // 获取待映列表id 用于截取10个id
  [RECEIVE_COMING_LIST_ID] (state, {comingListId}) {
    state.comingListId = comingListId
  },
  
  // 异步获取影院列表以及当前城市详细信息和地铁线路
  [RECEIVE_NEAR_CITY_CINEMA_MORE] (state, {NearCityCinema}) {
    state.NearCityCinema = [...state.NearCityCinema,...NearCityCinema]
  },
  
  // 获取更多待映列表
  [RECEIVE_MORE_COMING_LIST] (state, {moreComingList}) {
    state.moreComingList = [...state.moreComingList,...moreComingList]
  },
  
  // 获取经典电影
  [RECEIVE_CLASSIC_MOVIE] (state, {classicMovie}) {
    // if(!classicMovie) return;
    state.classicMovie = [...state.classicMovie,...classicMovie]
  },

  // 获取影院详情
  [RECEIVE_CINEMA_DETAIL] (state, {cinemaDetail}) {
    state.cinemaDetail = cinemaDetail
  },

  // 推荐视屏
  [RECEIVE_COMMEND_VIDEO] (state, {CommendVideo}) {
    state.CommendVideo = CommendVideo
  },

  // 获取搜索建议
  [RECEIVE_SEARCH_SUGGEST] (state, {searchSuggest}) {
    state.searchSuggest = searchSuggest
  },
  // 获取搜索建议影院
  [RECEIVE_SEARCH_SUGGEST_CINEMA] (state, {searchSuggestCinema}) {
    state.searchSuggestCinema = searchSuggestCinema
  },
}