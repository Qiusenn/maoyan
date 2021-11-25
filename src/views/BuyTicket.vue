<template>
  <div class="cinemaInset">
    <!-- 头部 -->
    <div class="header">
      <h1>上海分镜天悦影城</h1>
      <div class="scree">银幕</div>
      <div class="monitor">3号厅荧幕</div>
    </div>

    <!-- 座位部分 -->
    <div
      class="seat-container"
      @mousewheel="onMousewheel($event)"
      ref="seat"
      :style="{ transform: `scale(${zoomE})` }"
    >
      <!-- 左边导航 -->
      <ul class="nav-left">
        <li v-for="(zIndex, index) in seat.rows" :key="index">{{ index+1 }}</li>
      </ul>
      <!-- 右边座位 -->

      <div class="right-seat">
        <ul v-for="row in seat.rows" :key="row.rowId">
          <li
            v-for="col in row.seats"
            :key="col.columnId"
            :class="[
              backgroundClassArr[col.seatStatus],
              { isChecked: col.active },
            ]"
            @click="checkedSeat($event, col)"
          ></li>
        </ul>
      </div>
    </div>

    <!-- 猫眼电影提供 -->
    <!-- <div class="provide">猫眼电影提供</div> -->
    <ul class="select">
      <li>
        <img src="../../public/static/images/canCheck.png" alt="" />
        <span>可选</span>
      </li>
      <li>
        <img src="../../public/static/images/hasbuy.png" alt="" />
        <span>已售</span>
      </li>
      <li>
        <img src="../../public/static/images/unckecked.png" alt="" />
        <span>不可选</span>
      </li>
    </ul>

    <div class="footer">
      <div class="marked-words">
        <div class="close-marked"><i class="iconfont icon-youjiantou"></i></div>
        <h6>影院通知</h6>
        <ul class="cover-words">
          <li>电影放映期间影厅内进制饮食,感谢配合!</li>
          <li>观影需全程佩戴口罩,电影放映期间影厅内进制饮食,感谢配合!</li>
          <li>观影需全程佩戴口罩,感谢配合!</li>
          <li>观影需全程佩戴口罩,电影放映期间影厅内进制饮食,感谢配合!</li>
        </ul>
      </div>

      <!-- 轮播提示信息 -->
      <div class="swiper-module">
        <ul>
          <li
            :style="{ transform: `translateY(${Move}px)` }"
            :class="{ 'has-end': Move >= 0 }"
          >
            观影需全程佩戴口罩,感谢配合!
          </li>
          <li
            :style="{ transform: `translateY(${Move}px)` }"
            :class="{ 'has-end': Move >= 0 }"
          >
            影院不提供3d眼镜,感谢配合!
          </li>
          <li
            :style="{ transform: `translateY(${Move}px)` }"
            :class="{ 'has-end': Move >= 0 }"
          >
            电影放映期间影厅内进制饮食,感谢配合!
          </li>
          <li
            :style="{ transform: `translateY(${Move}px)` }"
            :class="{ 'has-end': Move >= 0 }"
          >
            影院谢绝外带食品,感谢配合!
          </li>
        </ul>
      </div>

      <div class="movie-message">
        <div class="movie-header">
          <h6>门锁</h6>
          <p>今天 11月24 13:00-14:45 国语2D</p>
        </div>

        <!-- 上映时间 -->
        <ul class="movie-time-card">
          <li>
            <p class="card">13:00</p>
            <p class="language">国语2D</p>
            <p class="price">32.9元 <span class="sell">惠</span></p>
          </li>

          <li>
            <p class="card">13:00</p>
            <p class="language">国语2D</p>
            <p class="price">32.9元 <span class="sell">惠</span></p>
          </li>

          <li>
            <p class="card">13:00</p>
            <p class="language">国语2D</p>
            <p class="price">32.9元 <span class="sell">惠</span></p>
          </li>

          <li>
            <p class="card">13:00</p>
            <p class="language">国语2D</p>
            <p class="price">32.9元 <span class="sell">惠</span></p>
          </li>
          <li>
            <p class="card">13:00</p>
            <p class="language">国语2D</p>
            <p class="price">32.9元 <span class="sell">惠</span></p>
          </li>
        </ul>

        <ul class="checked-ticked-card">
          <!-- 已选中的座位生成数据 -->
          <li
            v-for="(item, index) in checkedArr"
            :key="index"
            @click="delTicket(item)"
          >
            <div class="checked-ticked-card">
              <span class="checked-seat">{{ item.name }}</span>
              <p class="price">32.9元 <span class="sell">惠</span></p>
            </div>
            <div class="del">x</div>
          </li>
        </ul>
      </div>

      <button class="btn">{{ count }}</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      cinemaData: [], // 当前影院数据
      seat: [], // 座位数组
      searStatus: [], // 座位状态
      zoomE: 0.4,
      Move: 0,
      isShow: 2,
      // 选择的座位数据
      checkedArr: [],
      backgroundClassArr: [
        "noStyle",
        "canCheck",
        null,
        "hasChecked",
        "unCheck",
      ],
    };
  },
  created() {
    axios
      .get(`https://apis.netstart.cn/maoyan/cinema/seat.json`)
      .then((res) => {
        this.cinemaData = res.data.data;
        this.seat = res.data.data.seat.regions[0];
        this.searStatus = res.data.data.seat.image.seatLegends;
      });
    setTimeout(() => {
      this.zoomE = 1;
    }, 300);

    setInterval(() => {
      this.Move -= 25;
      if (this.Move <= -100) {
        this.Move = 0;
      }
    }, 2500);
  },
  methods: {
    checkedSeat(e, resData) {
      if (resData.seatStatus == 4) {
        return;
      }
      this.zoomE = 1;
      // 多选
      let col = resData.columnId.slice(1);
      if (resData.active) {
        // 不存在时设置自定义属性
        this.checkedArr = this.checkedArr.filter((res) => {
          if (res.columnId !== resData.columnId || res.rowId !== resData.rowId) {
            return res;
          }
        });
        Vue.set(resData, "active", false);
      } else {
        if (this.checkedArr.length >= 4) {
        this.$toast("最多选取4个座位呦呦呦~~~");
        return;
      }
        Vue.set(resData, "active", true);
        this.checkedArr.push({
          name: `${resData.rowId}排${col}座`,
          columnId: resData.columnId,
          rowId: resData.rowId,
          seatNo: resData.seatNo,
        });
      }
    },
    // 消除当前座位和数据
    delTicket(item) {
      this.checkedArr = this.checkedArr.filter((res) => {
        if (res.columnId !== item.columnId || res.rowId !== item.rowId) {
          return res;
        }
      });
      this.seat.rows.forEach((col) => {
        col.seats.forEach((row) => {
          if (row.seatNo == item.seatNo) {
            Vue.set(row, "active", false);
          }
        });
      });
    },

    // 鼠标滑动放大事件
    onMousewheel(e) {
      console.log(e.deltaY);
      if (e.deltaY >= 100) {
        this.zoomE -= 0.05;
      } else if (e.deltaY <= -100 && this.zoomE <= 100) {
        this.zoomE += 0.05;
      }
    },
  },

  computed: {
    count() {
      if (this.checkedArr.length) {
        return this.checkedArr.length+1 * 39.5 + "元";
      } else {
        return "请选择您的坑位";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cinemaInset {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
  // 头部
  .header {
    width: 100%;
    h1 {
      width: 100%;
      text-align: center;
      color: #999;
      margin-top: 10px;
    }
    .scree {
      width: 100%;
      height: 26px;
      text-align: center;
      line-height: 26px;
      color: #999;
      font-size: 14px;
      margin-top: 5px;
      background: url("../../public/static/images/wutai.png") no-repeat;
      background-size: cover;
    }
    .monitor {
      width: 100%;
      color: #5a5656;
      text-align: center;
      font-size: 15px;
      margin-top: 10px;
    }
  }

  .seat-container {
    transition: transform 0.7s;
    width: 100%;
    margin-top: 10px;
    display: flex;
    .nav-left {
      width: 15px;
      overflow: hidden;
      margin-left: 15px;
      border-radius: 10px;
      li {
        height: 52px;
        text-align: center;
        line-height: 52px;
        font-size: 13px;
        background-color: #a8a8a8;
        color: white;
      }
    }

    // 右边座位
    .right-seat {
      width: 300px;
      height: 250px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 7px;
        display: block;
        left: 49%;
        transform: translateX(-50%) scale(0.9);
        width: 1px;
        height: 100%;
        border-left: 1px dashed #dedede;
        z-index: 99;
      }
      ul {
        width: 100%;
        height: calc(250px / 5 - 20px);
        margin-top: 15px;
        &:nth-child(n + 2) {
          margin-top: 20px;
        }
        li {
          float: left;
          width: calc(100% / 8 - 8px);
          height: 100%;
          background-size: 100% 100%;
          border-radius: 5px;
          &.noStyle {
            width: 0;
            height: 0;
          }
          &.canCheck {
            background-image: url("../../public/static/images/canCheck.png");
          }
          &.hasChecked {
            background-image: url("../../public/static/images/hasbuy.png");
          }
          &.unCheck {
            background-image: url("../../public/static/images/unckecked.png");
          }
          &.isChecked {
            background-image: url("../../public/static/images/checkedtict.png");
          }
          &:nth-child(n + 2) {
            margin-left: 8px;
          }
        }
      }
    }
  }

  .provide {
    width: 100%;
    margin-top: 70px;
    text-align: center;
    font-size: 14px;
    color: #d7d7d7;
  }
  .select {
    width: 100%;
    margin-top: 22px;
    display: flex;
    justify-content: space-around;
    li {
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #9999;
      img {
        display: inline-block;
        vertical-align: bottom;
        width: 15px;
        margin-right: 3px;
        height: 15px;
      }
    }
  }

  .footer {
    width: 95%;
    overflow: hidden;
    border-radius: 10px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 10px;
    margin: 10px auto 0;
    .marked-words {
      width: 100%;
      box-sizing: border-box;
      display: none;
      font-size: 11px;
      padding-left: 10px;
      padding-top: 10px;
      padding-bottom: 8px;
      background-color: #fff9eb;
      position: relative;
      color: #ffb23e;
      .close-marked {
        position: absolute;
        bottom: 5px;
        transform: rotate(90deg);
        right: 5px;
        font-size: 20px;
      }
      .cover-words {
        li {
          margin-top: 3px;
        }
      }
    }
    .swiper-module {
      width: 100%;
      height: 30px;
      display: flex;
      background-color: #fff9eb;
      overflow: hidden;
      padding-left: 15px;
      ul {
        width: 80%;
        text-align: center;
        overflow: hidden;
        height: 20px;
        li {
          transition: transform 0.5s;
          line-height: 25px;
          font-size: 15px;
          color: #ff9b05;
          &.has-end {
            transition: transform 0s;
          }
        }
      }
    }

    .movie-message {
      background-color: white;
      padding-top: 15px;
      padding-left: 10px;
      padding-bottom: 5px;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      .movie-header {
        width: 100%;
        h6 {
          font-weight: 700;
          font-size: 16px;
        }
        p {
          font-size: 11px;
          margin-top: 10px;
          color: #bebebe;
        }
      }

      .movie-time-card {
        margin-top: 8px;
        overflow: hidden;
        li {
          font-size: 12px;
          display: flex;
          float: left;
          padding: 2px;
          flex-direction: column;
          justify-content: space-around;
          width: 53px;
          background-color: #f6f6f6;
          height: 52px;
          border-radius: 5px;
          color: #767676;
          // border: 1px solid #FF4F4F;
          text-align: center;
          &:nth-child(n + 2) {
            margin-left: 8px;
          }
          .language {
            color: #abaaaa;
          }
          .price {
            .sell {
              background-color: #ff9900;
              color: #fff;
              font-size: 11px;
              padding: 1px;
              display: inline-block;
              transform: scale(0.9);
            }
          }
        }
      }

      .checked-ticked-card {
        width: 100%;
        overflow: hidden;
        // background-color: skyblue;
        box-sizing: border-box;
        margin-top: 10px;
        margin-bottom: 10px;
        border-top: 1px solid #f6f6f6;
        li {
          float: left;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          background-color: #f6f6f6;
          padding: 3px;
          align-items: center;
          &:nth-child(n + 2) {
            margin-left: 8px;
          }
          .checked-ticked-card {
            font-size: 12px;
            color: #686767;
            margin-right: 10px;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-around;
          }
          .price {
            .sell {
              background-color: #ff9900;
              color: #fff;
              font-size: 11px;
              padding: 1px;
              display: inline-block;
              transform: scale(0.9);
            }
          }
        }
      }
    }
  }

  .btn {
    width: 95%;
    margin: 10px auto 0;
    background-color: #ff9410;
    padding: 10px 0;
    outline: none;
    border: 0;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #ffba6e;
  }
}
</style>