<template>
  <div>
    <Header/>
    <router-view class="routerView"></router-view>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.routerView {
    overflow: hidden;
  }
</style>