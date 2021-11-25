<template>
  <!-- 中部 -->
  <div class="dianping" v-if="dataitem">
    <div class="pingtop">
      <img src="../../assets/logo-new.png" alt="" />
      <span>{{ dataitem.scoreLabel }}</span>
      <span class="itembox">
        <countTo
          :startVal="startVal"
          :endVal="dataitem.wish"
          :duration="1500"
        ></countTo>
        <span>人想看</span>
      </span>
      <span class="itembox">
        <countTo
          :startVal="startVal"
          :endVal="dataitem.watched"
          :duration="1500"
        ></countTo>
        <span>人看过 ></span>
      </span>
    </div>

    <div class="pingcen" v-if="this.dataqita.distribution.length!=0">
      <div class="cenlfet">
        <h2 align="right">{{ dataitem.sc }}</h2>
        <span>
          <countTo
            :startVal="startVal"
            :endVal="dataitem.snum"
            :duration="1500"
          ></countTo>
          <span>人评</span>
        </span>
      </div>

      <div class="cencen" v-if="dataitem">
        <div class="cenitem">
          <div class="cenxing">
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
          </div>
          <div class="jindubox" >
            <div :style="{ width: shu }"></div>
          </div>
        </div>

        <div class="cenitem">
          <div class="cenxing">
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
          </div>
          <div class="jindubox">
            <div :style="{ width: shu1 }"></div>
          </div>
        </div>

        <div class="cenitem">
          <div class="cenxing">
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
          </div>
          <div class="jindubox">
            <div :style="{ width: shu2 }"></div>
          </div>
        </div>

        <div class="cenitem">
          <div class="cenxing">
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
          </div>
          <div class="jindubox">
            <div :style="{ width: shu3 }"></div>
          </div>
        </div>

        <div class="cenitem">
          <div class="cenxing">
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/grey-star.png" alt="" />
            <img src="../../assets/white-star.png" alt="" />
          </div>
          <div class="jindubox">
            <div :style="{ width: shu4 }"></div>
          </div>
        </div>
      </div>

      <div class="cenrig" v-if="dataqita.reputation.movieRank">
        <div class="cennoe">
          <p>top</p>
          <p>{{ dataqita.reputation.movieRank }}</p>
        </div>
        <div class="centow">
          <p>{{ dataqita.reputation.firstWord }}</p>
          <p>{{ dataqita.reputation.secondWord }}</p>
        </div>
      </div>
    </div>
    <div v-else class="box">
      <span class="itemb">
        <span class="itemrenshu">
        <countTo
          :startVal="startVal"
          :endVal="dataitem.wish"
          :duration="1500"
        ></countTo>
        </span>
        <span>人想看</span>
      </span>
    </div>


    <div class="centob" v-if="dataitem.scm">
      <img src="../../assets/b2e6e57287731fb2b768ace2dc889b321236.png" alt="" />
      <p>{{ dataitem.scm }}</p>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: { countTo },
  props: ["dataqita","dataitem"],
  name: "VueMaoyanScore",

  data() {
    return {
      startVal: 0,
      shu: 0,
      shu1: 0,
      shu2: 0,
      shu3: 0,
      shu4: 0,
    };
  },
  created () {
      setTimeout(() => {
        if(this.dataqita){
          this.fangfa()
        }
       }, 800);  
  },

  mounted() {},

  methods: {
    fangfa:function(){
          if(this.dataqita.distribution.length!=0){
          this.shu=this.dataqita.distribution[0].percent * 100 + "%" ;
          this.shu1=this.dataqita.distribution[1].percent * 100 + "%";
          this.shu2=this.dataqita.distribution[2].percent * 100 + "%";
          this.shu3=this.dataqita.distribution[3].percent * 100 + "%";
          this.shu4=this.dataqita.distribution[4].percent * 100 + "%";
        }
    }
  },
};
</script>

<style lang="less" scoped>
 // 中间评分
  .dianping {
    width: 100%;
    border-radius: 10px;
    background-color: #542222;
    padding: 10px 6px;
    margin-top: 13px;
    .pingtop {
      display: flex;
      align-items: center;
      font-size: 12px;
      img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
      .itembox{
        margin-left: 5px;
        font-size: 12px;
        margin-right: 10px;
        color:#fff ;
        opacity: 0.6;

      }
    }
    .pingcen {
     margin-top: 10px;
     margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      .cenlfet {
        h2{
          font-size: 25px;
          font-weight: bold;
          color: #ffb400;
        }
        span{
          font-size: 12px;
          opacity: 0.6;
        }
      }
      .cencen {
        margin-left: 10px;
        .cenitem {
          display: flex;
          font-size: 0;
          margin-bottom: 2px;
          align-items: center;
          margin-bottom:3px ;
          .cenxing {
            img {
              width: 5px;
              height: 5px;
              margin-right: 2px;
            }
          }
          .jindubox {
            width: 71px;
            height: 4px;
            background-color: hsla(0, 0%, 100%, 0.06);
            border-radius: 0.02rem;
            margin-left: 0.08rem;
            div {
              height: 100%;
              width: 0;
              background: hsla(0, 0%, 100%, 0.3);
              border-radius: 0.02rem;
              transition: width 1.5s linear;
            }
          }
        }
      }
      .cenrig {
        margin-left: 10px;
        display: flex;
        box-sizing: border-box;
        background-image: linear-gradient(
          270deg,
          rgba(0, 0, 0, 0.04),
          rgba(226, 177, 117, 0.11)
        );
        padding: 2px;
        display: flex;
        align-items: center;
        position: relative;
        border: 1px solid #8f774c;
        border-radius: 7px;
        color: #fff4bd;
        .cennoe {
          text-align: center;
          padding: 5px;
          background: url(../../assets/top1-reputation.png) no-repeat;
          background-size: cover;
          background-position: center;
          border-radius: 5px;
          p{
            font-size: 12px;
            opacity: 0.7;
          }
        }
        .centow{
          margin-left: 5px;
          p{
            font-size: 12px;
          }
        }
      }
    }

    .centob {
      display: flex;
      align-items: center;
      padding: 5px;
      background-color: #4a1e1e;
      border-radius: 5px;
      img{
        width: 18px;
        height: 18px;
      }
      P{
        margin-left: 5px;
        font-size: 12px;
        color: #fffadf;
      }
    }
  }
  .itemb{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
    .itemrenshu{
      color: #ffb400;
      font-size: 25px;
      font-weight: 800;
    }
    span{
      &:nth-child(2){
        margin-left: 10px;
        font-size:14px;
      }
    }
  }
</style>