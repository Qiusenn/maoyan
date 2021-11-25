<template>
  <div class="header-movie-list">
    <!-- <div
      class="movie-list"
      v-for="(filterMovie, index) in filterDataMovieList"
      :key="index"
    >
      <h1>{{filterMovie.data}}</h1>
      <div class="movie-content" v-for="val in filterMovie.value" :key="val.id">
        <div class="avatar" :style="val.img | sliceImg"></div>
        <div class="default-img-bg">
          <div class="avatar-content">
            <h4>{{val.nm}}</h4>
            <p class="score"><span>{{val.wish}}</span> 人想看</p>
            <p class="act" v-if="val.star">主演: {{val.star}}</p>
            <p class="session">{{val.rt}}</p>
          </div>
          <div class="ticket">想看</div>
        </div>
      
      </div> -->

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(filterMovie, index) in filterDataMovieList"
        :key="index"
      >
        <div class="movie-list">
          <h1>{{ filterMovie.data }}</h1>
          <div
            class="movie-content"
            v-for="val in filterMovie.value"
            :key="val.id"
          >
            <div class="avatar" :style="val.img | sliceImg"></div>
            <div class="default-img-bg">
              <div class="avatar-content">
                <h4>{{ val.nm }}</h4>
                <p class="score">
                  <span>{{ val.wish }}</span> 人想看
                </p>
                <p class="act" v-if="val.star">主演: {{ val.star }}</p>
                <p class="session">{{ val.rt }}上映</p>
              </div>
              <div class="ticket">想看</div>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "../assets/resetui.css";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      loadCount: 0, // 记录当前下拉更新次数
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
  },
  computed: {
    ...mapState(["comingListId", "moreComingList", "currentCity"]),
    // 计算电影列表id
    // movieListIds() {
    //   return this.comingListId.movieIds.slice(0, 10).toString();
    // },

    // 处理日期对应的电影列表
    filterDataMovieList() {
      let filterMovieList = {};
      let filterMovieResult = [];
      this.moreComingList.forEach((item) => {
        if (filterMovieList[item.comingTitle]) {
          filterMovieList[item.comingTitle].push(item);
        } else {
          filterMovieList[item.comingTitle] = [item];
        }
      });
      // 将结果进行处理
      for (const key in filterMovieList) {
        filterMovieResult.push({
          data: key,
          value: filterMovieList[key],
        });
      }
      return filterMovieResult;
    },
  },
  methods: {
    ...mapActions(["getComingListId", "getMoreComingList"]),
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 当前更新次数+1
        this.loadCount++;
        // 对获取所有id进行截取，每次截取10个id
        // let movieIds = this.movieOnInfoListID.movieIds.slice((this.loadCount-1)*10, this.loadCount*10);
        let movieIds = this.comingListId.movieIds
          .slice((this.loadCount - 1) * 10, this.loadCount * 10)
          .toString();
        this.getMoreComingList({
          ci: JSON.parse(window.localStorage.getItem('city')).id,
          limit: 10,
          movieIds: movieIds,
        });
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.moreComingList.length >= this.comingListId.movieIds.length) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  mounted() {
    this.getComingListId();
  },
};
</script>

<style lang="less" scoped>
.header-movie-list {
  margin-bottom: 50px;
}
.movie-list {
  width: 96%;
  box-sizing: border-box;
  background-color: white;
  margin-top: 10px;
  &:nth-child(n + 2) {
    margin-top: 0;
  }
  h1 {
    padding: 12px 15px 0;
    margin: 0;
    font-size: 14px;
    color: #333;
  }
  .movie-content {
    width: 100%;
    padding: 10px 0;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .avatar {
      width: 64px;
      height: 90px;
      background-size: cover;
    }
    .default-img-bg {
      flex: 1;
      height: 90px;
      // background-color: burlywood;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-content {
        flex: 1;
        padding-left: 8px;
        box-sizing: border-box;
        // background-color: red;
        h4 {
          font-size: 17px;
          color: #333;
          font-weight: 700;
        }
        .score {
          color: #666;
          font-size: 13px;
          // margin: 10px 0;
          span {
            font-weight: 700;
            color: #faaf00;
            font-size: 15px;
          }
        }
        .act {
          color: #666;
          width: 200px;
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .session {
          color: #666;
          font-size: 13px;
          // margin-top: 10px;
        }
      }
      .ticket {
        box-shadow: rgb(240 61 55 / 15%) 0px 0.04rem 0.04rem 0px;
        color: #fff;
        white-space: nowrap;
        font-size: 0.26rem;
        background-color: #faaf00;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        padding: 2px 16px;

        border-radius: 14px;
        margin-right: 5px;
      }
    }
  }
}
</style>