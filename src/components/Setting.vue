<template>
  <div class="setting-wrapper">   
    <mheader></mheader>
    <section class="user-info-wrapper" >
      <div class="edit-user-name">
        <span>昵称</span>
        <input 
          type="text" 
          v-model.trim="inputNewUserName"   
          spellcheck="false"         
        >       
      </div>
      <div class="edit-user-introduction">
        <span>个人简介</span>
        <textarea 
          spellcheck="false" 
          placeholder="个人简介"
          v-model.trim="inputNewIntroduction"
        > 
        </textarea>        
      </div>
      <div class="edit-user-github">
        <span>Github</span>
        <input 
          type="text" 
          v-model="inputNewGithub"
          spellcheck="false" 
          placeholder="http://你的Github网址"
        >        
      </div>
      <div class="edit-user-blog">
        <span>博客</span>
        <input 
          type="text" 
          v-model.trim="inputNewBlog" 
          spellcheck="false"
          placeholder="http://你的博客网址"
        >        
      </div>
      <div class="edit-user-email">
        <span>电子邮箱</span>
        <input 
          type="email" 
          name="email"
          v-model.trim="inputNewEmail"
          spellcheck="false" 
        >        
      </div>
      <span class="click-save" @click="submitEditUserInfo">保存</span>
    </section>    
  </div>  
</template>

<script>
import {editUserInfo,getUserInfo} from '../api/fetchData.js'
import Mheader from './common/Mheader.vue'

export default {
  name: 'Setting',
  data () {
    return {
      inputNewUserName:'',
      userName: '',
      inputNewEmail:'',
      inputNewIntroduction: '',
      inputNewGithub: '',
      inputNewBlog: '',
      userData: ''
    }
  },
  components:{
    Mheader
  },
  methods:{
    // 获取用户信息
    async getUserInfo(){
      await getUserInfo(this.userName).then(res => {
        // console.log('edit userinfo',res)
        this.userData=res.data
        this.setInputModul()             
      }).catch(e=>{
        console.log(e)
      }) 
    },
    setInputModul(){
      this.inputNewUserName=this.userData.userName
      this.inputNewEmail=this.userData.email
      this.inputNewIntroduction=this.userData.introduction
      this.inputNewGithub=this.userData.github
      this.inputNewBlog=this.userData.blog
    },
    checkInputInfo(){
      if(
        this.inputNewUserName === this.userData.userName &&
        this.inputNewEmail === this.userData.email &&
        this.inputNewIntroduction === this.userData.introduction &&
        this.inputNewGithub === this.userData.github &&
        this.inputNewBlog === this.userData.blog
      ){
        this.$router.push({name: 'Mypage',params:{userName: this.userName}})
        return true
      }
    },
    async submitEditUserInfo(){
      let checkResult = this.checkInputInfo()
      if(checkResult){
        return
      }
      await editUserInfo(
        this.inputNewUserName,
        this.inputNewIntroduction,
        this.inputNewGithub,
        this.inputNewBlog,
        this.inputNewEmail,
        this.userName
      )
      .then(res=>{
        // console.log(res)
        this.$root.tooltip('修改成功',2)
        if(res.code===201){
          // console.log('document.cookie setting set')
          // document.cookie = `token=${res.token};max-age=${10*24*60*60};`
          sessionStorage.setItem('token',res.token)
          localStorage.setItem('userName',this.inputNewUserName)          
        }        
        this.userName = this.inputNewUserName
        let timer=setTimeout(()=>{
          this.$router.push({name: 'Mypage',params:{userName: this.userName}})
          clearTimeout(timer)
        },1000)
        // this.$router.push({name: 'Mypage',params:{userName: this.userName}})
      }).catch(e=>{
        console.log(e)
        this.$root.tooltip(e.message,2)
      })
    }
  },
  mounted () { 
    if (!localStorage.userName && !sessionStorage.token) {
      this.$router.push({path:'/signin'})
      return
    } 
    this.userName=localStorage.userName 
    this.getUserInfo()
  }
}

</script>

<style lang="scss" scoped>
  .setting-wrapper{
    .user-info-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 60px;
      div{
        display: flex;
        align-items: center;
        span{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100px;
          padding: 8px;
          text-align: center;         
          margin-right: 10px;
          margin: 10px 0;
          font-size: 18px;
        }
        input{
          width: 260px;
          height: 40px;
          border: 1px solid #ddd;
          font-size: 16px;
          padding: 8px;
        } 
        input:focus,textarea:focus{
          outline: none;
        }  
        ::placeholder{
          font-size: 14px;
          color: #bbb;
        }    
        textarea{
          font-size: 16px;
          width: 260px;
          height: 80px;
          resize: none;
          padding: 8px;
          border: 1px solid #ddd;
        }         
      }
      .click-save{
        background: #42c02e;
        width: 70px;
        padding: 4px 0;
        text-align: center;
        border-radius: 10px;
        margin-top: 20px;
        cursor: pointer;
      }
    }    
  }
</style>
