<template>
  <div class="detail-container">
    <mheader></mheader>
    <div class="icon-home-wrapper">
      <span class="movie-name">{{lists.moviename}}</span>
    </div>
    <main class="movie-info-wrapper">
      <section class="part-one">
        <div class="movie-image">
          <img :src="lists.coverimage">
        </div>
        <div class="movie-info">
          <div>
            <span>导演:</span>
            <span>{{lists.director}}</span>
          </div>
          <div>
            <span>主演:</span>
            <span>{{lists.actors}}</span>
          </div>
          <div>
            <span>类型:</span>
            <span>{{lists.type}}</span>
          </div>
          <div>
            <span>制片国家:</span>
            <span>{{lists.country}}</span>
          </div>
          <div>
            <span>首播:</span>
            <span>{{lists.date}}</span>
          </div>
          <div>
            <span>播放时长:</span>
            <span>{{lists.length}}</span>
          </div>
          <div>
            <span>语言:</span>
            <span>{{lists.language}}</span>
          </div>
        </div>
      </section>  
      <section class="part-two">
        <span class="net-friend-score">网友评分</span>
        <div class="mean-number-wrapper">
          <div class="mean-score-wrapper">
            <span class="mean-score">{{meanAndNumber[0]}}</span>
            <meanscore class="mean-score-component"></meanscore> 
          </div>
          <span class="score-number">{{meanAndNumber[1]}}人评价</span>         
        </div>
        <div class="collection-wrapper">
          <span class="icon-collection-wrap">
            <span class="click-collection">点击收藏</span>
            <collection 
              :movieid="movieId" 
              :movieName="lists.moviename" 
              :coverimage="lists.coverimage"
              class="click-collection-icon"
            >
            </collection>
          </span>
          <span class="collection-number">{{lists.collection}}人收藏</span>
        </div>
      </section>
    </main>
    <section class="synopsis">
      <span class="title">{{lists.moviename}}的剧情简介</span>
      <div class="brief-wrapper">
        <span class="brief">简介:</span>
        <span class="brief-content">{{lists.brief}}</span>
      </div>
    </section>
    <section class="evaluate-score">
      <span class="user-evaluate">我的评价</span>
      <score :movieName="lists.moviename" :coverimage="lists.coverimage"></score>
      <span class="delete-score" @click="clickDeleteEvaluateScore">
        删除
      </span>
    </section>
    <section class="movie-comment">
      <comment :movieName="lists.moviename" :coverimage="lists.coverimage"></comment>
    </section>
  </div>
</template>
  
<script>
import {singleMovieData,deleteEvaluateScore} from '../api/fetchData.js'
import Comment from './Comment.vue' 
import Score from './Score.vue' 
import Meanscore from './Meanscore.vue' 
import Collection from './Collection'
import Mheader from './common/Mheader.vue'

export default {
  name: 'Detail',
  data(){
    return{
      lists: '',
      userName: localStorage.userName,
      movieId: '',
      meanAndNumber: ''
    }
  },
  components:{
    Comment,
    Score,
    Meanscore,
    Collection,
    Mheader
  },
  methods:{
    async getMovieData () {
      await singleMovieData(this.movieId).then(res =>  {
        // console.log(res.data[0])
        if(res.code===200){
          this.lists = res.data[0]
        }else{
          this.$root.tooltip(res.message,2)
          this.$router.push({path:'/'})
        }
      })
    },
    async clickDeleteEvaluateScore(){
      await deleteEvaluateScore(this.userName,this.movieId).then(res=>{
        // console.log(res)
        this.$root.bus.$emit('changeScoreNum')
        this.$root.bus.$emit('deleteScoreEmit')
      })
    }
  },
  created(){
    this.movieId = this.$route.params.id
  },
  mounted(){
    this.getMovieData()
    this.$root.bus.$on('emitChangeMeanScore',(meanAndNumber)=>{
      this.meanAndNumber=meanAndNumber
    })
    this.$root.bus.$on('emitChangeCollection',()=>{
      this.getMovieData()
    })    
  }
}
</script>

<style lang="scss" scoped>
  .detail-container{
    .icon-home-wrapper{
      .movie-name{
        display: inline-block;
        font-size: 18px;
        padding-left: 10px;
        padding-top: 10px;
      }
    }
    .movie-info-wrapper{
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      .part-one{
        display: flex;
        .movie-image{
          img{
            width: 135px;
            height: 190px;
          }
        }
        .movie-info{
          font-size: 16px;
          margin-left: 20px;
          overflow: hidden;
          width: 220px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          div{
            padding: 2px 0;
            display: flex;
            // height: 28px;
            span:nth-child(1){
              color: #a59fac;
            }
            span:nth-child(2){
              padding-left: 2px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .part-two{
        display: flex;
        display: inline;
        margin-left: 60px;
        .net-friend-score{
          font-size: 14px;
          color: #a59fac;
          display: inline-block;
          margin-bottom: 10px;
        }
        .mean-number-wrapper{
          display: flex;
          flex-direction: column;
          .mean-score-wrapper{
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            .mean-score{
              font-size: 28px;
            }
          }
          .score-number{
            margin-top: -8px;
            color: #a59fac;
            font-size: 16px;
            margin-bottom: 10px;
          }
        }
        
        .collection-wrapper{
          .icon-collection-wrap{
            display: flex;
            .click-collection{
              display: inline-block;
              font-size: 14px;
              color: #a59fac;
              margin-right: 10px;
            }
            .click-collection-icon{
              cursor: pointer;
            }
          }
          .collection-number{
            font-size: 14px;
            color: #a59fac;
          }
        }
      }
    }
    .synopsis{
       padding: 10px;
      .title{
        font-size: 20px;
      }
      .brief-wrapper{
        padding-top: 20px;
        .brief{
          color: #a59fac;
          font-size: 16px;
        }
        .brief-content{
          font-size: 16px;
        }
      }
    }
    .evaluate-score{
      display: flex;
      align-items: center;
      padding: 10px;
      .user-evaluate{
        font-size: 16px;
      }
      .delete-score{
        font-size: 15px;
        color: #a59fac;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
</style>
