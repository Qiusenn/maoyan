<template>
  <div class="Brieftwo" @click="show=!show">
    <p class="brtop">
      <span class="brleft">简介</span>
      <span class="brrin">
        <span v-if="show">收起∧</span>
        <span v-else>展开∨</span>
      </span>
    </p>
    <p class="brbottom" :class="{zhankai:show}">
      {{ dataitem.dra }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["dataitem"],

  data() {
    return {
      show: true,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.Brieftwo {
    .brtop{
        display: flex;
        justify-content: space-between;
        margin: 10px 0px;
        .brrin{
            span{
                font-size: 14px;
                opacity: 0.6;
            }
        }
    }
  .brbottom {
    font-size: 15.5px;
    line-height: 25px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &.zhankai{
        display: block;
    }
  }
}
</style>