<template>
  <div>
    <ul 
      class="score-wrapper cleanfloat" 
      @click="clickAddScoreClass($event)"
    >
      <li data-score="1" 
        @mouseenter="mouseEnter($event)"
        @mouseleave="mouseLeave($event)"  
      >
        &#9733;
      </li>
      <li data-score="2" 
        @mouseenter="mouseEnter($event)"
        @mouseleave="mouseLeave($event)"  
      >
        &#9733;
      </li>
      <li data-score="3" 
        @mouseenter="mouseEnter($event)"
        @mouseleave="mouseLeave($event)"  
      >
        &#9733;
      </li>
      <li data-score="4" 
        @mouseenter="mouseEnter($event)"
        @mouseleave="mouseLeave($event)"  
      >
        &#9733;
      </li>
      <li data-score="5" 
        @mouseenter="mouseEnter($event)"
        @mouseleave="mouseLeave($event)"
      >
        &#9733;
      </li>
      <li class="score-label">{{scoreLabel}}</li>
    </ul>
  </div>
</template>

<script>
import {saveScore,getScore} from '../api/fetchData.js'
export default {
  name: 'Score',
  data(){
    return{
      clickFlat: false,
      hoverFlat: false,
      result1: [],
      result2: [],
      result3: [],
      result4: [],
      scoreLabel: '',
      userName: localStorage.userName,
      movieId: '',
      scoreSum: ''
    }
  },
  props:{
    movieName: '',
    coverimage: ''
  },
  methods: {
    // 点击五角星时保存
    async clickSaveScore(){
      await saveScore(this.userName,this.movieName,this.coverimage,this.scoreSum,this.movieId).then((res)=>{
        // console.log(res)
        this.$root.bus.$emit('changeScoreNum')
      }).catch(error=>{
        console.log(error)
      })
    },
    // 得到当前的分数对五角星加颜色
    async clickGetScore(){
      await getScore(this.movieId,this.userName).then(res=>{
        // console.log(res)
        if(res.code===200 || res.code===201){
          let ulEle=document.querySelector('.score-wrapper')
          let AllLi = ulEle.children      
          let length=res.data.score/2
          switch(length){
            case 1:
              this.scoreLabel="很差"
              break
            case 2:
              this.scoreLabel="较差"
              break
            case 3:
              this.scoreLabel="还行"
              break
            case 4:
              this.scoreLabel="推荐"
              break
            case 5:
              this.scoreLabel="力荐"
              break
          }
          Array.prototype.slice.call(AllLi).forEach((item)=>{
            item.classList.remove('scorecolor')
          }) 
          for(let i=0;i<length;i++){
            AllLi[i].classList.add('scorecolor')
          }
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    // 鼠标移入时调用
    async clearScoreColor(){
      await getScore(this.movieId,this.userName).then(res=>{
        // console.log(res)
        if(res.code===200){
          let ulEle=document.querySelector('.score-wrapper')
          let AllLi = ulEle.children
          let length=res.data.score/2
          for(let i=0;i<length;i++){
            AllLi[i].classList.remove('scorecolor')
          }
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    // 获取当前元素以及前面兄弟节点
    preAllElement(event){      
      let parentEle = event.target.parentElement
      let childrenLi = parentEle.children
      let childrenArr = []
      for(let i=0;i<childrenLi.length;i++){
        childrenArr.push(childrenLi[i])
        if(childrenLi[i].dataset.score === event.target.dataset.score){
          break
        }
      }
      return childrenArr
    },
    // 点击五角星加类名以及保存到数据库中
    clickAddScoreClass(event){        
      if(!this.clickFlat){
        this.result1=this.preAllElement(event)
        this.result1.forEach(item=>{
          item.classList.add('scorecolor')
        })
        this.clickFlat=true
      }else{
        this.result1=this.preAllElement(event)  
        if(this.result2.length<this.result1.length){
          let num=this.result2.length
          for(let i=num;i<this.result1.length;i++){
            this.result1[i].classList.add('scorecolor')
          }
        }else{          
          let num=this.result1.length
          for(let i=num;i<this.result2.length;i++){
            this.result2[i].classList.remove('scorecolor')
          }
        } 
      } 
      this.result2=this.result1
      this.scoreSum=this.result2.length*2
      this.clickSaveScore() 
    },
    mouseEnter(event){
      this.clearScoreColor()
      let target = event.target
      this.result3=this.preAllElement(event)
      switch(this.result3.length){
        case 1:
          this.scoreLabel="很差"
          break
        case 2:
          this.scoreLabel="较差"
          break
        case 3:
          this.scoreLabel="还行"
          break
        case 4:
          this.scoreLabel="推荐"
          break
        case 5:
          this.scoreLabel="力荐"
          break
      }
      this.result3.forEach(item=>{
        item.classList.add('scorecolor1')
      })
    },
    mouseLeave(){
      this.scoreLabel=''
      this.clickGetScore()
      let target = event.target
      this.result4=this.preAllElement(event)
      this.result4.forEach(item=>{
        item.classList.remove('scorecolor1')
      })
    }
  },
  mounted(){
    this.movieId=this.$route.params.id
    this.clickGetScore()
    this.$root.bus.$on('deleteScoreEmit',()=>{      
      this.clickGetScore()
    })
  }
}
</script>

<style lang="scss" scoped>
  .score-wrapper{
    display: flex;
    align-items: center;
  }
  ul li{
    color:#ccc; 
    cursor:pointer;
    font-size:18px; 
    margin:4px; 
  }
  .score-label{
    font-size: 15px;
    color: #333;
  }
  .scorecolor,.scorecolor1{
    color:#ffb712;
  }

</style>
