<template>
  <div class="sel-wrap">
    <div id="sel-show" @click="hideOrShow" class="sel-show">
      <svg class="icon-select" id="sel-show">
        <use xlink:href="#icon-select" id="sel-show"></use>
      </svg>
    </div>
    <ul id="sel-option" class="sel-option" @click="clickHideLi($event)">
      <li data-flag="mypage" class="item" v-if="userName&&token">我的主页</li>
      <li data-flag="setting" class="item" v-if="userName&&token">设置</li>
      <li data-flag="signout" class="item" v-if="userName&&token">登出</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data(){
    return{
      flag: false,
      userName: '',
      token: ''
    }
  },
  methods:{
     /*点击下拉框显示选项列表*/
    hideOrShow(){
      let selOption = document.getElementById('sel-option')     
      this.flag = !this.flag
      if (this.flag === true) {
        selOption.style.display = 'block'
      } else {
        selOption.style.display = 'none'
      }
    },
    /*点击选项将内容替换到下拉框中并收起下拉选项*/
    clickHideLi(e){
      let selOption = document.getElementById('sel-option')
      let ev = e || window.event
      let target = ev.target || ev.srcElement
      if (target && target.nodeName === 'LI') {
        // console.dir(target.dataset.flag)
        let dataFlag=target.dataset.flag
        switch(dataFlag){
          case 'mypage':            
            this.$root.bus.$emit('emitMypage')
            break
          case 'setting':
            this.$root.bus.$emit('emitSetting')
            break
          case 'signout':
            this.$root.bus.$emit('emitSignout')
            break
        }
        selOption.style.display = 'none'
        this.flag = false
      }
    },
     /*点击屏幕其他位置，收下拉选项*/
    cllckHideList(){
      let selOption = document.getElementById('sel-option')
      let bodyEle = document.getElementsByTagName('body')[0]
      bodyEle.onclick = function (ev) {
        let e = ev || event
        let target = e.target || e.srcElement
        if (target && target.id !== 'sel-option' && target.id !== 'sel-show' && target.className !== 'item') {
          selOption.style.display = 'none'
          this.flag = false
        } else {
          return false
        }
        if (e && e.stopPropagation) {//阻止冒泡
          e.stopPropagation()
        } else {
          window.event.cancelBubble = true
        }
      }
    }
  },
  mounted(){
    this.token=sessionStorage.token
    this.userName=localStorage.userName
    this.cllckHideList()
  }
}
</script>

<style lang="scss" scoped>
.sel-wrap {
  position: relative;
  .sel-show {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    cursor: pointer;
    .icon-select{
      width: 30px;
      height: 30px;
      fill: #bbb;
    }
  }
  .sel-option {
    display: none;
    position: absolute;
    width: 100px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    right: 16px;
    li {
      padding: 5px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }
    li:hover {
      background-color: #ddd;
      font-size: 14px;
    }
  } 
}
</style>
