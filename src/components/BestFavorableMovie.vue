<template>
  <div class="best-movie">
    <slot name="titleText"></slot>
    <ul>
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrapper">
        <swiper-slide v-for="bestMovie in movieCard" :key="bestMovie.movieId">
          <li @click="tiaozhuan(bestMovie.movieId)">
            <div
              class="movie-image"
              :style="(bestMovie.poster || bestMovie.img) | sliceImg"
            >
              <div class="count" v-if="bestMovie.score">
                观众评分&nbsp;{{ bestMovie.score }}
              </div>
              <div class="count" v-else>{{ bestMovie.wish }}人想看</div>
            </div>
            <div class="movie-name">{{ bestMovie.name || bestMovie.nm }}</div>
            <div class="data" v-if="bestMovie.comingTitle">
              {{ bestMovie.comingTitle | sliceData }}
            </div>
          </li>
        </swiper-slide>
        <!-- 导航下标 -->
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <!-- 下面两个是分页器 -->
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </ul>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      swiperOption: {
        loop: false, // 是否循环轮播
        autoplay: false, // 是否可以自动轮播
        slidesPerView: 3.5, // 可是区域内可展示多少个块
        spaceBetween: 0, // 块之间间隔距离
        initialSlide: 0, // 默认初始显示块
        freeMode: true,
        // 显示分页
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        //   },
        // 设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      },
    };
  },
  filters: {
    // 对图片地址进行处理
    sliceImg(value) {
      // http://p0.meituan.net/w.h/mmdb/e8c6fc39ad774426b8ccfc33b22dc722185055.jpg
      return {
        backgroundImage: "url(" + value.replace("w.h/", "") + ")",
      };
    },
    sliceData(value) {
      return value.split(" ")[0];
    },
  },
  props: ["movieCard"],
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    tiaozhuan: function (id) {
      console.log(id);
      // this.$router.push(`/dianying?id=${id}`)
      this.$router.push({
        name: "dianying",
        params: {
          id: id,
        },
      });
    },
  },
  components: { swiper, swiperSlide },
};
</script>

<style lang="less" scoped>
.best-movie {
  width: 96%;
  box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 10px;
  padding-left: 12px;
  padding-top: 12px;
  background-color: white;
  h2 {
    font-size: 14px;
    color: #333;
    margin: 0 0 12px;
  }
  ul {
    position: relative;
    width: 100%;
    li {
      .movie-image {
        position: relative;
        width: 85px;
        height: 115px;
        background-size: cover;
        .count {
          background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
          width: 90%;
          display: inline-block;
          // width: 100%;
          height: 35px;
          position: absolute;
          bottom: 0;
          color: #faaf00;
          display: flex;
          align-items: flex-end;
          padding: 0 0 5px 5px;
          font-size: 11px;
          font-weight: 600;
        }
      }
      .movie-name {
        font-size: 13px;
        color: #222;
        width: 85%;
        margin: 8px 0 3px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 700;
      }
      .data {
        font-size: 12px;
        color: #999;
        margin-top: 10px;
      }
    }
  }
}
</style>