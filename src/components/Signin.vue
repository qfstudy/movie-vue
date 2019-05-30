<template>
  <div class="signin-wrapper">
    <mheader></mheader>
    <section class="signin-signup-tab">        
      <span class="signin">登录</span>
      <span class="signup-point">·</span>
      <span class="signup" @click="linkToSignup">注册</span>
    </section>
    <section class="user-info-wrapper">
      <div class="input-wrapper" @keyup.enter="signinSubmit">
        <input 
          type="text" 
          v-model.trim="userName" 
          placeholder="用户名"
          class="username"
        >
        <input 
          type="password" 
          v-model.trim="password" 
          placeholder="密码"
          class="password"
        >
        <input 
          type="text" 
          v-model.trim="verifyCode"         
          placeholder="验证码"
          class="identifying-code"
        >
        <div class="identifying-code-wrapper">
          <img @click="changVerifyCode" :src="verifyCodeUrl" class="identifying-code-image">
        </div>
        <div class="signin-submit" @click="signinSubmit">登录</div>      
      </div>
    </section>
  </div>
</template>

<script>
  import {signin,verifyCodeChange,url} from '../api/fetchData.js'
  import Mheader from './common/Mheader.vue'

  export default {
    name: 'Signin',
    data() {
      return {
        userName: '',
        password: '',
        verifyCode: '',
        verifyCodeTest: '',
        verifyCodeUrl: ''
      }
    },
    components:{
      Mheader
    },
    methods: {
      linkToSignup(){
        this.$router.push({name: 'Signup'})
      },
      // 登录 
      signinSubmit() {
        if (this.userName === '' || this.password === '') {
          this.$root.tooltip('用户名或密码不能为空',2)
          return
        }
        if (this.verifyCode !== this.verifyCodeTest) {
          this.$root.tooltip('验证码错误',2) 
          this.verifyCode=''
          this.changVerifyCode()
          return
        }
        signin(this.userName, this.password).then(res => {
          if (res.code === 200) {
            this.$root.tooltip(res.message,2)
            this.$router.push({name: 'Home'})
            console.log('signin: '+res.token)
            document.cookie = `token=${res.token};max-age=${10*24*60*60}`
            localStorage.setItem('userName', res.data.userName)
            localStorage.setItem('avatar', res.data.avatar)
          } else {
            this.$root.tooltip(res.message,2)
          }
        }).catch(error => {
          this.$root.tooltip(error.message,2)
          console.log(error)
        })
      },
      // 验证码切换
      changVerifyCode() {
        verifyCodeChange().then(res => {
          this.verifyCodeTest = res.data
          this.verifyCodeUrl = url + '/images/yzm.jpg' + '?time=' + (new Date).getTime()
          console.log('验证码', this.verifyCodeTest)
        })
      }
    },
    mounted() {
      if (localStorage.userName && localStorage.userName !== '') {
        this.$router.push('/')
      }
      this.verifyCodeUrl = url + '/images/yzm.jpg'
      this.changVerifyCode()
    },
  }

</script>

<style lang="scss" scoped>
  .signin-wrapper{
    .signin-signup-tab{
      display: flex;
      justify-content: center;
      margin-top: 80px;
      .signin{
        padding-bottom: 10px;
        color: #ec6149;
        border-bottom: 3px solid #ec6149;
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
      .input-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        input{
          border: 1px solid #bbb;
          border-radius: 5px;
          padding: 6px 8px;
          margin: 8px 0;
          height: 32px;
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
        .identifying-code-wrapper{
          .identifying-code-image{
            width: 200px;
            height: 60px;
          }
        }
        .signin-submit{
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
  }
</style>
