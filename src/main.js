import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { IndexBar, IndexAnchor, Cell, List} from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { TreeSelect } from 'vant';
import { Loading } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Search, Toast } from 'vant';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem)

Vue.use(Toast);
Vue.use(Search)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Loading);
Vue.use(TreeSelect);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(DropdownMenu);
Vue.use(DropdownItem)
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(List);
Vue.config.productionTip = false

Vue.filter("parseThumbSrc", function (value) {
  return value ? value.replace("/w.h", "") + "@1l_1e_1c_128w_180h" : null;
});
Vue.filter("parseThumbSrcbox", function (value) {
  return value ? value.replace("/w.h", "").replace("2500w_2500h",'420w_279h').replace("imageMogr2/thumbnail/2500x2500%3E",'imageView2/1/w/420/h/279/q/80') : null;
});

new Vue({
  router,
  store,
  // 定义全局事件总线，实现 【兄弟之间传递】
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
