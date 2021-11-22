<template>
  <div class="cinemaBox">
    <!-- 头部猫演电影 -->
    <div class="headder-begin">
      <h1>{{ this.$route.query.cinemaTitle }}</h1>
      <span class="list-icon" @click="$router.back()"
        ><i class="iconfont icon-youjiantou jiangtou"></i
      ></span>
    </div>

    <!-- logo -->
    <div class="AppDownload">
      <div class="logo"></div>
      <div class="App-right">
        <a href="#" class="find-more">19.9元起购票</a>
        <h1>
          打开App<span><i class="iconfont icon-youjiantou"></i></span>
        </h1>
      </div>
    </div>

    <!-- 地标 -->
    <div class="landmark">
      <div class="landmark-info">
        <h5>{{ this.$route.query.cinemaTitle }}</h5>
        <p>{{ this.$route.query.cinemaLocation }}</p>
      </div>
      <div class="landmark-img">
        <img src="../../public/static/images/dibiao.png" alt="" />
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="banner" v-if="currentCinemaMovieList">
      <div
        class="mask"
        :style="currentCinemaMovieList[swiperActio].img | sliceImg"
      ></div>
      <div
        class="swiper"
        ref="swiperContainer"
        :style="{ transform: `translateY(-50%) translateX(${Distance})` }"
      >
        <div
          class="swiper-cell"
          ref="swiperCell"
          :class="{
            scale: swiperActio == index,
          }"
          :style="moviePage.img | sliceImg"
          v-for="(moviePage, index) in currentCinemaMovieList"
          :key="index"
          @click="scaSwiper($event, index, moviePage)"
        ></div>
      </div>
    </div>

    <!-- 电影描述 -->
    <div class="describe">
      <h2>
        {{ currentMovieData.nm }}
        <span class="score">{{ currentMovieData.sc }}<span>分</span></span>
      </h2>
      <p>{{ currentMovieData.desc }}</p>
    </div>

    <van-tabs v-if="currentMovieData">
      <van-tab
        :title="movieInfo.showDate"
        v-for="(movieInfo, index) in currentMovieData.shows"
        :key="index"
      >
        <!-- 开卡头部 -->
        <div
          class="vip"
          v-for="(vip, index) in cinemaDetail.vipInfo"
          :key="index + 1"
        >
          <div class="vip-count">{{ vip.tag }}</div>
          <div class="vip-jian">{{ vip.title }}</div>
          <div class="vip-kaika">
            {{ vip.process }} <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <!-- 电影播放详情 -->
        <div
          class="movie-play-info"
          v-for="(p, index) in movieInfo.plist"
          :key="index + 2"
        >
          <div class="show-item">
            <div class="time-block">
              <div class="begin">{{ p.tm }}</div>
              <div class="end">{{ currentMovieEndTime(p.tm) }}散场</div>
            </div>

            <div class="info-block">
              <div class="lan">{{ p.lang }} {{ p.tp }}</div>
              <div class="hall">{{ p.th }}</div>
            </div>

            <div class="price">
              <div class="sellPr">
                <span class="d">￥</span>
                <span class="stonefont">
                  {{ parseInt(p.baseSellPrice) }}
                </span>
              </div>
              <div class="vipPrice">
                <span class="vip-card">{{ p.vipPriceName }}</span>
                <span class="vip-sel">￥{{ parseInt(p.vipPrice) }}</span>
              </div>
            </div>

            <div class="button-block">
              <div class="button">购票</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // 当前点击白框样式
      swiperActio: 0,
      // 偏移距离
      Distance: 0,
      swiperBox: 65,
      currentMovieData: [], //当前电影数据
    };
  },
  computed: {
    ...mapState(["cinemaDetail", "currentCity"]),

    currentCinemaMovieList() {
      return this.cinemaDetail.movies;
    },
  },
  methods: {
    ...mapActions(["getCinemaDetail"]),
    scaSwiper(e, index) {
      this.swiperActio = index;
      this.currentMovieData = this.currentCinemaMovieList[index];
      this.Distance = -(index * this.swiperBox + index * 15) + "px";
    },
    // 根据电影播放总时间计算结束时间
    currentMovieEndTime(value) {
      // 当前电影播放小时数
      let currentMovieTime = parseInt(
        this.currentMovieData.desc.split("|")[0].trim()
      );
      if (currentMovieTime) {
        let h = parseInt(currentMovieTime / 60);
        // 当前电影播放分钟数
        let m = parseInt(currentMovieTime % 60);
        let currentEndHouse = 0;
        //   // 开始小时
        let currentBeginTimeHousr = parseInt(value.split(":")[0]);
        //   // 开始分钟
        let currentBeginTimeMinute = parseInt(value.split(":")[1]);
        // 计算结束时分钟数
        let currentEndMinute = currentBeginTimeMinute + m;
        if (currentEndMinute - 60 >= 0) {
          currentEndHouse += 1;
          currentEndMinute = currentEndMinute - 60;
        }
        currentEndMinute =
          currentEndMinute < 10 ? "0" + currentEndMinute : currentEndMinute;
        // 计算结束时分钟数
        currentEndHouse = currentBeginTimeHousr + h + currentEndHouse;
        currentEndHouse = currentEndHouse >= 24 ? "00" : currentEndHouse;
        currentEndHouse =
          currentEndHouse < 10 && currentEndHouse != "00"
            ? "0" + currentEndHouse
            : currentEndHouse;
        return `${currentEndHouse}:${currentEndMinute}`;
      }
    },
  },
  mounted() {
    this.getCinemaDetail({
      cinemaId: this.$route.query.cinemaId,
      cityId: this.currentCity.id,
    });
    setTimeout(() => {
      this.currentMovieData = this.currentCinemaMovieList[0];
      // this.swiperBox = this.$refs.swiperCell[0].offsetWidth;
    }, 300);
  },
  filters: {
    // 对图片地址进行处理
    sliceImg(value) {
      return {
        backgroundImage: "url(" + value.replace("w.h/", "") + ")",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.cinemaBox {
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
  /* 头部红色 */
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
      top: 10px;
      left: 13px;
      font-size: 20px;
      transform: rotate(180deg);
      .jiangtou {
        font-size: 30px;
      }
    }
  }

  /* 地标 */
  .landmark {
    width: 100%;
    display: flex;
    background-color: white;
    padding: 15px 10px;
    box-sizing: border-box;
    .landmark-info {
      width: 85%;
      height: 100%;
      padding-right: 15px;
      box-sizing: border-box;
      h5 {
        font-weight: 800;
        font-size: 18px;
        text-overflow: ellipsis;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
      }
      p {
        font-size: 14px;
        margin-top: 10px;
        width: 100%;
        text-overflow: ellipsis;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .landmark-img {
      width: 15%;
      text-align: center;
      position: relative;
      border-left: 1px solid #ccc;
      img {
        display: block;
        width: 20px;
        height: 25px;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
      }
    }
  }

  // 主体banner
  .banner {
    width: 100%;
    background-color: #ccc;
    height: 135px;
    position: relative;
    background-size: cover;
    overflow: hidden;
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      filter: blur(30px);
      opacity: 0.55;
      top: 0;
      background-color: #40454d;
      left: 0;
    }
    .swiper {
      display: flex;
      position: absolute;
      top: 50%;
      z-index: 2;
      left: 40%;
      transition: transform 0.5s;
      // transform: translateY(-50%) translateX(0);
      .swiper-cell {
        width: 65px;
        height: 95px;
        background-size: cover;
        &:nth-child(n + 2) {
          margin-left: 20px;
        }
        &.scale {
          transform: scale(1.2);
          border: 2px solid white;
          &::after {
            content: "";
            position: absolute;
            bottom: -7px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 10px;
            height: 5px;
            background: url("../../public/static/images/bottom.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }

  // 电影描述
  .describe {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
    h2 {
      font-size: 17px;
      color: #333;
      font-weight: 700;
      span {
        color: #ffb400;
        font-size: 14px;
        font-weight: 700;
      }
      .score {
        font-size: 16px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 13px;
      color: #999;
    }
  }

  // 开卡
  .vip {
    width: 100%;
    background-color: #fff5ea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 15px;
    color: #777;
    font-size: 10px;
    .vip-count {
      background-color: #ff941a;
      padding: 2px;
      color: white;
      font-size: 10px;
    }
    .vip-jian {
      color: #fa9600;
      // margin-left: -120px;
    }
    .vip-kaika {
      margin-right: 15px;
      text-align: center;
    }
  }

  // 电影开场信息
  .movie-play-info {
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    background-color: white;
    padding: 20px 15px;
    box-sizing: border-box;
    .show-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .time-block {
        text-align: center;
        .end {
          color: #999;
          font-size: 11px;
          line-height: 1;
          margin-top: 10px;
          white-space: nowrap;
        }
      }
      .info-block {
        flex: 1;
        margin-left: 17px;
        box-sizing: border-box;
        .hall {
          margin-top: 7px;
          font-size: 11px;
          color: #999;
          // margin-top: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 93px;
          overflow: hidden;
        }
      }
      .price {
        flex: 0 1 auto;
        width: 130px;
        margin-left: 5px;
        .sellPr {
          display: inline-block;
          line-height: 1;
          color: #f03d37;
          margin-top: 1px;
          font-size: 19px;
          .d {
            font-size: 11px;
          }
        }
        .vipPrice {
          display: inline-block;
          line-height: 15px;
          height: 15px;
          -webkit-transform: scale(0.8);
          transform: scale(0.8);
          -webkit-transform-origin: left;
          transform-origin: left;
          margin: 0 -16px 0 4px;
          border: 1px solid #ff9000;
          border-radius: 2px;
          font-size: 12px;
          .vip-card {
            display: inline-block;
            color: #fff;
            background-color: #f90;
          }
          .vip-sel {
            display: inline-block;
            padding: 0 2px;
            color: #f90;
            background-color: #fff;
          }
        }
      }
      .button-block {
        width: 45px;
        position: relative;
        .button {
          position: absolute;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          width: 100%;
          height: 27px;
          line-height: 28px;
          font-size: 12px;
          background-color: #f03d37;
          color: #fff;
          border-radius: 4px;
          text-align: center;
        }
      }
    }
  }
}
</style>