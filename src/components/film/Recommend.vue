<template>
  <div class="Recommend" v-if="dataqita.feedVideos">
    <van-swipe
      :loop="false"
      :show-indicators="false"
      :width="150"
      :height="110"
    >
      <van-swipe-item
        v-for="(it, index) in dataqita.feedVideos.feeds"
        :key="index"
        class="lunbox"
      >
        <div class="lunboimgs">
          <img :src="it.images[0].url | parseThumbSrcbox" alt="" />
          <div class="rebofang">
            <span></span>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "VueMaoyanRecommend",
  props: ["dataqita"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.Recommend {
        padding: 0 5px;
    .rebox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0px;
        span{
            font-size: 15px;
            &:nth-child(2){
                font-size: 12px;
                opacity: 0.6;
            }
        }
    }
  .lunboimgs {
    position: relative;
    img {
      border-radius: 10px;
      width: 140px;
      height: 93px;
    }
    .rebofang {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 32px;
      transform: translate(-50%, -50%);
      height: 32px;
      background-color: white;
      border-radius: 50%;
      opacity: 0.9;
      span {
        display: block;
        width: 0;
        height: 0;
        border-color: transparent transparent transparent #222;
        border-style: solid;
        border-width: 7px 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-20%, -50%);
      }
    }
  }
}
</style>