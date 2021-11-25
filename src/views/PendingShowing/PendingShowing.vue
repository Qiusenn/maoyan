<template>
  <div class="pendingShow">
    <BestFavorableMovie
    :movieCard="bestForwardMovie.coming"
    >
      <template v-slot:titleText>
        <h2>近期最受期待</h2>
      </template>
    </BestFavorableMovie>
    
    <MoreComingList></MoreComingList>
  </div>
</template>

<script>
import BestFavorableMovie from "../../components/BestFavorableMovie";
import MoreComingList from '../../components/MoreComingList'
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["getBestForwardMovie"]),
  },
  mounted() {
    // 获取待映 最近最受期待
    setTimeout(() => {
      this.getBestForwardMovie({city:JSON.parse(window.localStorage.getItem('city')).id,offset:0});
    }, 300);
  },
  computed: {
    ...mapState(["bestForwardMovie", "currentCity", "bestForwardMovie"]),
  },

  components: {
    BestFavorableMovie,
    MoreComingList
  },
};
</script>

<style lang="less" scoped>
.pendingShow {
  margin-top: 160px;
}
</style>