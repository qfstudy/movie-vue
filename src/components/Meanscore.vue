<template>
  <div class="meanscore-wrapper">
    <ul class="score">
      <li data-score="1">
        &#9733;
      </li>
      <li data-score="2">
        &#9733;
      </li>
      <li data-score="3">
        &#9733;
      </li>
      <li data-score="4">
        &#9733;
      </li>
      <li data-score="5">
        &#9733;
      </li>
    </ul>
  </div>
</template>

<script>
import {getSingleMovieAllScore,saveScoreToMovie} from '../api/fetchData.js'
export default {
  name: 'Meanscore',
  data(){
    return{
      movieId: '',
      meanScore: ''
    }
  },
  methods: {
    // 保存影片的平均值到movies表中
    async saveScoreToMovie(){
      await saveScoreToMovie(this.meanScore, this.movieId).then(res=>{
        // console.log(res)
      })
    },
    // 获取同一个影片全部评价
    async getSingleMovieScore(){      
      await getSingleMovieAllScore(this.movieId).then(res=>{
        let scoreSum=0
        if(res.code===200){
          for(let i=0;i<res.data.length;i++){
            scoreSum=scoreSum+new Number(res.data[i].score)
          }
          this.meanScore=(Math.round(new Number(scoreSum/res.data.length)*100)/100)
        }else{
          this.meanScore=0
        }
        this.$root.bus.$emit('emitChangeMeanScore',[this.meanScore,res.data.length])
        this.saveScoreToMovie()
        if(res.code===200 || res.code===201){
          let ulEle=document.querySelector('.score')
          let AllLi = ulEle.children         
          let meanScoreNum=Math.ceil(scoreSum/(2*res.data.length))  
          Array.prototype.slice.call(AllLi).forEach((item)=>{
            item.classList.remove('scorecolor')
          }) 
          for(let i=0;i<meanScoreNum;i++){
            AllLi[i].classList.add('scorecolor')
          }
        }
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  mounted(){
    this.movieId=this.$route.params.id
    this.getSingleMovieScore()
    this.$root.bus.$on('changeScoreNum',()=>{
      this.getSingleMovieScore()
    })
  }
}
</script>

<style lang="scss" scoped>
  .meanscore-wrapper{
    .score{
      display: flex;
      align-items: center;
      li{
        font-size:18px; 
        margin:4px; 
        color:#ccc; 
      }
      .scorecolor{
        color:#ffb712;
      }
    }
  } 
</style>
