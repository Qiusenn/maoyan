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
import { Search } from 'vant';

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

new Vue({
  router,
  store,
  // 定义全局事件总线，实现 【兄弟之间传递】
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
