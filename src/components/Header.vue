<template>
  <div class="header">
    <!-- 头部猫演电影 -->
    <div class="headder-begin">
      <h1>猫眼电影</h1>
      <span class="list-icon"><i class="iconfont icon-danlieliebiao"></i></span>
    </div>

    <!-- 猫眼APP下载 -->
    <div class="AppDownload">
      <div class="logo"></div>
      <div class="App-right">
        <a href="#" class="find-more">发现最新最热电影</a>
        <h1>
          打开App<span><i class="iconfont icon-youjiantou"></i></span>
        </h1>
      </div>
    </div>

    <HeaderNav />
    <div
      class="option-navBar"
      v-if="MovieListCinemaSubway.district && $route.meta.showOption"
    >
      <van-dropdown-menu v-if="MovieListCinemaSubway">
        <van-dropdown-item :title="currentClickCity" ref="menu">
          <van-tabs>
            <!-- 商区 -->
            <van-tab title="商区">
              <van-tree-select
                @click-item="filtertAreaId($event, activeId)"
                @click-nav="filterArea(activeIndex)"
                :items="currentCantonalList"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
                ref="AreaDom"
              />
            </van-tab>
            <!-- 地铁站 -->
            <van-tab title="地铁站">
              <van-tree-select
                @click-item="filtertStationId($event, activeId)"
                @click-nav="filterStation(activeIndex)"
                :items="currentSubwayList"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
              />
            </van-tab>
          </van-tabs>
        </van-dropdown-item>

        <van-dropdown-item :title="currentClickBrand" ref="item">
          <div
            class="brandList"
            :class="{ action: brandAction == index }"
            v-for="(brand, index) in MovieListCinemaSubway.brand.subItems"
            :key="brand.id"
            @click="currentBrandAction(index, brand)"
          >
            <div class="brandCinema">{{ brand.name }}</div>
            <div class="brandCinemaCount">{{ brand.count }}</div>
          </div>
        </van-dropdown-item>

        <van-dropdown-item
          :title="showServeText"
          class="feature-model"
          ref="feature"
        >
          <div class="f-option">
            <h3>特色功能</h3>
            <div class="feature">
              <div
                class="feature-btn"
                :class="{ actionBtn: hallTypeAction == index }"
                v-for="(subService, index) in MovieListCinemaSubway.service
                  .subItems"
                @click="filterHallType(subService, index)"
                :key="subService.id"
              >
                {{ subService.name }}
              </div>
            </div>

            <h3>特殊厅</h3>
            <div class="feature">
              <div
                class="feature-btn"
                :class="{ actionBtn: serviceAction == index }"
                v-for="(hallType, index) in MovieListCinemaSubway.hallType
                  .subItems"
                @click="filterServiceId(hallType, index)"
                :key="hallType.id"
              >
                {{ hallType.name }}
              </div>
            </div>
          </div>

          <div class="feature-option">
            <button class="reset" @click="resetCinema()">重置</button>
            <button class="confirm" @click="commitFilterAnimate()">确认</button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <!-- </transition> -->
  </div>
</template>

<script>
import HeaderNav from "./HeaderNav";
import "../../public/static/css/reset.css";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      value: 0,
      switch1: false,
      switch2: false,
      activeId: 1,
      activeIndex: 0,
      brandAction: 0, // 当前点击高亮，选取勾勾
      hallTypeAction: 0, // 当前点击特色功能 影厅类型
      serviceAction: 0, // 当前点击影院服务
      showServePending: "", // 当前替换文本 pending
      showServeText: "全城", // 替换特色文本 展示信息
      // 筛选配置
      currentClickCity: "全城", // 当前点击城市
      currentClickBrand: "品牌", // 当前点击城市
      filterCinemaOption: {
        day: "", // 日期
        offset: 0, // 偏移量数字
        limit: 20, // 获取数据数量·
        districtId: -1, // 行政区id 区id  【不选】 默认
        lineId: -1, // 号线id
        hallType: -1, // 影厅类型id
        brandId: -1, // 品牌id
        serviceId: -1, // 影院服务id
        areaId: -1, // 商区详细 石井街道等 id
        stationId: -1, // 地铁站id
        cityId: window.localStorage.getItem("city") ? JSON.parse(window.localStorage.getItem("city")).id : 20, // 城市id
      },
    };
  },
  components: {
    HeaderNav,
  },
  computed: {
    ...mapState([
      "MovieListCinemaSubway",
      "currentCity",
      "currentCity",
      "lat",
      "lng",
    ]),
    // 计算出当前市区列表
    currentCantonalList() {
      let CantonalList = [];
      this.MovieListCinemaSubway.district.subItems.slice(0).forEach((item) => {
        let childCity = [];
        item.subItems.forEach((cityCantonal) => {
          childCity.push({
            text: `${cityCantonal.name}(${cityCantonal.count})`,
            id: cityCantonal.id,
          });
        });
        CantonalList.push({
          text: `${item.name}(${item.count})`,
          id: `${item.id}`,
          children: childCity,
        });
      });
      return CantonalList;
    },

    // 计算出当前城市地铁列表
    currentSubwayList() {
      let subWayList = [];
      this.MovieListCinemaSubway.subway.subItems.slice(0).forEach((item) => {
        let childLine = [];
        item.subItems.forEach((cityCantonal) => {
          childLine.push({
            text: `${cityCantonal.name}(${cityCantonal.count})`,
            id: cityCantonal.id,
          });
        });
        subWayList.push({
          text: `${item.name}(${item.count})`,
          id: `${item.id}`,
          children: childLine,
        });
      });
      return subWayList;
    },

    currentDateTime() {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1;
      var data = currentDate.getDate();
      return `${year}-${month}-${data}`;
    },
  },
  mounted() {
    // 当前时间搓
    setTimeout(() => {
      this.getMovieListCinemaSubway(JSON.parse(window.localStorage.getItem("city")).id);
    }, 300);

    this.getCityLanLng({ lat: this.lat, lng: this.lng });
      
    // 配置时间搓请求最新日期数据
    this.filterCinemaOption.day = this.currentDateTime;
  },

  methods: {
    ...mapActions([
      "getMovieListCinemaSubway",
      "getNearCityCinema",
      "getCityLanLng",
    ]),
    // 品牌电影院点击高亮样式 影院品牌
    currentBrandAction(index, currentbrand) {
      this.brandAction = index;

      console.log("brand当前点击品牌电影院数据id等数据", currentbrand);
      this.currentClickBrand = currentbrand.name;
      this.filterCinemaOption.brandId = currentbrand.id;
      this.offset = 0;
      this.getNearCityCinema(this.filterCinemaOption);
      this.$refs.item.toggle();
    },

    // 左侧全部点击显示当前城市全部电影院
    filterArea(filterIndex) {
      if (filterIndex == 0) {
        this.filterCinemaOption.areaId = -1;
        this.$refs.menu.toggle();
        this.currentClickCity = "全城";
        this.getNearCityCinema(this.filterCinemaOption);
      }
    },

    // 右侧筛选商区详情
    filtertAreaId(e, itemsId) {
      this.$refs.menu.toggle();
      // 设置当前点击城市
      this.currentClickCity = e.text.slice(0, e.text.indexOf("("));
      // 还原当前地铁站id
      this.filterCinemaOption.stationId = -1;
      this.filterCinemaOption.areaId = itemsId;
      this.offset = 0;
      // 全局事件总线 触发事件 修改兄弟组件header组件偏移量
      this.$bus.$emit("changeOffset");
      this.getNearCityCinema(this.filterCinemaOption);
    },

    // 左侧全部点击显示当前地铁为-1显示全部
    filterStation(itemId) {
      if (itemId == 0) {
        this.filterCinemaOption.stationId = -1;
        this.getNearCityCinema(this.filterCinemaOption);
      }
    },

    // 筛选地铁站id
    filtertStationId(e, stationId) {
      this.$refs.menu.toggle();
      // 还原商区详细 id
      this.currentClickCity = e.text.slice(0, e.text.indexOf("("));
      this.filterCinemaOption.areaId = -1;
      // 配置当前地铁站id
      this.filterCinemaOption.stationId = stationId;
      this.offset = 0;
      // 全局事件总线 触发事件 修改兄弟组件header组件偏移量
      this.$bus.$emit("changeOffset");
      this.getNearCityCinema(this.filterCinemaOption);
    },

    // 筛选影厅类型
    filterHallType(hallTypeItem, index) {
      console.log(hallTypeItem.name);
      this.showServePending += hallTypeItem.name;
      this.hallTypeAction = index;
      this.filterCinemaOption.hallType = hallTypeItem.id;
    },

    // 筛选 影院服务id
    filterServiceId(serviceItem, index) {
      console.log(serviceItem.name);
      this.filterCinemaOption.serviceId = serviceItem.id;
      this.serviceAction = index;
      this.showServePending += serviceItem.name;
    },

    // 确认按钮点击获取电影院列表
    commitFilterAnimate() {
      this.offset = 0;
      this.showServeText = this.showServePending;
      this.showServePending = "";
      this.getNearCityCinema(this.filterCinemaOption);
      this.$refs.feature.toggle();
    },

    // 重置
    resetCinema() {
      this.filterCinemaOption.serviceId = -1;
      this.filterCinemaOption.hallType = -1;
      this.offset = 0;
      this.getNearCityCinema(this.filterCinemaOption);
      this.serviceAction = 0;
      this.hallTypeAction = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: white;
  .headder-begin {
    width: 100%;
    height: 50px;
    color: #fff;
    background: #e54847;
    border-bottom: 1px solid #e54847;
    position: relative;
    h1 {
      display: block;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      line-height: 50px;
    }
    .list-icon {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
    }
  }
  /* logo */
  .AppDownload {
    position: relative;
    height: 60px;
    background-color: #fff;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 95px;
      height: 35px;
      margin-left: 15px;
      background: url("../../public/static/images/logo.png");
      background-size: 100% auto;
    }
    .App-right {
      display: flex;
      justify-content: space-between;
      margin-right: 15px;
      a {
        height: 17px;
        line-height: 17px;
        font-weight: 600;
        color: #666;
        font-size: 13px;
        margin-right: 15px;
      }
      h1 {
        color: #b37e7e;
        font-family: PingFangSC-Medium;
        font-weight: 700;
        span {
          color: #ccc;
        }
      }
    }
  }

  .option-navBar {
    .brandList {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 15.5px 25px;
      display: flex;
      color: #333;
      &.action {
        position: relative;
        color: #dd403b;
        &::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          background: url("../../public/static/images/chosen.png") no-repeat;
          background-size: 14px auto;
          top: 19px;
          left: 5px;
        }
      }
      .brandCinema {
        font-size: 15px;
      }
      .brandCinemaCount {
        font-size: 13px;
      }
    }
    .feature-model {
      .f-option {
        background-color: white;
        width: 100%;
        padding-bottom: 15px;
        overflow-y: scroll;
        height: 250px;
        // padding-left: 10px;
        // padding-right: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
        h3 {
          color: #777;
          font-size: 16px;
          margin-top: 15px;
          padding-left: 15px;
        }
        .feature {
          width: 100%;
          // display: flex;
          // justify-content: space-between;
          // flex-wrap: wrap;
          // align-items: center;
          &::after {
            content: "";
            display: block;
            clear: both;
          }
          .feature-btn {
            width: 20%;
            text-align: center;
            margin-top: 15px;
            font-size: 13px;
            padding: 10px 3px;
            border: 0.02rem solid #ccc;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #777;
            float: left;
            margin: 5px 5px;
            margin-top: 10px;
            border-radius: 5px;
            &.actionBtn {
              color: #f03d37;
              border: 0.02rem solid #f03d37;
              background: #fcf0f0;
            }
          }
        }
      }

      .feature-option {
        height: 50px;
        width: 100%;
        background-color: #fafafa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 20px;
        font-size: 15px;
        box-sizing: border-box;
        button {
          outline: none;
          text-align: center;
          padding: 10px 25px;
          border: 1px solid #ccc;
          background: white;
          color: #777;
          border-radius: 10px;
        }
        .confirm {
          background-color: #f03d37;
          color: white;
        }
      }
    }
  }
}
</style>