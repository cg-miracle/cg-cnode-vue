<template>
  <div>
    <nv page-type="帖子正文"
        :fix="true"
    ></nv>
    <loading v-show="isLoading"></loading>
    <div id="article" v-if="art.title">
      <div class="content-head">
        <h2 class="content-title">{{art.title}}</h2>
        <div class="author-info">
            <router-link :to="{name:'userInfo',params:{name:art.author.loginname}}">
                <img :src="art.author.avatar_url" class="author_avatar">
            </router-link>
          <span >{{art.author.loginname}}</span>
          <span class="createTime">{{art.last_reply_at | getTime}}</span>
        </div>
      </div>
      <div class="content" v-html="art.content"> </div>

      <h3 class="reply-count">
        <strong>{{art.reply_count}}</strong> 回复
      </h3>

      <!--评论列表-->
      <section id="reply-list">
           <ul>
             <li  class="replycell" v-for="a in art.replies">
               <section class="user clearfix">
                 <router-link :to="{name:'userInfo',params:{name:a.author.loginname}}"><img :src="a.author.avatar_url" alt="头像"></router-link>
                 <div class="info">
                   <span>
                     <span>{{a.author.loginname}}</span>
                     <span> 发布于{{a.create_at | getTime}}</span>
                   </span>
                 </div>
               </section>
               <div class="reply-content" v-html="a.content"></div>
             </li>
           </ul>
      </section>
      <reply v-if="info.loginname"
             :artice-id="articleId"
      ></reply>
    </div>

  </div>
</template>

<script>
  import axios from 'Axios'
  import utils from '../lib/utils'
  import nv    from '../components/header.vue'
  import loading    from '../components/loading.vue'
  import reply    from '../components/reply.vue'
  import {mapGetters} from 'vuex'; 

  export default{
    data() {
      return {
        isLoading:true,
        articleId:'',
        art: {}
      }
    },
    computed: {
        ...mapGetters({
                info:'getUserInfo'
            }),
    },
    filters: {
      getTime : function(value){
        let now = new  Date().getTime();
        let last = new Date(value).getTime();
        let diff = now-last;
        return   utils.getLastTimeStr(diff);

      }
      
    },
    mounted: function () {
        this.getArticle()
    },
    methods: {
      getArticle: function (){//获取文章详情
        this.articleId=this.$route.params.id;
        axios.get('https://cnodejs.org/api/v1/topic/'+this.articleId)
          .then(res=>{
            if(res.data.success){
              this.isLoading = false
              let data = res.data.data

             this.art=data;
              console.log(this.art.reply_count)
            }
          })
          .catch(err=>{
            console.log(err)
          })

      }
    },
    components:{
      nv,
      loading,
      reply
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
