<template>
  <ul class="cinema">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="NearCityCinema"
    >
      <van-cell v-for="(cityCinema,index) in NearCityCinema" :key="index" @click="gotoCinemaDetail(cityCinema)">
        <li class="cinema-car">
          <div class="cinema-car-left" v-if="cityCinema.price">
            <!-- 影院名 -->
            <h5 class="cinema-car-left-name">
              {{cityCinema.title}}
              <span class="price"
                >{{cityCinema.price.n}} <span class="price_text">{{cityCinema.price.q}}</span>
              </span>
            </h5>
            <!-- 地址 -->
            <p class="cinema-car-item-address">
              {{cityCinema.location}}
            </p>
            <!-- 退 改签 小吃 折扣卡 -->
            <div class="cinema-tip">
              <div class="refund" :class="{
                action: service.text == '小吃' || service.text == '折扣卡'
                }" v-for="(service, index) in cityCinema.services" :key="index">{{service.text}}</div>
            </div>
            <div class="member"> <span class="card-vip" v-if="cityCinema.discount[0]" :style="{backgroundImage:`url(${cityCinema.discount[0].card})`}"></span> 开卡特惠，首单1张最高立减6元</div>
          </div>
          <div class="cinema-car-right">{{cityCinema.distance}}</div>
        </li>
      </van-cell>
    </van-list>
    <!-- 加载失败显示 -->
    <div class="loadingErro" v-show="!isShowLoading">
      <img src="../../../public/static/images/nothing-bg.png" alt="">
      暂无符合条件的影院
    </div>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
import '../../assets/resetui.css'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: 0, // 偏移量
    }
  },
  computed: {
    // 获取vuex当前城市
    ...mapState(["currentCity", "NearCityCinema", "filterCinemaListOption"]),
    isShowLoading () {
      return this.NearCityCinema.length
    }
  },
  watch: {
    isShowLoading (n) {
      console.log(n);
    }
  },
  methods: {
    ...mapActions(["getNearCityCinema", "getNearCityCinemaMore"]),
    // 下滑刷新
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        // 当前更新次数+1
        // 数据全部加载完成
        this.getNearCityCinemaMore({offset: this.offset})
        this.offset++
        this.loading = false;
        if (!this.NearCityCinema) {
          this.finished = true;
        }
      }, 2000);
      
    },
    gotoCinemaDetail (cinemaData) {
      // 当前点击电影院id
      console.log(cinemaData);
      this.$router.push(`/cinemaDetail?
      cinemaId=${cinemaData.cinemaId}
      &cinemaTitle=${cinemaData.title}
      &cinemaLocation=${cinemaData.location}
      `)
    }
  },
  mounted () {
    // 绑定全局事件总线 修改当前偏移量
    this.$bus.$on('changeOffset',() => {
      console.log(123);
      this.offset = 0
      console.log(this.offset);
    })
  },
  beforeDestroy () {
    this.$bus.$off('changeOffset')
  }
};
</script>

<style lang="less" scoped>
.cinema {
  margin-top: 208px;
  width: 100%;
  margin-bottom: 40px;
  background-color: #ffffff;
  .cinema-car {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 20px 0;
    .cinema-car-left {
      width: 75%;
      box-sizing: border-box;
      .cinema-car-left-name {
        color: #000;
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .price {
          color: #f03d37;
          font-size: 20px;
          .price_text {
            font-size: 13px;
          }
        }
      }
      .cinema-car-item-address {
        color: #666;
        font-size: 12px;
        margin-top: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .cinema-tip {
        margin: 8px 0;
        display: flex;
        width: 85.5vw;
        overflow: hidden;
        & > div {
          font-size: 12px;
          color: #589daf;
          border: 1px solid #589daf;
          padding: 1px 2px;
          border-radius: 3px;
          white-space: nowrap; 
          &.action {
            color: #f90;
            border: .02rem solid #f90;
          }
        }
        & :nth-child(n + 2) {
          // color: red;
          margin-left: 2px;
        }
      }
      .member {
        font-size: 13px;
        color: #999;
        .card-vip {
          display: inline-block;
          width: 15px;
          height: 15px;
          // background-color: pink;
          background-size: cover;
          vertical-align: top;
        }
      }
    }
    .cinema-car-right {
      height: 100%;
      margin-right: 30px;
      width: 25%;
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-right: 15px;
    }
  }
  .loadingErro {
    width: 100%;
    height: 100vh;
    padding-top: 75px;
    text-align: center;
    font-size: 14px;
    color: #777;
    img {
      width: 90px;
      height: 90px; 
      margin-bottom: 15px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>