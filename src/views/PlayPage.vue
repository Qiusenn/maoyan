<template>
  <div class="playPage">
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

    <div class="commend-box">
      <video controls :src="this.$route.query.url" ref="video"></video>
      <img v-show="isPlay" :src="this.$route.query.imgUrl" alt="" />
      <div v-show="isPlay" class="playbtn" @click="videoPlay"></div>
    </div>

    <div class="footer">
      <div class="title">
        <div class="content">
          {{$route.query.title}}
        </div>
      </div>

      <div class="userinfo">
        <div class="content">
          <div class="userheader" :style="{backgroundImage:`url(${$route.query.userHeader})`}"></div>
          <div class="username">{{$route.query.userName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: true,
    };
  },
  methods: {
    videoPlay() {
      this.isPlay = false;
      this.$refs.video.play();
    },
  },
  mounted() {
    console.log(this.$route.query);
  },
};
</script>

<style lang="less" scoped>
.playPage {
  height: 100vh;
  box-sizing: border-box;
  background-color: #f4f4f4;
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
    .playbtn {
      position: absolute;
      width: 50px;
      height: 50px;
      background: url("../../public/static/images/video-btn-play.png");
      background-size: cover;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .footer {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background-color: #fff;
    flex-direction: column;
    padding: 10px 0;
    .title {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      .content {
        width: 100%;
        font-size: 16px;
        color: rgb(97, 90, 81);
        line-height: 22px;
      }
    }
    .userinfo {
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      .content {
        display: flex;box-sizing: border-box;
        align-items: center;
        .userheader {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          background-size: cover;
        }
        .username {
          text-align: center;
          margin-left: 10px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>