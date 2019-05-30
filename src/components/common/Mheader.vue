<template>
  <div class="mheader-wrapper">
    <section class="back-to-homepage">
      <div class="icon-github-wrapper">
        <a href="https://github.com/qfstudy/movie-vue" target="_blank">
          <svg class="icon-github">
            <use xlink:href="#icon-github"></use>
          </svg>
        </a>
      </div>
      <span class="signout-wrapper">
        <router-link to="/" class="link-homepage">
          <span class="homepage-text">首页</span>
        </router-link> 
        <span class="signin-user">{{signinUserName}}</span>
        <vi-select class="vi-select"></vi-select>
      </span> 
    </section>   
  </div>
</template>

<script>
import viSelect from './Viselect.vue'
export default {
  name: 'Mheader',
  data(){
    return{
      signinUserName: ''
    }
  },
  components:{
    viSelect
  },
  methods:{
    // 修改用户名
    clickEditUserInfo(){
      this.$router.push({name: 'Setting'})
    }, 
    // 登出
    signout () {
      this.$root.tooltip('登出成功',2)
      localStorage.removeItem('userName')   
      localStorage.removeItem('avatar')  
      document.cookie = 'token=;expires=Thu, 01-Jan-1970 00:00:01 GMT'
      let timer=setTimeout(()=>{
        this.$router.push({path:'/'})
        clearTimeout(timer)
      },1500)
    },
    eventBus(){
      this.$root.bus.$on('emitSetting',()=>{
        this.clickEditUserInfo()
      })
      this.$root.bus.$on('emitSignout',()=>{
        this.signout()
      })
      this.$root.bus.$on('emitSignin',()=>{
        this.$router.push({name: 'Signin'})
      })
      this.$root.bus.$on('emitSignup',()=>{
        this.$router.push({name: 'Signup'})
      })
      this.$root.bus.$on('emitMypage',()=>{
        this.$router.push({name: 'Mypage',params:{userName: this.signinUserName}})
      })
    }
  },
  mounted(){
    this.signinUserName=localStorage.userName
    this.eventBus()
  }
}
</script>

<style lang="scss" scoped>
  .mheader-wrapper{
    .back-to-homepage{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f0f3f5;
      padding: 2px;
      .icon-github-wrapper{
        margin-left: 8px;
        .icon-github{
          width: 2.6em;
          height: 2.6em;
          fill: #d17811;
        }
      }
     
      .signout-wrapper{
        display: flex;
        align-items: center;
        font-size: 18px;
        .link-homepage{
          color: #333;
          padding-right: 20px;
          .homepage-text{
            font-size: 18px;
          }
        }
        .signin-user{
          color: #ec6149;
          padding-right: 10px;
        }
        .vi-select{
          padding-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
