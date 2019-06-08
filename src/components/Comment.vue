<template>
  <div class="comment-container">
    <section class="comment-write-wrapper" v-if="userName">
      <input 
        class="comment-input-content" 
        spellcheck="false" 
        placeholder="写下你的评论...  "
        v-model="commentContent"
        @keyup:enter="saveComment"
      />  
      <span class="submit" @click="saveComment">发送</span> 
    </section> 

    <section class="no-signin" v-else>
      <router-link :to="{ name: 'Signin'}">
        <span class="signin">登录</span>
      </router-link>	
      <span class="signin-comment">后发表评论</span>
    </section>
    
    <section class="comment-content-wrapper" v-if="allComments.length>0">
      <span class="allcomments-length">{{movieName}}的短评 · · · · · ·(全部{{allComments.length}}条)</span>
      <div class="comment-wrapper" v-for="item in allComments" :key="item.id">
        <div class="comment-user-info">
          <router-link :to="{ name: 'Mypage',params:{userName: item.userName}}">
            <img class="user-avatar" :src="item.avatar">
          </router-link>	
          <div class="name-and-time">
            <router-link :to="{ name: 'Mypage',params:{userName: item.userName}}" class="user-name">
              {{item.userName}}
            </router-link>	                        
          </div>
        </div>
        <div class="comment-content">
          <span>{{item.content}}</span>          
          <div>
            <span class="comment-time">{{item.date}}</span>
            <span 
              v-if="userName===item.userName" 
              @click="deleteComment(item.id)"
              class="delete-comment"
            >
              删除
            </span>
          </div>
        </div>
      </div>
    </section>	
    <span class="no-comment" v-else>智慧如你，不想发表一点想法咩~</span>
  </div>
</template>

<script>
import {url, getmovieComment ,addComment,deleteComment} from '../api/fetchData.js'

export default {
  name: 'Comment',
  data () {
    return {
      commentContent: '',
      allComments: '',
      userName: localStorage.userName,
      avatar: localStorage.avatar,
    }
  },
  props:{
    movieName: '',
    coverimage: ''
  },
  methods: {
    saveComment(){
      if (this.commentContent === '') {
        this.$root.tooltip('请输入评论内容',2)
        return
      }
      let avatar = !this.avatar ? '' : this.avatar
      addComment(this.$route.params.id, this.userName,this.commentContent,this.movieName,avatar,this.coverimage)
      .then( data=> {
        this.initConment()
        this.$root.tooltip('评论成功',2)
        this.commentContent = ''
      }).catch(e=>{
        this.$root.tooltip(e.message,2)
        this.commentContent = ''                   
      })
    },
    async initConment(){
      let movieId = this.$route.params.id
      await getmovieComment(movieId).then( res =>  {
        console.log(res)
        this.allComments = res.data
      }).catch(e => {
        this.$root.tooltip(e.message,2)
      }) 
    },
    async deleteComment(commentId){
      console.log(commentId)
      await deleteComment(commentId).then((res)=>{
        if(res.code===200){
          this.$root.tooltip(res.message,2)
          this.initConment()
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted () {
    this.initConment()
  }
}
</script>

<style lang="scss" scoped>
  .comment-container{
    .comment-write-wrapper{
      display: flex;
      align-items: center;
      // justify-content: space-between;
      flex-direction: column;
      padding: 10px;
      .comment-input-content{
        height: 48px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        width: 80%;
      }
      .comment-input-content:focus{
        outline: none;
      }
      .submit{        
        border-radius: 10px;
        cursor: pointer;
        width: 20%;
        padding: 10px 0;
        background: #2175bc;
        font-size: 18px;
        color: #fff;
        text-align: center;
        height: 48px;
        margin-top: 20px;
      }
      .submit:focus{
        outline: none;
      } 
    }
    .no-signin{      
      display: flex;
      justify-content: center;
      align-items: center;
      background: #eee;
      height: 100px;
      .signin{
        display: inline-block;
        border-radius: 5px;
        background: #2175bc;
        color: white;
        padding: 6px 20px;
        font-size: 18px;
        cursor: pointer;
        vertical-align: middle;        
      }
      .signin-comment{
        padding-left: 10px;
        font-size: 18px;        
      }
    }
    .comment-content-wrapper{
      .allcomments-length{
        display: block;
        padding: 10px;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
      }   
      .comment-wrapper{
        padding: 10px;
        .comment-user-info{
          display: flex;
          align-items: center;
          .user-avatar{            
            width: 46px;
            height: 46px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .name-and-time{
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            .user-name{
              // vertical-align: top;
              color: #333;
              font-size: 18px
            }            
          }
        }
        .comment-content{
          padding: 10px 0;
          font-size: 16px;
          display: flex;
          flex-direction: column;
          .comment-time{
            margin-top: 10px;
            font-size: 14px;
            color: #a59fac;
          }
          .delete-comment{
            font-size: 12px;
            color: #2175bc;
            cursor: pointer;
          }
        }
      }
    }
    .no-comment{
      padding: 10px;
      font-size: 16px;
    }
  }
</style>
