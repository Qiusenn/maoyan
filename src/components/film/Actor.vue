<template>
  <div class="Actor">
    <van-swipe :loop="false" :show-indicators="false" :width="95" :height="170">
      <van-swipe-item
        v-for="(it, index) in dataqita.celebrities"
        :key="index"
        class="lunbox"
      >
        <div class="lunboimgs">
          <img :src="it.avatar | parseThumbSrc" alt="" />
        </div>
        <h5>{{ it.cnm }}</h5>
        <p>{{ it.desc }}</p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "VueMaoyanActor",
  props: ["dataqita"],

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.Actor {
  .acp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    span {
      font-size: 15px;
      &:nth-child(2) {
        font-size: 12px;
        opacity: 0.6;
      }
    }
  }
  .lunbox {
    // margin-right: 10px;

    h5 {
      // padding-left: 10px;
      width: 85px;
      text-align: center;
      margin: 4px 0;
      font-size: 14px;
      font-weight: bolder;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    p {
      font-size: 12px;
      width: 85px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: #999;
      text-align: center;
    }

    .lunboimgs {
      // width: 100%;
      height: 120px;
      margin-right: 10px;
      position: relative;
      .lunbobeijing {
        display: block;
        width: 100%;
        height: 30px;
        background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);

        position: absolute;
        bottom: 0;
      }
      .lunbowenzi {
        display: block;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        // left: 5px;
        font-size: 12px;
        color: #faaf00;
        font-weight: 800;
      }
      img {
        width: 100%;
        height: 100%;
        margin: auto;
      }
    }
  }
}
</style>