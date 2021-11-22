<template>
  <div class="common">
    <div class="search-info">电影/电视剧/综艺</div>
    <van-list>
      <van-cell v-for="item in items" :key="item.id">
        <div class="movie-content">
          <div class="avatar">
            <img :src="item.img | sliceImg" alt="" />
          </div>
          <div class="default-img-bg">
            <div class="avatar-content">
              <h4>{{ item.nm }}</h4>
              <p class="score">{{ item.enm }}</p>
              <p class="act">{{ item.cat }}</p>
              <p class="session">{{ item.rt }}</p>
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
    <div class="watchAll">查看全部{{ total }}部影视剧</div>
  </div>
</template>

<script>
export default {
  props: ["items", "total"],

  filters: {
    // 对图片地址进行处理
    sliceImg(value) {
      // http://p0.meituan.net/w.h/mmdb/e8c6fc39ad774426b8ccfc33b22dc722185055.jpg
      return value.replace("w.h/", "");
    },
  },
};
</script>

<style lang="less" scoped>
.common {
  box-sizing: border-box;
  .search-info {
    width: 100%;
    background-color: #fff;
    padding-left: 15px;
    padding-top: 12px;
    box-sizing: border-box;
    padding-bottom: 12px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    font-size: 15px;
    color: #999;
  }
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
  .watchAll {
    padding: 15px 0;
    width: 100%;
    color: #f27068;
    text-align: center;
    background-color: white;
  }
}
</style>