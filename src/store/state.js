/* 包含公共数据以及请求数据 */
export default {
  bestFaMovie: [],          // 请求数据返回结果，最受好评电影
  bestForwardMovie: [],     // 待映 最受期待电影
  moreComingList: [],       // 更多待映列表
  comingListId: [],         // 待映列表id 用于截取10个id
  cinemaDetail: [],         // 获取影院详情
  classicMovie: [],         // 经典电影
  lat: 23.125178,           // 当前纬度
  lng: 113.280637,          // 当前经度
  currentCity: JSON.parse(window.localStorage.getItem('city')), // 当前城市
  cityList: [],             // 城市列表
  movieOnInfoListID: [],    // 获取首页更多热门电影列表 id
  movieOnInfoList: [],      // 获取当前异步刷新热门电影列表
  MovieListCinemaSubway: [], // 获取影院列表以及当前城市详细信息和地铁线路
  NearCityCinema: [],       // 获取附近影院
  filterCinemaListOption: { // 筛选城市电影院配置
    day: '2021-01-21',      // 更新时间
    offset: 0,              // 偏移量
    limit: 20,              // 获取数据数量
    areaId: -1,             // 选中商区id 石井街道等
    districtId: -1,         // 选中行政区id 区id
    lineId: -1,             // 选中号线id
    hallType: -1,           // 选中影厅类型id
    brandId: -1,            // 选中品牌id
    serviceId: -1,          // 选中影院服务id
    stationId: -1,          // 选中地铁站id
    reqId:1636710166221,    // 请求id 【不修改】
    updateShowDay: true,    // 【不修改】
    cityId: JSON.parse(window.localStorage.getItem('city')).id // 城市id
  },

  // 视屏类
  CommendVideo: [],  // 推荐视屏
  searchSuggest: [],  // 搜索建议
  searchSuggestCinema: []  // 搜索建议影院
}