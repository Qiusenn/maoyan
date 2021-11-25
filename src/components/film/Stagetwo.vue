<template>
  <div class="stagetwo">
    <van-swipe
      :loop="false"
      :show-indicators="false"
      :width="150"
      :height="110"
    >
      <van-swipe-item
        v-for="(it, index) in dataitem.photos"
        :key="index"
        class="lunbox"
      >
        <div class="lunboimgs">
          <img  :src="it | parseThumbSrcbox" alt="" />

        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "VueMaoyanStage",
  props:["dataitem"],

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.stagetwo{
    padding: 0 5px;
    .lunboimgs{
        width: 140px;
          height: 93px;
        img{
            display: block;
            width: 100%;
            height: 100%;
            margin: auto;
        

        }
    }
}
</style>