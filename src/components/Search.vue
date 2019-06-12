<template>
  <div class="search-container">
    <m-header></m-header>
    <section class="search-result">
      <div v-if="results.length === 0 &&  inputSearch !== ''">
        <div class="not-find">没有相关影片</div>
      </div>
      <ul v-else class="result-list">
        <li v-for="result in results" :key="result.id">
          <router-link :to="{name: 'Detail',params:{id:result.id}}">
            <div class="result-name">
              <span>{{result.moviename}}</span>
            </div>
          </router-link>
        </li> 
      </ul>
    </section>
  </div>
</template>

<script>
import mHeader from './common/Mheader.vue'

export default {
  name: 'Search',
  data () {
    return {
      inputSearch: '',
      results: ''
    }
  },
  components:{
    mHeader
  },
  methods:{
    searchResult(){
       if(this.results.length<1){
        this.$root.tooltip('没有搜索相关影片',1)
        return
      }
    }
  },
  mounted(){
    this.$root.bus.$on('emitSearchValue',(value)=>{
      if(!value){
        this.results=''
        return
      }
      this.results=value
      this.searchResult()
    })
  }
}

</script>

<style lang="scss" scoped>
  .search-container{
    .search-result{
      .result-list{
        li{
          padding: 8px;
          border-bottom: 1px solid #ddd; 
          .result-name{
            padding-left: 10px;
            font-size: 18px;
            color: #a59fac;
          }
        }
      }
      .not-find{
        padding: 10px;
        font-size: 18px;
      }
    }
  }
</style>
