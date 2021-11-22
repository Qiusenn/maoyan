<template>
  <div id="app">
    <!-- <Header v-if="$route.meta.showHomePage"/> -->
    <router-view></router-view>
    <Footer/>
  </div>
</template>
<script>
import Footer from './components/Footer'
import {mapState, mapActions} from 'vuex'
export default {
  mounted () {
      // 判断当前本都存储是否有保存城市列表
      if (this.currentCity) {
        return
      }
        this.getCityLanLng({lat:this.lat,lng:this.lng})
  },
  methods: {
    ...mapActions(['getCityLanLng'])
  },
  computed: {
    // 当前城市，经纬度
    ...mapState(['currentCity', 'lat', 'lng'])
  },
  // 组件
  components: {
    Footer,
  }
}
</script>
<style lang="less">
  html,body {
    background-color: #F5F5F5;
  }
  #app {
    background-color: #F5F5F5;
  }
  
</style>
