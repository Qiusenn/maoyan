<template>
  <div class="videobox">
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

    <!-- 头部猫演电影 -->
    <div class="headder-begin">
      <h1>猫眼电影</h1>
      <span class="list-icon"><i class="iconfont icon-danlieliebiao"></i></span>
    </div>

    <!-- 导航 -->
    <van-tabs v-model="active" animated>
      <!-- 视屏页 -->
      <van-tab title="推荐">
        <div class="commend-video" @click="gotoPlayPage(CommendvideoItem)" v-for="CommendvideoItem in CommendVideo" :key="CommendvideoItem.id">
          <div class="commend-box" v-if="CommendvideoItem.video">
            <video
              :src="CommendvideoItem.video.url"
            ></video>
            <img
              :src="CommendvideoItem.video.imgUrl"
              alt=""
            />
            <div class="commend-title">
              {{CommendvideoItem.title}}
            </div>
            <div class="commend-time">00:46</div>
            <div class="playbtn"></div>
          </div>

          <div class="commend-inifo">
            <div class="userinfo">
              <div class="user-header"><img :src="CommendvideoItem.user.avatarurl" alt=""></div>
              <div class="user-name">{{CommendvideoItem.user.nickName}}</div>
            </div>
            <div class="other-info">
              <div class="zan"><i class="iconfont icon-dianzan"></i> {{CommendvideoItem.upCount}}</div>
              <div class="comment"><i class="iconfont icon-pinglun"></i> 0</div>
              <div class="share"><i class="iconfont icon-fenxiang"></i></div>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="热片解读 "> 内容2 </van-tab>

      <van-tab title="选"> 内容3 </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      active: 0,
      currentVideoDuration: 0 // 当前视屏播放总时间
    };
  },
  computed: {
    ...mapState(['CommendVideo']),
  },
  methods: {
    ...mapActions(['getCommendVideo']),
    gotoPlayPage (data) {
      let userInfo = data.user
      let item = data.video
      this.$router.push(`/playPage?imgUrl=
      ${item.imgUrl}
      &url=${item.url}
      &id=${item.id}
      &userHeader=${userInfo.avatarurl}
      &userName=${userInfo.nickName}
      &title=${data.title}
      `
      )
    }
  },
  mounted () {
    this.getCommendVideo(0)
  }
};
</script>

<style lang="less" scoped>
.videobox {
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
      background: url("../../../public/static/images/logo.png");
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

  // 头部猫眼电影
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

  // 推荐视屏
  .commend-video {
    width: 100%;
    align-items: center;
    &:nth-child(n+2) {
      margin-top: 8px;
    }
    .commend-box {
      position: relative;
      width: 100%;
      height: 210px;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
      .commend-title {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 16px;
        color: #fff;
        font-weight: 200;
        line-height: 23px;
        letter-spacing: 2px;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
      }
      .commend-time {
        position: absolute;
        bottom: 8px;
        right: 8px;
        color: #fff;
      }
      .playbtn {
        position: absolute;
        width: 50px;
        height: 50px;
        background: url("../../../public/static/images/video-btn-play.png");
        background-size: cover;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .commend-inifo {
      width: 100%;
      padding: 15px;
      display: flex;
      background-color: #fff;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      .userinfo {
        width: 50%;
        display: flex;
        align-items: center;
        .user-header {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          text-align: end;
          background-color: pink;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;

          }
        }
        .user-name {
          font-size: 14px;
          margin-left: 10px;
          color: #999;
        }
      }
      .other-info {
        width: 50%;
        display: flex;
        box-sizing: border-box;
        padding-right: 15px;
        justify-content: space-around;
      }
    }
  }
}
</style>