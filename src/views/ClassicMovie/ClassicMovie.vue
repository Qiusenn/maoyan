<template>
  <div class="classMovie">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(movieItem,index) in classicMovie" :key="index">
        <div class="movie-content" v-if="movieItem.movieInfo">
          <div class="avatar" :style="movieItem.poster | sliceImg"></div>
          <div class="default-img-bg">
            <div class="avatar-content">
              <h4>{{ movieItem.movieInfo.title }}</h4>
              <p class="score">
                {{ movieItem.movieInfo.englishTitle }}
              </p>
              <p class="act">{{movieItem.movieInfo.actors}}</p>
              <p class="session">{{movieItem.movieInfo.showInfo}}</p>
            </div>
            <div class="ticket" v-if="movieItem.score">
              <span>{{movieItem.score}}</span> 分
            </div>
            <div class="ticket" v-else>暂无评分</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      // list: [],
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
  mounted() {
    // 页面挂载时 获取电影id
    this.getMovieOnInfoListId();
    
  },
  computed: {
    ...mapState(["movieOnInfoList", "movieOnInfoListID", "classicMovie"]),
  },
  methods: {
    ...mapActions(["getMovieOnInfoListId", "getMovieOnInfoListById", "getClassicMovie"]),
    // 下滑刷新
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 当前更新次数+1
        
        // 对获取所有id进行截取，每次截取10个id
        // let movieIds = this.movieOnInfoListID.movieIds.slice(
        //   (this.loadCount - 1) * 10,
        //   this.loadCount * 10
        // );
        // 对id进行获取，获取对应电影列表
        // this.getMovieOnInfoListById(movieIds);
        this.getClassicMovie(this.loadCount)
        this.loadCount++;
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.movieOnInfoList.length >= 500) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.classMovie {
  margin-top: 160px;
  margin-bottom: 50px;
  box-sizing: border-box;
  background-color: white;
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
      align-items: baseline;
      .avatar-content {
        flex: 1;
        padding-left: 8px;
        box-sizing: border-box;
        // background-color: red;
        h4 {
          font-size: 16px;
          color: #333;
          font-weight: 700;
        }
        .score {
          color: #666;
          font-size: 13px;
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
        }
      }
      .ticket {
        color: #999;
        white-space: nowrap;
        font-size: 0.26rem;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        border-radius: 14px;
        span {
          color: #faaf00;
          font-size: 18px;
        }
      }
    }
  }
}
</style>