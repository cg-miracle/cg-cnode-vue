<template>
    <div id="secondcomponent">
      <h1>我是第二个子页面</h1>
      <a> written by {{ author }} </a>
      <p> 感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</p>
     <el-card class="box-card">
       <div slot="header" class="clearfix">
         <h1 style="line-height: 36px; color: #20A0FF">豆瓣电影排行榜</h1>
       </div>
       <div v-for="article in articles" class="text item">
         {{article.title}}
       </div>
     </el-card>

    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return{
            author:"SCG xxxx ",
            articles: [],
            }
        },
        mounted: function(){
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10').then(function(res){
             this.articles=res.data["subjects"];
             console.log(res.data);
            },function(res){
            console.log(res);
            })

        }
    }
</script>
