<template>
  <div class="pickCity">
    <van-index-bar :index-list="indexList" class="bar" v-if="cityList.hot">
      <van-index-anchor index="定位" />
        <div class="locate">定位城市</div>
        <div class="locate_city">
          <Button type="default" size="small" class="locate_btn"
            >定位失败，请稍后重试</Button
          >
        </div>
    <van-index-anchor index="最近"/>
    <div class="recentVisit">最近定位城市</div>
    <div class="locate_city">
      <button class="locate_btn recent_btn" @click="resetCurrentCity(lastCity)" v-for="lastCity in lastVisitCity" :key="lastCity.id">{{lastCity.nm}}</button>
    </div>
    
    <van-index-anchor index="热门"/>
    <div class="hotCity">热门城市</div>
    <div class="locate_city">
      <button
        class="locate_btn recent_btn"
        v-for="city in hotCityList"
        :key="city.id"
        @click="resetCurrentCity(city)"
      >
        {{ city.nm }}
      </button>
    </div>
      <div v-for="filterCity in filterCitys" :key="filterCity.key">
        <van-index-anchor :index="filterCity.key"/>
          <van-cell :title="city.nm" v-for="city in filterCity.val" @click="resetCurrentCity(city)" :key="city.id"/>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Button } from "vant";
import '../../assets/resetui.css'
export default {
  data() {
    return {
      // 最近访问城市
      lastVisitCity: JSON.parse(window.localStorage.getItem('lastVisit')) || []
    }
  },
  computed: {
    // 获取城市列表
    ...mapState(["cityList", "currentCity"]),
    filterCitys() {
      // 对数组进行排序A~Z
      let sortCate = {};
      let arr = [];
      let newArr = this.cityList.cts;
      newArr
        .forEach((item) => {
          let letter = item.py.slice(0, 1).toUpperCase();
          if (sortCate[letter]) {
            sortCate[letter] = [...sortCate[letter], item];
          } else {
            sortCate[letter] = [item];
          }
        });
      for (const key in sortCate) {
        arr.push({key:key,val:sortCate[key]})
        }
        return arr.sort( (a, b) => {
          if (a.key < b.key) {
            return -1
          }
        })
      },
      indexList () {
        let index = []
        this.filterCitys.forEach( item => {
          index.push(item.key)
        })
        index.unshift('定位','最近','热门')
        return index
      },
      // 最热城市 过滤
      hotCityList () {
        let arr = []
        this.cityList.hot.map( item => {
          arr.push(...this.cityList.cts.filter( city => city.nm == item))
        })
        return arr
      }
  },

  mounted() {
    // 获取城市
    this.getCityList();
  },
  methods: {
    ...mapActions(["getCityList", "setCurrentCity", "getNearCityCinema"]),
    // 列表点击获取当前点击数据并返回主页面设置当前点击城市
    resetCurrentCity (city) {
      // 重新设置城市
      this.setCurrentCity(city)
      this.$router.back()
      // 设置本地存储
      let visitCity = city
      // 去除重复，并将最新点击城市放在最前面 最多存储10个
      this.lastVisitCity = this.lastVisitCity.filter( item => {
        return item.id !== visitCity.id
      }).splice(0,9)
      this.lastVisitCity.unshift(visitCity)
      // 设置当前点击城市 一个
      window.localStorage.setItem('city',JSON.stringify(city))
      // 设置最近点击城市 多个
      window.localStorage.setItem('lastVisit',JSON.stringify(this.lastVisitCity))
      console.log(city);
      this.getNearCityCinema({cityId:city.id})
    }
  },
  components: {
    Button,
  },
};
</script>

<style lang="less" scoped>
.pickCity {
  //  &>.bar {
  //     &>.van-index-anchor {
  //     z-index: 1;
  //     box-sizing: border-box;
  //     padding: 0 16px;
  //     color: #323233;
  //     font-weight: 500;
  //     font-size: 14px;
  //     line-height: 32px;
  //     background-color: transparent;
  //     }
  //  }
  .locate {
    background-color: #ebebeb;
    padding-left: 15px;
    line-height: 30px;
    color: #333;
    font-size: 14px;
  }
  .locate_city {
    padding: 5px 0 15px 0;
    .locate_btn {
      margin-left: 2%;
    }
  }
  .recentVisit {
    background-color: #ebebeb;
    padding-left: 15px;
    color: #333;
    font-size: 14px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .recent_btn {
    width: 29%;
    background: #fff;
    outline: none;
    border: 1px solid #e6e6e6;
    // margin: 0 15px;
    font-size: 13px;
    padding: 10px 0;
    margin-left: 2%;
    margin-top: 15px;
  }
  .hotCity {
    background-color: #ebebeb;
    padding-left: 15px;
    line-height: 30px;
    color: #333;
    font-size: 14px;
  }
  // .indexBar {
  //   margin-top: 10px;
  // }
}
</style>