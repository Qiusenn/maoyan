<template>
  <div class="dianying">
    <div class="pending" v-if="dataitem">
      <p class="dianyingtop">
        <span @click="$router.back()">猫眼电影</span> >{{ dataitem.nm }}
      </p>
      <!-- 头部 -->
      <Head :dataitem="dataitem" />
      <!-- 评分 -->
      <Score :dataqita="dataqita" :dataitem="dataitem" />
      <!--简介 -->
      <Brieftwo :dataitem="dataitem" />

      <!-- 人员 -->
      <p class="stap">
        <span>演职人员</span>
        <span>全部 ></span>
      </p>
      <Actor :dataqita="dataqita" />

      <!-- 视频推荐 -->
      <p class="stap" v-if="dataqita.feedVideos">
        <span>视频推荐</span>
        <span>全部 ></span>
      </p>
      <Recommend :dataqita="dataqita" />

      <!-- 剧照 -->
      <p class="stap">
        <span>剧照</span>
        <span
          >全部<span>{{ dataitem.pn }}</span
          >张 ></span
        >
      </p>
      <Stagetwo :dataitem="dataitem" />

      <!-- 评论 -->
      <Comment :comments="dataqita.comments" />
    </div>

    <div class="loading" v-else>
      <img src="../../public/static/images/loading23.gif" alt="" />
    </div>
  </div>
</template>

<script>
import Head from "@/components/film/Head.vue";
import Score from "@/components/film/Score.vue";
import Brieftwo from "@/components/film/Brieftwo.vue";
import Actor from "@/components/film/Actor.vue";
import Recommend from "@/components/film/Recommend.vue";
import Stagetwo from "@/components/film/Stagetwo.vue";
import Comment from "@/components/film/Comment.vue";
import axios from "axios";
export default {
  name: "VueMaoyanDianyingxiangqing",
  components: { Head, Score, Brieftwo, Actor, Recommend, Stagetwo, Comment },
  data() {
    return {
      dataitem: "",
      dataqita: "",
    };
  },
  created() {
    axios
      .get(
        `https://apis.netstart.cn/maoyan/movie/detail?movieid=${this.$route.params.id}`
      )
      .then((res) => {
        this.dataitem = res.data.movie;
        this.dataqita = res.data;
      });
  },
  computed: {
    suhzhi: function () {
      this.$nextTick();
      return this.dataqita.distribution[0].percent * 100 + "%";
    },
  },
};
</script>

<style lang="less" scoped>
.dianying {
  .pending {
    height: 100%;
    padding: 15px;
    background-color: #662929;
    color: white;
    .dianyingtop {
      margin-bottom: 10px;
      color: #ccc;
      font-size: 15px;
    }
    .stap {
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
  }

  .loading {
    width: 150px;
    height: 150px;
    margin: 150px auto;
  }

  // 简介
}
</style>