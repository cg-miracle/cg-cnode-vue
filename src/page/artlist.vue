<template>
  <div>
    <nv :page-type="itemTabs[initIndex].title"
        ref="head"
        :fix="true"
        ></nv>
    <div>
    <div id="artlist">
       <ul class="list-tab">
         <li v-for="(item,index) in itemTabs" class="tabs" :class="index === initIndex ?'on':''" v-on:click="changeTab(index)" >{{item.title}}</li>
       </ul>

  <div class="listContent">
    <!--<loading v-show="isLoading"></loading>-->
    <div v-for="art in artlists" class="cell">
      <router-link class="link-view" :to="{name:'article',params:{id:art.id}}">
        <div class="info-top">
          <span class="list-status" :class="art.good | getTabClass(art.top)">{{art.tab | getTab(art.good,art.top)}}</span>
          <h1 class="title">{{art.title}}</h1>
        </div>

        <div class="info-bottom clearfix">
          <router-link class="pull-left" :to="{name:'userInfo',params:{name:art.author.loginname}}">
            <img :src="art.author.avatar_url" class="avatar" :alt="art.author.loginname" >
          </router-link>
          <p class="n-r">
            <span>{{art.author.loginname}}</span>
            <span class="rv-count pull-right">{{art.reply_count}}/{{art.visit_count}}</span>
          </p>
          <span class="last-rp-time">{{art.create_at | getTime}}</span>
          <span class="last-rp-time pull-right">{{art.last_reply_at | getTime}}</span>
        </div>
      </router-link>
    </div>
  </div>
</div>

    </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
</style>
<script>
    require('../style/all.scss');
    
    import axios from 'Axios';
    import utils from '../lib/utils'
    import nv    from '../components/header.vue'
    import loading from   '../components/loading.vue'

    export default{
        data(){
            return{
              initIndex: 0,
              scroll: true,
              isLoading:true,
              artlists: [],
              itemTabs: [
                {'title': '全部', 'type' : 'all'},
                {'title': '精华', 'type' : 'good'},
                {'title': '分享', 'type' : 'share'},
                {'title': '问答', 'type' : 'ask'},
                {'title': '招聘', 'type' : 'job'},
              ],
                params: {
                  'page' :  1,
                  'limit' : 20,
                  'tab' : 'all'
                }
            }
        },
        filters : {
            getTab: function (tab,good,top) {
              let str = '';
              if (top) {
                str = '置顶';
              } else if (good){
                str = '精华';
              } else {
                switch(tab) {
                  case 'share':
                    str = '分享';
                    break;
                  case 'ask':
                    str = '问答';
                    break;
                  case 'job':
                    str = '招聘';
                    break;
                  default:
                    str = "暂无";
                    break;
                }
              }
              return str;
            },
            getTabClass:function (good,top) {
              if(good || top){
                return 'put_top'
              }else{
                return ''
              }
            },
            getTime : function(value){
              let now=new  Date().getTime();
              let last=new Date(value).getTime();
              let diff=now-last;
              return   utils.getLastTimeStr(diff);

            }
        },
        mounted : function(){
      
          if(this.$route.query && this.$route.query.tab &&this.$route.query.index){
            this.params.tab=this.$route.query.tab;
            this.initIndex=this.$route.query.index;
          };
          this.getArtlist();

          //监听窗口滑动
          window.addEventListener('scroll',this.downScrollData);
        },
        methods : {
          //切换tab类型
          changeTab : function (index) {
            this.initIndex = index;
            this.artlists = [];
            this.params.tab = this.itemTabs[index].type;
            this.getArtlist();
          },
          //获取列表数据
          getArtlist : function(){
            this.isLoading=true;
            let reqParam = this.params;
            axios({
              method: 'get',
              url: 'https://cnodejs.org/api/v1/topics',
              params : reqParam,
            })
            .then((res) => {
                if(res.data.success){
                  this.isLoading=false;
                  this.scroll=true;
                  let d= res.data.data;
                  var self=this;
                  d.forEach(function (value) {

                    self.artlists.push(value);

                  })

                }
            })
            .catch((err) => {
               console.log(err);
            })
          },
          parseTime : function(diff){
              return  utils.getLastTimeStr(diff);
          },
          downScrollData: function () {
            if(this,scroll){
              var winH=document.documentElement.offsetHeight;
              var totalH=document.documentElement.clientHeight+document.body.scrollTop;
              if(totalH>=winH){//滑到最底部
                this.params.page+=1;
                this.scroll=false;
                this.getArtlist();
              }
            }
          }

        },
        watch:{
          '$route'(to,from){
            //当前页面跳转
       
           if(to.query && to.query.tab && to.query.index){
             this.params.tab=this.$route.query.tab;
             this.initIndex=this.$route.query.index;
           }
           this.artlists=[];
           this.params.page=1;
           this.getArtlist();
           this.$refs.head.show=false;
          }
        },
        components:{
           nv,
           loading
        }
    }


</script>
