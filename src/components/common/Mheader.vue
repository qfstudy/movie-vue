<template>
  <header class="navbar-wrapper">
    <div class="navbar-github">
      <a class="github-icon-wrap" target="__blank" href="https://github.com/qfstudy/movie-vue">
        <svg class="icon-github" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>	
    </div>
    <div class="search-wraper">
      <router-link :to="{ name: 'Search'}">      
        <input 
          v-model="inputSearch" 
          type="text" 
          v-focus
          placeholder="搜索" 
          class="search-input" 
          @input="searchMovie"
        >
      </router-link>
      <svg class="icon-search" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>      
    </div>
    <div class="navbar-content">
      <router-link :to="{ name: 'Home'}" class="homepage-text">
        首页							
      </router-link>				 
      <span v-if="!isToken">
        <router-link :to="{ name: 'Signin'}">
          登录							
        </router-link>	
      </span>
      <span v-if="!isToken">
        <router-link :to="{ name: 'Signup'}">
          注册						
        </router-link>	      
      </span>				        
      
      <vi-select v-if="isToken"></vi-select>
    </div>
	</header>
</template>

<script>
import { search } from '../../api/fetchData.js'
import viSelect from './Viselect.vue'

export default {
  name: 'Mheader',
  data(){
    return{
      signinUserName: '',
      isToken: '',
      inputSearch: '',
      searchResult: ''
    }
  },
  components:{
    viSelect
  },
  methods:{
    searchMovie(){
      if (this.inputSearch !== ''){
        search(this.inputSearch).then(res=>{
          console.log(res)
          this.searchResult = res.data
          this.$root.bus.$emit('emitSearchValue',this.searchResult)
        })
      }else{
        this.searchResult = ''
        this.$root.bus.$emit('emitSearchValue',this.searchResult)
      }
    },
    // 修改用户名
    clickEditUserInfo(){
      this.$router.push({name: 'Setting'})
    }, 
    // 登出
    signout () {
      this.$root.tooltip('登出成功',2)
      sessionStorage.removeItem('token')
      localStorage.removeItem('userName')   
      localStorage.removeItem('avatar')  
      this.isToken=''
      this.signinUserName=''
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
      this.$root.bus.$on('emitMypage',()=>{
        this.$router.push({name: 'Mypage',params:{userName: this.signinUserName}})
      })
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  },
  mounted(){
    this.isToken=sessionStorage.token
    if(sessionStorage.token){
      this.signinUserName=localStorage.userName
    }else{
      localStorage.removeItem('userName')   
      localStorage.removeItem('avatar')  
    }
    
    this.eventBus()
  }
}
</script>

<style lang="scss" scoped>
 .navbar-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    height: 52px;
    .navbar-github{
      margin-left: 10px;
      .github-icon-wrap{
        .icon-github{
          width: 42px;
          height: 42px;
          fill: #bbb;
        }
      }
    }
    .search-wraper{
      display: flex;
      align-items: center;
      position: relative;
      .search-input{
        padding: 7px;
        border: 1px solid #bbb;
        border-radius: 16px;
        font-size: 16px;
      }
      ::placeholder{
        font-size: 14px;
        color: #bbb;
      }
      .search-input:focus{
        outline: none;
      }
      .icon-search{
        width: 22px;
        height: 22px;
        fill: #bbb;
        position: absolute;
        right: 6px;
      }
    }
    .navbar-content{
      display: flex;
      align-items: center;
      margin-right: 10px;
      .homepage-text{
        margin-right: 28px;
      }
      a{
        display: inline-block;
        color: #007fff;
        padding: 0 8px;
      }
      .write-page{
        display: flex;
        align-items: center;
        color: #007fff;
        padding:0 20px;
        cursor: pointer;
        .icon-xieboke{
          width: 30px;
          height: 30px;
          fill: #007fff;
        }
      }
    }
  }
</style>
