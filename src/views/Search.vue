<template>
  <div class="searchModul">
    <!-- 头部猫演电影 -->
    <div class="headder-begin">
      <h1>猫眼电影</h1>
      <span class="list-icon"><i class="iconfont icon-danlieliebiao"></i></span>
    </div>

    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        autofocus
        @input="onInput"
      />
    </form>

    <classicMovieCommon
      :items="searchSuggest.list"
      :total="searchSuggest.total"
      v-if="value && searchSuggest"
    ></classicMovieCommon>
    <div class="search-err" v-else>占时无搜索数据</div>

    <div class="searchCinema" v-if="value && searchSuggest">
      <div class="cinema-title">影院</div>
      <div
        class="cinema-box"
        v-for="cinemaItem in searchSuggestCinema"
        :key="cinemaItem.id"
        
        @click="gotoCinameDetail(cinemaItem)"
      >
        <div class="cinema-content-box">
          <p class="cinema-top">
            <span class="cinema-name">{{ cinemaItem.info.name }}</span>
            <span class="cell"
              ><span class="price">{{ cinemaItem.info.price }}</span
              >元起</span
            >
          </p>
          <p class="cinema-address">{{ cinemaItem.info.address }}</p>
          <div class="feature-tags">
            <span
              v-for="(tag, index) in cinemaItem.info.tags"
              :class="{ feature: tag == '小吃' }"
              :key="index"
              >{{ tag }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import classicMovieCommon from "../components/classicMovieCommon.vue";
export default {
  data() {
    return {
      value: "",
      offset: 0, // 获取搜索电影偏移量
    };
  },
  methods: {
    ...mapActions(["getSearchSuggest", "getSearchSuggestCinema"]),
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      this.$router.back();
    },
    onInput() {
      this.getSearchSuggest({ kw: this.value, cityId: this.currentCity.id });
      this.getSearchSuggestCinema({
        keyword: this.value,
        ci: this.currentCity.id,
      });
    },
    gotoCinameDetail (cinemaData) {
      // 当前点击电影院id
      console.log(cinemaData);
      this.$router.push(`/cinemaDetail?
      cinemaId=${cinemaData.id}
      &cinemaTitle=${cinemaData.info.name}
      &cinemaLocation=${cinemaData.info.address}
      `);
    },
  },
  computed: {
    ...mapState(["searchSuggest", "searchSuggestCinema", "currentCity"]),
  },
  components: {
    classicMovieCommon,
  },
};
</script>

<style lang="less" scoped>
.searchModul {
  width: 100%;
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
  .searchCinema {
    width: 100%;
    margin-top: 15px;
    .cinema-title {
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      box-sizing: border-box;
      color: #999;
      font-size: 15px;
      background-color: #fff;
      padding: 15px;
    }
    .cinema-box {
      width: 100%;
      background-color: white;
      padding-left: 15px;
      box-sizing: border-box;
      .cinema-content-box {
        overflow: hidden;
        border-bottom: 1px solid #e6e6e6;
        .cinema-top {
          margin-top: 15px;
          .cinema-name {
            font-size: 16px;
            color: #000;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .cell {
            margin-left: 15px;
            font-size: 11px;
            color: #999;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .price {
              font-size: 17px;
              color: #ef4238;
            }
          }
        }
        .cinema-address {
          margin-top: 15px;
          font-size: 11px;
          color: #999;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .feature-tags {
          margin-top: 15px;
          margin-bottom: 15px;
          & :nth-child(n + 2) {
            margin-left: 10px;
          }
          span {
            border: 1px solid #589daf;
            color: #589daf;
            font-size: 11px;
            padding: 2px;
            &.feature {
              color: #f90;
              border-color: #f90;
            }
          }
        }
      }
    }
  }
}
</style>