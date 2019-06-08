<template>
  <div class="movie-wrapper">
    <mheader></mheader>
    <section class="movie-list">
      <div class="icon-home-wrapper">
        <span class="movie-label">{{ classifyName }}</span>
      </div>
      <section class="radio-sort">
        <input type="radio" id="one" value="one" v-model="picked" @click="sortByTime">
        <label for="one">按时间排序 </label>
        <input type="radio" id="two" value="two" v-model="picked" @click="sortByhot">
        <label for="two">按热度排序 </label>        
        <input type="radio" id="three" value="three" v-model="picked" @click="sortByScore">
        <label for="three">按评价排序</label>
      </section>
      <ul>
        <li v-for="list in lists" :key="list.id">
          <router-link :to="{name: 'Detail',params:{id:list.id}}" 
            class="image-name-score">
            <div class="image-wrapper">
              <img :src="list.coverimage">
            </div>
            <div class="name-score">
              <span class="movie-name">
                {{list.moviename}}
                <span class="score" v-if="list.scores">{{list.scores}}</span>   
              </span>               
            </div>         
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {classifyMovieData,classifyMovieAll,url } from '../api/fetchData.js'
import Mheader from './common/Mheader.vue'

export default {
  name: 'More',
  data () {
    return {
      lists: [],
      classifyName: '',
      pathParam: '',
      picked: ''
    }
  },
  components:{
    Mheader
  },
  methods:{
    sortByhot(){
      this.lists.sort((a,b)=>{
        return a.collection-b.collection
      })
    },
    sortByTime(){
      this.lists.sort((a,b)=>{
        return a.id-b.id
      })
    },
    sortByScore(){
      this.lists.sort((a,b)=>{
        return a.scores-b.scores
      })
    },
    async initData(){
      if(this.classifyName === '全部'){
        let table='movies'
        await classifyMovieAll(table).then(res=>{
          // console.log(res.data)
          this.lists=res.data
        })
      }else{
        classifyMovieData(this.classifyName).then(res => {
          // console.log(res.data)
          this.lists=res.data          
        })  
      }          
    },
    classifyMovie(path){
      switch(path){
        case "all":          
          this.classifyName = '全部'
          break
        case "movie":    
          this.classifyName = '电影'
          break
        case "tv":          
          this.classifyName = '电视剧'
          break
        case "show":          
          this.classifyName = '综艺'
          break
        case "comic":          
          this.classifyName = '动漫'
          break
      }
    }
  },
  created(){
    this.pathParam=this.$route.params.labelName
  },
  mounted () {    
    this.classifyMovie(this.pathParam)
    this.initData()  
  }
}
</script>

<style lang="scss" scoped>
  .movie-wrapper{
    .movie-list{
      .icon-home-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ddd;
        .movie-label{
          font-size: 20px;
          padding: 10px;
        }
      } 
      .radio-sort{
        display: flex;
        align-items: center;
        padding-left: 10px;
        label{
          padding: 10px 10px;
          font-size: 14px;
        }
      }     
      ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        // justify-content: flex-start;
        // border-top: 1px solid #a59fac;
        li{          
          padding-top: 10px;
          text-align: center;
          width: 130px;
          .image-name-score{
            color: #333;
          }
          .image-wrapper{
            display: flex;
            justify-content: space-around;
            img{
              width: 115px;
              height: 170px;
              border: 1px solid #ddd;
            }
          }
          .name-score{
            width: 120px;
            .movie-name{
              font-size: 14px;
            }
            .score{
              font-size: 0.4em;
              color: #d17811;
            }
          } 
        }
      }
    }
  }
</style>
