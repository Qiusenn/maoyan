<template>
    <!-- 顶部 -->
    <dir class="dianyingtobu">
      <div class="dianimg">
        <img :src="dataitem.img | parseThumbSrc" alt="" />
        <span></span>
      </div>

      <div class="dianrig">
        <h2>{{ dataitem.nm }}</h2>
        <p>{{ dataitem.enm }}</p>
        <p>{{ fangfa }}</p>
        <p>{{ fangfa1 }}</p>
        <p>{{ dataitem.pubDesc }}/{{ dataitem.dur }}分钟</p>
        <div class="dianxiang">
          <img src="../../assets/want-to-watch.png" alt="" />
          想看
        </div>
      </div>
    </dir>
</template>

<script>
export default {
    name: 'VueMaoyanHead',
    props: ["dataitem"],
    computed: {
          fangfa: function () {
      if (this.dataitem.cat) {
        return this.dataitem.cat.replaceAll(",", "/");
      } else {
        return "";
      }
    },
    fangfa1: function () {
      if (this.dataitem.star) {
        return this.dataitem.star.replaceAll(",", "/");
      } else {
        return "";
      }
    },  
    },
};
</script>

<style lang="less" scoped>

  // 顶部
  .dianyingtobu {
    margin: 0;
    padding: 0;
    display: flex;
    .dianimg {
      width: 100px;
      position: relative;
      height: 140px;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 30px;
        height: 30px;
        background: url(../../assets/poster-play.png) no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    .dianrig {
      flex: 1;
      color: #fff;
      padding-left: 15px;
      h2 {
        font-size: 21px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        margin-bottom: 3px;
        opacity: 0.6;
      }
      .dianxiang {
        width: 30vw;
        height: 33px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        img {
          width: 15px;
          height: 15px;
          margin-right: 0.4rem;
        }
      }
    }
  }
</style>