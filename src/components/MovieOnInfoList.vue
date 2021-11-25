<template>
  <div class="movie-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    
      <van-cell v-for="(item, index) in movieOnInfoList" :key="index">
        <div class="movie-content"  @click="tiaozhuan(item.id)">
          <div class="avatar" :style="item.img | sliceImg"></div>
          <div class="default-img-bg">
            <div class="avatar-content">
              <h4>{{ item.nm }}</h4>
              <p class="score">
                观众评 <span>{{ item.sc }}</span>
              </p>
              <p class="act">主演:{{ item.star }}</p>
              <p class="session">{{ item.showInfo }}</p>
            </div>
            <div 
              v-if="item.showStateButton"
              class="ticket"
              @click="gotoBuyTicket()"
              :style="{
                backgroundColor: item.showStateButton.color,
                boxShadow: item.showStateButton.shadowColor,
              }"
            >
              {{ item.showStateButton.content }}
            </div>
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
      loading: false,
      finished: false,
      loadCount: 0 // 记录当前下拉更新次数
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
  mounted () {
    // 页面挂载时 获取电影id
    this.getMovieOnInfoListId()
  },
  computed: {
    ...mapState(["movieOnInfoList", "movieOnInfoListID"])
  },
  methods: {
    ...mapActions(['getMovieOnInfoListId','getMovieOnInfoListById']),
    // 下滑刷新
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 当前更新次数+1
        this.loadCount++
        // 对获取所有id进行截取，每次截取10个id
        let movieIds = this.movieOnInfoListID.movieIds.slice((this.loadCount-1)*10, this.loadCount*10);
        // 对id进行获取，获取对应电影列表
        this.getMovieOnInfoListById(movieIds);
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.movieOnInfoList.length >= this.movieOnInfoListID.total) {
          this.finished = true;
        }
      }, 1000);
    },
    gotoBuyTicket () {
      this.$router.push('/buyTicket?')
    },

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
};
</script>

<style lang="less" scoped>
.movie-list {
  width: 96%;
  box-sizing: border-box;
  background-color: white;
  margin-top: 10px;
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
        background-color: rgb(240, 61, 55);
        box-shadow: rgb(240 61 55 / 15%) 0px 0.04rem 0.04rem 0px;
        color: #fff;
        white-space: nowrap;
        font-size: 0.26rem;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        padding: 2px 15px;
        border-radius: 14px;
        margin-right: 5px;
      }
    }
  }
}
</style>