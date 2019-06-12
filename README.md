# vuemovie

技术栈：`vue2` + `vue-router` + `axios` + `sass` + `koa2`+ `koa-views` + `七牛` + `阿里字体图标` + `mysql`

前后端分离，前段主要是veu实现，后端主要是koa2实现。

[前端项目地址](https://github.com/qfstudy/movie-vue)

[前端预览地址](http://movie.qifei.site)

[后端项目地址](https://github.com/qfstudy/movie-koa)

[后端预览地址](http://madmin.qifei.site)

### 安装MySql数据库
首先需要在本地安装MySql数据库

### 登录数据库
`mysql -u root -p`

### 创建数据库
`create database moviedemo`

### 下载项目到本地

后端代码：`git clone git@github.com:qfstudy/movie-koa.git`

前端代码：`git clone git@github.com:qfstudy/movie-vue.git`

### 七牛配置
这个项目的头像和影视图片都上传到七牛，然后讲图片链接保存到数据库中，如果不想用七牛的也可以自己改代码保存到本地项目文件夹下。

七牛的使用可以查看官方文档以及官网
[七牛官网](https://portal.qiniu.com/create)
[七牛开发者中心](https://developer.qiniu.com/kodo/sdk/1289/nodejs)

### 运行后端项目

`cd movie-koa`

`npm i`

`node index.js`

### 运行前端项目

`cd movie-vue`

`npm i`

`npm run dev`

### 功能
1. 注册、登录、登出和验证码登录验证
2. 登录后可以上传头像和更换头像，以及填写个人博客、github地址等个人信息
3. 写博客，支持 markdown 语法，不支持上传图片，只能通过外链形式添加博客图片，写博客的同时还可以预览博客，实现代码高亮
4. 点赞、收藏和评论功能，在浏览博客页面可以对博客进行点赞、收藏和评论，也可以取消收藏、点赞以及删除评论
5. 编辑文章，可以对自己的文章进行编辑
6. 删除文章功能
7. 搜索功能，可以搜索存在的文章
8. 在个人主页可以看到个人填写的信息以及个人博客总共获得的点赞数量，收藏数和阅读数，还展示个人的文章

### 项目线上地址
预览: [vueblog](http://vueblog.qifei.site/#/)