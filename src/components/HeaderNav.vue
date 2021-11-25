<template>
  <div class="header-nav">
    <div class="nav-left" @click="$router.push('/pickCity')">
    <h6 v-if="currentCity">
      {{currentCity.city || currentCity.nm || currentCity}}
      </h6>
    <span><i class="iconfont icon-youjiantou"></i></span></div>
    <div class="nav-middle">
      <router-link to="/home/hotShowing" replace active-class="action"><h2>热映</h2></router-link>
      <router-link to="/home/cinema" replace  active-class="action"><h2>影院</h2></router-link>
      <router-link to="/home/pendingShowing" replace  active-class="action"><h2>待映</h2></router-link>
      <router-link to="/home/classicMovie" replace active-class="action"><h2>经典电影</h2></router-link>
    </div>
    <div class="nav-right" @click="$router.push('/search')"><i class="iconfont icon-sousuo"></i></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['currentCity'])
  }
};
</script>

<style lang="less" scoped>
.header-nav {
  width: 100%;
  height: 44px;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-left {
    width: 20%;
    display: flex;
    padding-left: 12px;
    &>h6 {  
      flex: 1;
      text-align: center;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap; 
    }
  }
  .nav-middle {
    flex: 1;
    // background-color: green;
    height: 100%;
    a {
      height: 100%;
      border-bottom: 3px solid transparent;
      transition: left 1s;
       &.action {
          font-weight: bold;
          color: #333;
          border-bottom: 3px solid red;
        }
      h2 {
        font-weight: 500;
        color: #666;
        font-size: 15px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
       
      }
    }
  }
  .nav-right {
    width: 15%;
    // background-color: yellow;

    justify-content: center;
    & > i {
      font-size: 23px;
      color: #ef4238;
    }
  }
}
</style>