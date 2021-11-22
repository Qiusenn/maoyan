<template>
  <!-- 底部组件 -->
  <div class="footer">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route v-if="$route.meta.showFooter">
      <van-tabbar-item icon="idcard" replace :to="chang" name="/home">电影/影院</van-tabbar-item>
      <van-tabbar-item icon="tv-o" replace to="/video" name="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="video-o" replace to="/Smallvideo" name="/Smallvideo">小视频</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" replace to="/show" name="/show">演出</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/mine" name="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      chang: '/home/hotShowing'
    };
  },
  watch: {
    // 监听当前跳转路由
    '$route.path': {
      handler (n) {
        // 判断是否离开当前一级路由
        if (n == '/video' || n == '/show' || n == '/mine' || n == '/Smallvideo') {
          return;
        }
        // 将当前跳转to路由 重新改名
        this.chang = n
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
// .footer {
//   display: flex;
//   background-color: white;
//   width: 100vw;
//   height: 50px;
//   z-index: 1;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   border-top: .5px solid #d8d8d8;
//   div {
//     height: 100%;
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;
//     // color: red;
//     &.actio-icon {
//       color: red;
//     }
//     span {
//       text-align: center;
//       height: 20px;
//       line-height: 30px;
//       .iconfont {
//         font-size: 25px;
//       }
//     }
//     h5 {
//       font-size: 10px;
//       margin-bottom: 5px;

//     }
//     &:nth-child(2) span i{
//         font-size: 22px;
//       }
//     &:nth-child(3) span i{
//         font-size: 20px;
//       }
//     &:nth-child(4) span i{
//         font-size: 25px;
//       }
//     &:nth-child(5) span i{
//         font-size: 22px;
//       }
//   }
// }
</style>