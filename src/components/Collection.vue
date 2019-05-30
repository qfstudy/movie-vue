<template>
  <div class="collection-wrapper">
    <div class="collection-icon-wrapper" @click="saveCollectionToSql">
      <svg class="icon-collection" :class="{addiconcolor: iconcolor}">
        <use xlink:href="#icon-collection"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {saveCollection,getUserMovieCollection} from '../api/fetchData.js'
export default {
  name: 'Collection',
  data(){
    return{
      userName: localStorage.userName,
      iconcolor: false
    }
  },
  props:{
    movieid: '', 
    movieName: '', 
    coverimage: ''
  },
  methods: {
    async saveCollectionToSql(){
      await saveCollection(this.userName,this.movieName,this.coverimage,this.movieid).then((res)=>{
        // console.log(res)        
        this.$root.bus.$emit('emitChangeCollection')
        this.getUserMovieCollection()
      })
    },
    async getUserMovieCollection(){
      await getUserMovieCollection(this.userName,this.movieid).then(res=>{
        if(res.code===200){
          this.iconcolor=true
        }else{
          this.iconcolor=false
        }
      })
    }
  },
  mounted(){
    this.getUserMovieCollection()
  }
}
</script>

<style lang="scss" scoped>
  .collection-wrapper{
    .collection-icon-wrapper{
      .icon-collection{
        width: 22px;
        height: 22px;
        fill: #bbb;
      }
      .addiconcolor{
        fill: #ffb712;
      }
    }
  }
</style>
