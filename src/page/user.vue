<template>
    <div>
      <nv page-type="用户信息"
          :fix="true"></nv>
      <div id="user">
        <section class="user-brief">
          <h2 class="title">个人简介</h2>
          <div class="user-info">
            <div class="banner">
              <img :src="user.avatar_url" alt="背景">
            </div>
            <img class="avatar" :src="user.avatar_url" alt="头像">
            <div class="detail clearfix" >
              <p>昵称: {{user.loginname}}</p>
              <p>注册于: {{user.create_at | getTime}}</p>
              <p>积分: {{user.score}}</p>
              <a class="quit pull-right" @click="quit"  v-if="info.loginname">登出</a>
            </div>
          </div>
        </section>
        <section class="user-action">
          <ul class="tabs clearfix">
            <li class="item br" :class='{"selected":selectNum === 1}' @click="changeTab(1)">最近回复</li>
            <li class="item"  :class='{"selected":selectNum === 2}' @click="changeTab(2)">最新发布</li>
          </ul>
          <div  v-for="u in currentData" class="message clearfix">
            <router-link :to="u.author.loginname">
              <img class="user-avatar" :src="u.author.avatar_url"  alt="头像">
            </router-link>
            <router-link :to="{name:'article',params:{id:u.id}}" class="info">
            <h1 class="title">{{u.title}}</h1>
              <span>{{u.author.loginname}}</span>
              <span class="reply-time">{{u.last_reply_at |getTime }}</span>
            </router-link>
          </div>
          <div class="nodata" v-if="currentData.length === 0">
            暂无数据
          </div>
        </section>
      </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
 
</style>
<script>
    import nv    from '../components/header.vue'
    import axios from 'Axios'
    import utils from '../lib/utils'
    import {mapGetters} from 'vuex'; 

    export default{
        data(){
            return{
                user:{},
                selectNum:1,
                currentData:[]
            }
        },
      mounted: function () {
        this.getUser()
      },
      computed: {
            ...mapGetters({
                info:'getUserInfo'
            })
        },
      filters: {
        getTime : function(value){
          let now = new  Date().getTime();
          let last = new Date(value).getTime();
          let diff = now-last;
          return   utils.getLastTimeStr(diff);

        }
      },
      methods: {
        changeTab: function (idx) {
          this.selectNum=idx;
          this.currentData=idx==1?this.user.recent_replies:this.user.recent_topics
        },
        getUser: function (){//获取文章详情
          let loginname=this.$route.params.name;
          axios.get('https://cnodejs.org/api/v1/user/' + loginname)
            .then(res=>{
              if(res.data.success){

                let data = res.data.data
                this.user=data;
                if (data.recent_replies.length > 0) {
                  this.currentData = data.recent_replies;
                } else {
                  this.currentData = data.recent_topics;
                  this.selectNum = 2;
                }
              }
            })
            .catch(err=>{
              console.log(err)
            })

        },
        quit: function(){//退出登录
          window.sessionStorage.removeItem('user');
          this.$store.commit('setUserInfo',{});
          this.$router.push({
            name:'list'
          })
        }
      },
      components:{
         nv
      },
      watch: {
        // 切换页面
        '$route' (to, from) {
          this.getUser();
        }
      },
    }
</script>
