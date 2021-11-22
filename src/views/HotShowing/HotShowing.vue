<template>
  <div class="hotShow">

    <BestFavorableMovie
    :movieCard="bestFaMovie"
    >
      <template v-slot:titleText>
        <h2>最受好评电影</h2>
      </template>
    </BestFavorableMovie>

    <keep-alive>
      <MovieOnInfoList />
    </keep-alive>
  </div>
</template>

<script>
import BestFavorableMovie from "../../components/BestFavorableMovie";
import MovieOnInfoList from "../../components/MovieOnInfoList";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BestFavorableMovie,
    MovieOnInfoList,
  },
  computed: {
    ...mapState(["movieOnInfoListID", "movieOnInfoList","bestFaMovie"]),
  },
  methods: {
    ...mapActions(["getMovieOnInfoListId", "getMovieOnInfoListById","getBestFaMovie"]),
  },
  mounted() {
    this.getBestFaMovie();
    // this.getMovieOnInfoListId();
    // setTimeout(() => {
    //   this.getMovieOnInfoListById(this.movieIds);
    // }, 300);
  },
};
</script>

<style lang="less" scoped>
.hotShow {
  margin-top: 160px;
  margin-bottom: 40px;
}
</style>