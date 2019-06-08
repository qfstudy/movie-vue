<template>
  <div class="search-container">
    <section class="search">
      <div class="search-back-homepage">
        <router-link to="/">
          <svg class="icon-home">
            <use xlink:href="#icon-home"></use>
          </svg>
        </router-link> 
      </div>
      <div class="icon-search-wrapper">
        <input 
          type="text" 
          placeholder="搜索"
          v-focus
          v-model.trim="inputSearch" 
          v-on:input="searchResult"
        >
        <svg class="icon-search">
          <use xlink:href="#icon-search"></use>
        </svg>
      </div>
    </section>

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
import { search } from '../api/fetchData.js'
export default {
  name: 'Search',
  data () {
    return {
      inputSearch: '',
      results: ''
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  },
  methods:{
    searchResult(){
      if (this.inputSearch !== '') {
        search(this.inputSearch).then(res=>{
          console.log(res)         
          this.results = res.data
        })
      }else{
        this.results = ''
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .search-container{
    .search{
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding: 4px 0;
      border-bottom: 1px solid #ddd;
      .search-back-homepage{       
        .icon-home{
          width: 3em;
          height: 3em;
          fill: #a59fac;
        }
      }
      .icon-search-wrapper{
        display: flex;
        align-items: center;
        margin-right: 20px;
        margin-left: 25%;
        input{
          border: 1px solid #333;
          border-radius: 30px;
          padding: 8px 10px;
          font-size: 20px;
        }      
        input:focus{
          outline: none;
        }
        ::placeholder{
          font-size: 18px;
          color: #bbb;
        }
        .icon-search{
          width: 1.6em;
          height: 1.6em;
          fill: #a59fac;
          margin-left: -2.2em;
          vertical-align: middle;
        }
      }
    }
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
