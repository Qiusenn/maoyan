/*
包含多个接口请求的模块
*/
import ajax from './ajax'
// 获取首页最受好评电影列表
export const reqBestFaMovie = () => ajax(`https://apis.netstart.cn/maoyan/index/topRatedMovies?token
optimus_uuid=26E5FD700C9511EC80015164FE70B542D43729427BC348EA9B6827308F758D64
optimus_risk_level=71&optimus_code=10`)
export const reqComingListId = () =>  ajax(`https://apis.netstart.cn/maoyan/index/comingList?ci=1&limit=10`)
// 获取待映页面 最受期待电影列表
export const reqBestForwardMovie = (listObject) => ajax(`https://apis.netstart.cn/maoyan/index/mostExpected?ci=${listObject.city}&limit=10&offset=${listObject.offset}`)
// 根据经纬度获取城市 lat=23.125178&lng=113.280637
export const reqCityLanLng = (LanLng) => ajax(`https://apis.netstart.cn/maoyan/city/latlng`,LanLng)
// 获取所有城市列表
export const reqCityList = () => ajax(`https://apis.netstart.cn/maoyan/cities.json`)
// 获取更多热门电影列表 id
export const reqMovieOnInfoListId = () => ajax(`https://apis.netstart.cn/maoyan/index/movieOnInfoList`)
// 获取更多热映列表 最多10个电影id，逗号分隔
export const reqMovieOnInfoList = (movieIdList) => ajax(`https://apis.netstart.cn/maoyan/index/moreComingList?movieIds=${movieIdList}`)
// 获取影院列表以及当前城市详细信息和地铁线路
export const reqMovieListCinemaSubway = (id) => ajax(`https://apis.netstart.cn/maoyan/index/filterCinemas?ci=${id}`)
// 获取更多待映列表
export const reqMoreComingList = (paramsObj) => ajax(`https://apis.netstart.cn/maoyan/index/moreComingList`,paramsObj)
// 请求经典电影
export const reqClassicMovie = (offset) => ajax(`https://apis.netstart.cn/maoyan/index/moreClassicList?sortId=1&showType=3&limit=10&offset=${offset}`)
// 获取影院详情
export const reqCinemaDetail = (cinemaOption) => ajax(`https://apis.netstart.cn/maoyan/cinema/shows?cinemaId=${cinemaOption.cinemaId}&ci=${cinemaOption.cityId}&channelId=4`)
// 1.根据当前城市id获取附近影院
export const reqNearCityCinema = (params) => ajax(`https://apis.netstart.cn/maoyan/index/moreCinemas`,params)
// export const reqNearCityCinema = (params) => ajax(`https://apis.netstart.cn/maoyan/index/moreCinemas`,params)
// day=2021-11-12
// offset=0       偏移量数字
// limit=20       获取数据数量
// districtId=-1  行政区id 区id  【不选】 默认
// lineId=-1      号线id
// hallType=-1    影厅类型id
// brandId=-1     品牌id
// serviceId=-1   影院服务id
// areaId=-1      商区详细 石井街道等 id
// stationId=-1   地铁站id
// updateShowDay=true
// reqId=1636710166221
// cityId=20       城市id    

// 视屏类
// 推荐电影视屏
export const reqCommendVideo = (offsetNumber) => ajax(`https://m.maoyan.com/asgard/asgardapi/sns/common/feed/channel/list.json?uuid=88C4AB00445211ECB4DEB5F957928ABBEB4729343A1542D780E0EB9B1350430F&channelId=4&feedChannelId=0&timestamp=1637461835358&offset=${offsetNumber}`)


// 获取搜索建议  kw=乘风&cityId=20
export const reqSearchSuggest = (searchOption) => ajax(`https://apis.netstart.cn/maoyan/search/suggest`,searchOption)
// 获取搜索影院  keyword=che&ci=20
export const reqSearchSuggestCinema = (searchCinema) => ajax(`https://apis.netstart.cn/maoyan/search/cinemas`,searchCinema)
// 获取更多电影列表  keyword=乘风& ci=20& offset=0
export const reqMoreSearchMovie = (searchCinema) => ajax(`https://apis.netstart.cn/maoyan/search/movies`,searchCinema)