import Vue from 'vue'
import VueRouter from 'vue-router'
import HotShowing from '../views/HotShowing/HotShowing'
import PendingShowing from '../views/PendingShowing/PendingShowing.vue'
import ClassicMovie from '../views/ClassicMovie/ClassicMovie.vue'
import Cinema from '../views/Cinema/Cinema.vue'
import PickCity from '../views/PickCity/PickCity.vue'
import CinemaDetail from '../components/CinemaDetail.vue'
import Video from '../views/Video/Video.vue'
import PlayPage from '../views/PlayPage.vue'
import Search from '../views/Search.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/cinemaDetail',
    component: CinemaDetail,
    // meta: { showHomePage: true },
  },
  {
    path: '/pickCity',
    component: PickCity,
    meta: { 
      showHomePage: true 
    },
  },
  {
    path: '/home',
    component: Home,
    meta: { showHomePage: true },
    children: [
      {
        path: '/',
        redirect: 'hotShowing'
      },
      {
        path: 'hotShowing',
        component: HotShowing,
        meta: { 
          showHomePage: true,
          showFooter: true
         }
      },
      {
        path: 'pendingShowing',
        component: PendingShowing,
        meta: { 
          showHomePage: true,
          showFooter: true
         }
      },
      {
        path: 'classicMovie',
        component: ClassicMovie,
        meta: { 
          showHomePage: true,
          showFooter: true
         }
      },
      {
        path: 'cinema',
        component: Cinema,
        meta: {
          showHomePage: true,
          showOption: true,
          showFooter: true
        }
      },
    ]
  },

  {
    path: '/video',
    component: Video,
    meta: { 
      // showHomePage: true,
      showFooter: true
     }
  },
  {
    path: '/playPage',
    component: PlayPage,
  },
  {
    path: '/search',
    component: Search,
  },


]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
