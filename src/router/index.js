import Vue from 'vue'
import Router from 'vue-router'
import Signup from '../components/Signup.vue'
import Signin from '../components/Signin.vue'
import Home from '../components/Home.vue'
import More from '../components/More.vue'
import Detail from '../components/Detail.vue'
import Search from '../components/Search.vue'
import Mypage from '../components/Mypage.vue'
import Setting from '../components/Setting.vue'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/more/:labelName',
      name: 'More',
      component: More
    },
    {
      path: '/movie/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/user/:userName',
      name: 'Mypage',
      component: Mypage,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
  ]
})
