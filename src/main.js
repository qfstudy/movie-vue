import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/svg/svg.js'
import toastPlugin from './components/common/toastPlugin.js'
Vue.use(toastPlugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  data(){
    return{
      bus: new Vue()
    }
  },
  components: { App },
  template: '<App/>',
  methods:{
    tooltip(text,time=2){
      this.$toast({
        message: text,
        duration: time,
        position: 'middle',
      })
    }
  }
})
