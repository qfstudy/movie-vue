import axios from 'axios'
export const url = 'http://localhost:3002'
let $axios = axios.create({
  baseURL: url + '/movie/',
  
})

function getToken() {
  let token=sessionStorage.getItem('token')
  if (token){
    return token
  }
  else{
    return null
  }
}

function $fetch(method, url, data) {
  let token = getToken()
  return new Promise((reslove, reject) => {
    $axios({
      method,
      url,
      headers: {
        Authorization: token
      },
      data: data
    }).then(res => {
      // console.log(res)
      let data = res.data
      if (data.code === 200 || data.code === 201) {
        reslove(data)
      } else {
        reject(data)
      }
    }).catch(err => {
      console.log('axios error',err)
      reject(err)
    })
  })
}

// 首页初始化数据 
export const allMovieData = () => $fetch('get', 'allmovie')

// 分类movie
export const classifyMovieData = (classifyName) => $fetch('post', 'classifymovie',{
  classifyName
})

// 分类movie all
export const classifyMovieAll= (table) => $fetch('post', 'classifyall',{
  table
})

// 验证码
export const verifyCodeChange = () => $fetch('get', 'verifycode')

// 注册
export const signup = (userName, password) => {
  return　$fetch('post', 'signup', {userName,password})
}
//登录
export const signin = (userName, password) => $fetch('post', 'signin', {
  userName,
  password
})

// 个人评论
export const userAllComment = (userName) => $fetch('post', 'getUserComment', {
  userName
})

// 上传头像----
export const uploadAvatar = (userName, avatar) => $fetch('post', 'uploadavatar', {
  avatar,
  userName
})

// 获取头像
export const getUserInfo = (userName) => $fetch('post', 'getUserInfo', {
  userName
})

// 编辑用户信息
export const editUserInfo = (newName,introduction,github,blog,email,oldName) => $fetch('post', 'edituserinfo', {
  newName,
  introduction,
  github,
  blog,
  email,
  userName: oldName
})

// 搜索
export const search = (value) => $fetch('post', 'search', {
  value
})

// 获取单个movie数据
export const singleMovieData = (movieId) => $fetch('post', 'getMovieById', {
  movieId
})

// 获取评论
export const getmovieComment = (movieId) => $fetch('post', 'getMovieComment', {
  movieId
})

// 发表评论
export const addComment = (movieId, userName, content, movieName, avatar,coverimage) => $fetch('post', 'postComment', {
  movieId,
  userName,
  content,
  movieName,
  avatar,
  coverimage
})

// 删除评论
export const deleteComment = (commentId) => $fetch('post', 'deletecomment', {
  commentId
})

//保存评价分数
export const saveScore=(userName,movieName,coverimage,score,movieId)=>$fetch('post','savescore',{
  userName,
  movieName,
  coverimage,
  score,
  movieId
})

//获取评价
export const getScore=(movieId,userName)=>$fetch('post','getscore',{
  movieId,
  userName
})

//获取单个movie所有评价的平均数
export const getSingleMovieAllScore=movieId=>$fetch('post','getsinglescore',{
  movieId
})

//获取单个movie所有评价的平均数
export const saveScoreToMovie=(meanScore,movieId)=>$fetch('post','savescoretomovies',{
  meanScore,
  movieId
})

// 删除用户个人评价 deleteEvaluateScore savecollection
export const deleteEvaluateScore=(userName,movieId)=>$fetch('post','deleteuserscore',{
  userName,
  movieId
})

// 保存收藏
export const saveCollection=(userName,movieName,coverimage,movieid)=>$fetch('post','savecollection',{
  userName,
  movieName,
  coverimage,
  movieid
})

//通过userName ,movieid获取收藏
export const getUserMovieCollection=(userName,movieid)=>$fetch('post','getcollectionbyusermovie',{
  userName,
  movieid
})

//获取评价过的movie
export const getUserAllScore=userName=>$fetch('post','getuserallscore',{
  userName
})

//获取收藏的movie
export const getUserCollection=userName=>$fetch('post','getusercollection',{
  userName
})
