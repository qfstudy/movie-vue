<template>
  <div class="home-container">
    <m-header class="vi-select"></m-header>
    <section class="search">
    </section>
    <section class="movie-wrapper" v-for="item in eledata" :key="item.label">
      <div class="movie-bar">
        <div class="icon-tabs-wrapper">
          <svg class="icon" v-html="item.icon">
          </svg>
          <span class="movie">{{item.label}}</span>
        </div>
        <div class="icon-more-wrapper">
          <router-link :to="{name: 'More', params: {labelName: item.name}}">
            <span class="movie-more">更多</span>
            <span class="icon-more">
              <svg class="icon">
                <use xlink:href="#icon-more"></use>
              </svg>
            </span>
          </router-link>
        </div>
      </div>
      <ul class="some-to-more">
        <li class="some-movie-wrapper" v-for="(list,index) in lists[item.id]" :key="list.id">
          <router-link :to="{name: 'Detail',params:{id:list.id}}">
            <div class="single-movie" v-if="index<9">
              <div class="movie-image-wrapper">            
                <img class="movie-image" :src="list.coverimage">
              </div>
              <div class="movie-info">
                <span class="movie-name">
                  {{list.moviename}}
                  <span class="movie-score" v-if="list.scores">{{list.scores}}</span>
                </span>
                <!-- <span class="movie-score">{{list.scores}}</span> -->
              </div> 
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {allMovieData} from '../api/fetchData'
import mHeader from './common/Mheader.vue'

export default {
  name: 'home',
  data () {
    return {
      lists: '',
      userName: null,
      isToken: '',
      eledata: [
        {label: '全部',name: 'all',icon: '<use xlink:href="#icon-all"></use>',id: '4'},
        {label: '电影',name: 'movie',icon: '<use xlink:href="#icon-movie"></use>',id: '0'},
        {label: '电视剧',name: 'tv',icon: '<use xlink:href="#icon-tv"></use>',id: '1'},
        {label: '综艺',name: 'show',icon: '<use xlink:href="#icon-microphone"></use>',id: '2'},
        {label: '动漫',name: 'comic',icon: '<use xlink:href="#icon-comics"></use>', id: '3'}
      ]
    }
  },
  components:{
    mHeader
  },
  methods:{
    linkToUserPage(){
      if(this.userName){
        this.$router.push({name: 'Mypage',params:{userName: this.userName}})
      }else{
        this.$router.push({name: 'Signin'})
        this.$root.tooltip('还没有登录，无法访问',1)
      }
    },
    async initData () {
      await allMovieData().then(res =>  {
        this.lists = res.data
        // console.log(this.lists)
      }).catch(error => {
        console.log(error)
      })  
    },
    // 登出
    signout () {
      this.$root.tooltip('登出成功',2)
      localStorage.removeItem('userName')   
      localStorage.removeItem('avatar')  
      // document.cookie = 'token=;expires=Thu, 01-Jan-1970 00:00:01 GMT'
      sessionStorage.removeItem('token')
      let timer=setTimeout(()=>{
        this.$router.push({path:'/'})
        clearTimeout(timer)
      },1500)
    },
    eventBusFn(){
      this.$root.bus.$on('emitSetting',()=>{
         this.$router.push({name: 'Setting'})
      })
      this.$root.bus.$on('emitSignout',()=>{
        this.signout()
      })
      this.$root.bus.$on('emitMypage',()=>{
        this.$router.push({name: 'Mypage',params:{userName: this.userName}})
      })
    }
  },
  mounted () {
    this.isToken=sessionStorage.token
    this.userName=localStorage.userName
    this.initData()
    this.eventBusFn()
  }
}
</script>

<style lang="scss" scoped>
  .home-container{
    background: #eee;
    font-size: 18px;
    .vi-select{
      background: #fff;
    }
    .movie-wrapper{
      background: #fff;
      .movie-bar{
        // background: #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        .icon-tabs-wrapper{
          display: flex;
          align-items: center;
          .icon{
            width: 2em;
            height: 2em;
            fill: #fbbf7b;
            margin-right: 10px;
          }
          .movie{
            font-size: 20px;
            vertical-align: middle;
          }
        }
        .icon-more-wrapper{
          display: flex;
          align-items: center;
          .icon-more{          
            .icon{
              width: 1.2em;
              height: 1.2em;
              fill: #a59fac;
            }            
          }
          .movie-more{
            font-size: 18px;
            color: #a59fac;                     
          }
        }
      }
      .some-to-more{
        display: flex;        
        flex-wrap: wrap;
        justify-content: flex-start;
        .some-movie-wrapper{
          a{
            color: #333;
          }
          .single-movie{
            padding: 6px 0;
            .movie-image-wrapper{
              display: flex;
              justify-content: space-around;
              .movie-image{
                height: 170px;
                width: 115px;
                border: 1px solid #ddd;
              }
            }
            .movie-info{
              text-align: center;
              width: 125px;
              .movie-name{
                display: inline-block;
                font-size: 14px;
                padding-top: 4px;
                .movie-score{
                  font-size: 14px;
                  color: #d17811;              
                }
              }
            }            
          }
        }
      }
    }
  }

</style>
