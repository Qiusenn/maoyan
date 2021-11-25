<template>
  <div class="more-search-movie">
    <!-- 头部猫演电影 -->
    <div class="headder-begin">
      <h1>猫眼电影</h1>
      <span class="list-icon" @click="$router.back()"
        ><i class="iconfont icon-youjiantou jiangtou"></i
      ></span>
    </div>
    <van-list>
      <van-cell v-for="(item, index) in moreSearchMovie" :key="index">
        <div class="movie-content">
          <div class="avatar">
            <img :src="item.poster" alt="" />
          </div>
          <div class="default-img-bg">
            <div class="avatar-content">
              <h4>{{ item.name }}</h4>
              <p class="score">{{ item.ename }}</p>
              <p class="act">{{ item.catogary }}</p>
              <p class="session">{{ item.release }}</p>
            </div>
            <div class="ticket" v-if="item.wish">
              <span>{{ item.wish }}</span
              >人想看
            </div>
            <div class="ticket" v-else>暂无评分</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>



<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      offset: 0,
    };
  },
  computed: {
    ...mapState(["moreSearchMovie"]),
  },
  methods: {
    ...mapActions(["getMoreSearchMovie"]),
  },
  mounted() {
    this.getMoreSearchMovie({
      keyword: this.$route.query.keyword,
      ci: this.$route.query.ci,
      offset: this.offset,
    });
  },
};
</script>

<style lang="less" scoped>
.more-search-movie {
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
  box-sizing: border-box;
  .movie-content {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    .avatar {
      width: 64px;
      height: 90px;
      background-size: cover;
      img {
        width: 64px;
        height: 90px;
        float: left;
        margin-right: 10px;
      }
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