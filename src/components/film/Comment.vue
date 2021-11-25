<template>
  <div class="Comment" v-if="comments">
    <p>短评</p>
    <div class="commbox" v-for="item in comments.hotComments" :key="item.id">
      <!-- 顶部 -->
      <div class="comboxtop">
        <div class="comimg">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="comcen">
          <p>
            <span>{{ item.nick }}</span>
            <span
              :class="{ lv2: item.userLevel == 2, lv3: item.userLevel == 3 }"
            ></span>
          </p>
          <div class="comxing">
            <div v-if="item.score == 10">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 9">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-half-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 8">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 7">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-half-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 6">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 5">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-half-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 4">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 3">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-half-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 2">
              <img src="../../assets/star-full-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 1">
              <img src="../../assets/star-half-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
              <img src="../../assets/star-not-graded.png" alt="" />
                           {{ item.score }}分
            <span>购票</span>
            </div>
            <div v-if="item.score == 0">
            </div>

          </div>
        </div>
        <div class="comdianzhan">
          {{ item.upCount }}
        </div>
      </div>
      <!-- 中间评论 -->
      <div class="combox">
        <p>{{ item.content }}</p>
      </div>
      <!-- 底部时间 -->
      <div class="combottom">
        <span>{{ time(item.time) }}</span>
        <span>{{ item.replyCount }}回复</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueMaoyanComment",
  props: ["comments"],

  data() {
    return {
      shu: 3,
    };
  },

  mounted() {},
  computed: {
    shu1: function () {
      return 123;
    },
  },

  methods: {
    time: function (tis) {
      return new Date(tis).getMonth() + 1 + "-" + new Date(tis).getDate();
    },
  },
};
</script>

<style lang="less" scoped>
.Comment {
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 -15px;
  margin-bottom: -15px;
  color: black;
  padding: 15px;
  .commbox {
      margin-bottom: 10px;
    .comboxtop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .comimg {
        width: 34px;
        img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
      }
      .comcen {
        flex: 1;
        margin-left: 10px;
        p {
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            margin-right: 10px;
            &:nth-child(2) {
              &.lv2 {
                width: 36px;
                height: 16px;
                display: inline-block;
                background: url(../../assets/e3137a2114dfa0f5da5f0d6f5743c8cf.png)
                  no-repeat;
                background-size: cover;
                background-position: center;
              }
              &.lv3 {
                width: 36px;
                height: 16px;
                display: inline-block;
                background: url(../../assets/c853ef8e3cb69ad7bced9c38c39af045.png)
                  no-repeat;
                background-size: cover;
                background-position: center;
              }
            }
          }
        }
      }
      .comxing {
        display: flex;
        font-size: 13px;
        color: #ffb502;

        div {
          margin-right: 1px;
          img {
            margin-right: 2px;
            width: 9px;
            height: 9px;
          }
        }
        span {
          color: #4f89b3;
          padding: 1px 2px;
          font-size: 12px;
          border: 1px solid #4f89b3;
          border-radius: 9px;
          margin-left: 5px;
        }
      }
      .comdianzhan {
        font-size: 13px;
        color: #999;
        padding: 5px 10px 5px 25px;
        border: 1px solid #ccc;
        border-radius: 15px;
        position: relative;
        &::before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          position: absolute;
          left: 7px;
          background: url(../../assets/80f9c16d3e6ad90f7bc74cc4249b24151600.png)
            no-repeat;
          background-size: cover;
          background-position: center;
        }
      }
    }
    .combox {
      p {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 15px;
        margin-left: 45px;
        line-height: 20px;
        color: #333;
      }
    }
    .combottom{
        padding: 10px 0px 10px 0px;
        margin-left: 45px;
        border-bottom: 1px solid #f6f6f6;
        span{
            font-size: 12px;
            color: #666;
            &:nth-child(2){
                margin-left:10px ;
                color:#5a7cab ;
                padding: 5px;
                border-radius: 20px;
                background: #eef1f6
                
            }
        }
    }
  }
}
</style>