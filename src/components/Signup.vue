<template>
  <div class="signup-wrapper">
    <m-header></m-header>
    <section class="signin-signup-tab">        
      <span class="signin" @click="linkToSignin">登录</span>
      <span class="signup-point">·</span>
      <span class="signup">注册</span>
    </section>
    <section class="user-info-wrapper" @keyup.enter="signupSubmit">
      <input type="text" v-model.trim="userName" placeholder="用户名">
      <input type="password" v-model.trim="password" placeholder="密码">
       <div class="signup-submit" @click="signupSubmit">注册</div>
    </section>
  </div>
</template>

<script>
import {signup} from '../api/fetchData.js'
import mHeader from './common/Mheader.vue'

export default {
  name: 'Signup',
  data(){
    return{
      userName: '',
      password: ''
    }
  },
  components:{
    mHeader
  },
  methods:{
    linkToSignin(){
      this.$router.push({name: 'Signin'})
    },
    signupSubmit(){
      if (this.userName === '' || this.password === '') {
        this.$root.tooltip('用户名/密码不能为空',1)
        return
      }
      signup(this.userName,this.password).then((res)=>{
        if(res.code===200){
          this.$root.tooltip(res.message,2)
          this.$router.push({name: 'Signin'})
        }else{
          this.$root.tooltip(res.message,2)
        }
      }).catch(error=>{
        this.$root.tooltip(error.message,2)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .signup-wrapper{
    .signin-signup-tab{
      display: flex;
      justify-content: center;
      margin-top: 80px;
      .signup{
        padding-bottom: 10px;
        color: #007fff;
        border-bottom: 3px solid #007fff;
      }
      .signup-point{
        margin-top: 8px;
      }
      span{
        padding: 0 5px;
        font-size: 23px;
      }
    }
    .user-info-wrapper{
      margin: 50px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      input{
        border: 1px solid #bbb;
        border-radius: 5px;
        padding: 6px 8px;
        margin: 8px 0;
        // height: 32px;
        width: 280px;
        font-size: 22px;
      }
      ::placeholder {
        font-size: 16px; 
        color: #ddd;         
      }
      input:focus{
        outline: none;
      }
      .signup-submit{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 0;
        font-size: 22px;
        border: 1px solid #ddd;
        border-radius: 60px;
        background: #42c02e;
        color: #fff;
        width: 280px;
        margin-top: 30px;
      }
    }
  }
</style>
