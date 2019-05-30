<template>
  <div class="mypage-wrapper"> 
    <mheader></mheader>
    <section class="upload-avatar-wrapper">
      <div class="no-upload-avatar" v-if="avatar === '' && siginUser">
        <input @click="clickUploadAvatar" id="upload" type="file">
        <div class="upload-avatar-text" :class="{'signin-user': siginUser}">
          <span class="avatar-text">上传头像</span>
        </div>
      </div>
      <div class="had-upload-avatar" v-else>
        <input @click="clickUploadAvatar($event)" id="upload" type="file" v-if="siginUser">
        <div class="upload-avatar-text" :class="{'signin-user': siginUser}">
          <img :src="avatar">
        </div>
      </div>
      <div class="user-name-wrapper" >
        <div class="user-name">
          <span>{{ userName }}</span>
          <span class="signup-time">({{userTime}}加入)</span>
        </div> 
        <div class="github">
          <span>Github:</span>
          <a :href="userData.github" target="_black">{{userData.github}}</a>     
        </div>
        <div class="blog">
          <span>我的博客:</span>
          <a :href="userData.github" target="_black">{{userData.blog}}</a>      
        </div>
        <div class="email">
          <span>我的邮箱:</span>
          <span>{{userData.email}}</span>      
        </div>       
      </div>      
    </section>
    
    <section class="user-edit-introduction">
      <span>个人简介:</span>
      <p v-if="userData.introduction">{{userData.introduction}}</p>
      <router-link v-else to="/setting">
        <span>写一段自我介绍</span>
      </router-link>
    </section>

    <section class="user-data-show">
      <div class="user-had-comment">
        <p class="title">{{userName}}评论过· · · · · ·({{classifyCommentsLength}})部</p>
        <ul>
          <li v-for="(item,index) in classifyComments" :key="index">
            <router-link :to="{name: 'Detail',params:{id:item[0].movieid}}" class="coverimage-moviename">
              <span class="mypage-coverimage"><img :src="item[0].coverimage"></span>
              <span class="movie-name">{{item[0].movieName}}</span>
            </router-link>
          </li>          
        </ul>
      </div>
      <div class="user-had-comment">
        <p class="title">{{userName}}评价过· · · · · ·({{allScore.length}})部</p>
        <ul>
          <li v-for="item in allScore" :key="item.id">
            <router-link :to="{name: 'Detail',params:{id:item.movieid}}" class="coverimage-moviename">
              <span class="mypage-coverimage"><img :src="item.coverimage"></span>
              <span class="movie-name">{{item.movieName}}</span>
            </router-link>
          </li>          
        </ul>
      </div>
      <div class="user-had-comment">
        <p class="title">{{userName}}的收藏· · · · · ·({{allCollection.length}})部</p>
        <ul>
          <li v-for="item in allCollection" :key="item.id">
            <router-link :to="{name: 'Detail',params:{id:item.movieid}}" class="coverimage-moviename">
              <span class="mypage-coverimage"><img :src="item.coverimage"></span>
              <span class="movie-name">{{item.movieName}}</span>
            </router-link>
          </li>          
        </ul>
      </div>
    </section>
  </div>  
</template>

<script>
import {userAllComment, uploadAvatar, editUserName,getUserInfo,getUserAllScore,getUserCollection} from '../api/fetchData.js'
import Mheader from './common/Mheader.vue'

export default {
  name: 'Mypage',
  data () {
    return {
      userTime: '',
      comments: [],
      classifyComments: {},
      classifyCommentsLength: '',
      clasifyMovieId: [],
      isEditName: true,
      inputNewUserName:'',
      userName:'',
      siginUser: true,
      avatar:'',
      allScore: '',
      allCollection: '',
      userData: ''
    }
  },
  components:{
    Mheader
  },
  methods:{
    //获取头像 获取用户信息
    async getUserInfo(){
      await getUserInfo(this.userName).then(res => {
        console.log('res userinfo',res)
        this.userData=res.data
        this.avatar = res.data.avatar
        this.userTime=res.data.time.split(' ')[0]
        localStorage.setItem('avatar',res.data.avatar);               
      }).catch(e=>{
        console.log(e)
      }) 
    },
    // 获取用户的评论
    async getUserComment(){
       await userAllComment(this.userName).then(res =>  {  
        console.log(res)    
        this.comments = res.data   
        this.classComment()
      }).catch(e => {  
        console.log(e)
        this.$root.tooltip(e.message,2)
      })
    },
    // 获取用户评价的数据
    async getUserScore(){
      await getUserAllScore(this.userName).then(res=>{
        console.log(res)
        this.allScore=res.data
      }).catch(e => {
        console.log(e)  
        this.$root.tooltip(e.message,2)
      })
    },
    // 获取用户收藏的数据
    async getUserCollection(){
      await getUserCollection(this.userName).then(res=>{
        console.log(res)
        this.allCollection=res.data
      }).catch(e => { 
        console.log(e)
        this.$root.tooltip(e.message,2)
      })
    },
    // 初始化数据
    async initUserData(){
      if (!localStorage.userName) {
        this.$router.push({path:'/signin'})
        return
      }     
      this.getUserComment()
      this.getUserInfo() 
      this.getUserScore()
      this.getUserCollection()
    },
    classComment(){
      let n=0
      this.comments.forEach((value,index)=>{
        if(!Array.isArray (this.classifyComments[value.movieName])){
          this.classifyComments[value.movieName]=[]
          n+=1
        }
        this.classifyComments[value.movieName].push(value)
      })      
      this.classifyCommentsLength=n
      console.log(n)
    },
    
    // 上传头像
    clickUploadAvatar(e){
      let _that = this
      e.target.addEventListener('change', function() {
        if(this.files.length > 0){
          let file = this.files[0]
          if(!/image/g.test(file.type)) {
            _that.$root.tooltip('请上传图片文件')
            return
          }
          let reader = new FileReader()
          if (!reader) return
          reader.onload =async function(e) {
            let imageData = e.target.result             
            await uploadAvatar(_that.userName,imageData).then((res)=>{
              _that.getUserInfo() 
            }).catch(e=>{
              console.log(e)
              _that.$root.tooltip(e.message,2)
              if(e.code === 404){
                _that.$router.push({path:'/signin'})
                localStorage.removeItem('userName')   
                localStorage.removeItem('avatar')                    
              }
            })
          }
          reader.readAsDataURL(file)
        }
      }, false)
    },
     
  },
  created(){
    if(this.$route.params.userName===localStorage.userName){      
      this.siginUser=true
      this.userName=localStorage.userName
    }else{
      this.siginUser=false
      this.userName = this.$route.params.userName
    }
  },
  mounted () { 
    this.initUserData()    
  }
}

</script>

<style lang="scss" scoped>
  .mypage-wrapper{    
    .upload-avatar-wrapper{
      display: flex;
      align-items: center;
      margin-left: 50px;
      padding: 10px;
      .no-upload-avatar,.had-upload-avatar{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        #upload{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          opacity: 0;
          z-index: 99;
        }
        #upload:focus{
          outline: none;
        }
        .signin-user.upload-avatar-text{
          position: absolute;
        }
        .upload-avatar-text{
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 50%;          
          font-size: 14px;
          width: 80px;
          height: 80px;
          text-align: center;
          overflow: hidden;
          background: #fbbf7b;         
          img{
            width: 80px;
            height: 80px;
            border-radius: 50%;             
          }
        }
      }
      .user-name-wrapper{
        padding-left: 100px; 
        font-size: 18px;       
        .user-name{
          span{
            font-size: 22px;
          }
          .signup-time{
            font-size: 14px;
            color: #bbb;
          }
        }
        div{
          padding: 5px 0;
          a{
            color: #fbbf7b;
          }
        }
      }      
    }
    .user-edit-introduction{
      padding: 10px;
      span{
        display: inline-block;
        color: #aaa;
        padding: 10px 0;
      }
      p{
        font-size: 16px;
        color: rgb(109, 107, 107);
      }
    }
    .user-data-show{
      .user-had-comment{
        .title{
          font-size: 18px;
          padding: 12px;
          color: #333;
          background: #f0f3f5;
          margin-top: 6px;
        }
        ul{
          display: flex;
          overflow-y: auto;
          padding: 10px;
          li{
            .coverimage-moviename{
              display: flex;
              flex-direction: column;
              width: 125px;
              .mypage-coverimage{
                width: 125px;
                img{
                  width: 115px;
                  height: 170px;
                }
              }
              .movie-name{
                display: inline-block;
                font-size: 14px;                
                color: #333;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
