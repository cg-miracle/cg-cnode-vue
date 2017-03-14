<template>
   <section id="slideMenu"  :class="{show:showMenu}">
       <user-info></user-info>
     <div class="nav-list">
       <router-link class="item" :to="{name:'list',query:{tab:'all',index:0}}">全部</router-link>
       <router-link class="item" :to="{name:'list',query:{tab:'good',index:1}}">精华</router-link>
       <router-link class="item" :to="{name:'list',query:{tab:'share',index:2}}">分享</router-link>
       <router-link class="item" :to="{name:'list',query:{tab:'ask',index:3}}">问答</router-link>
       <router-link class="item" :to="{name:'list',query:{tab:'job',index:4}}">招聘</router-link>
     </div>
     <div class="menu-footer"><img class="git-img"  src="../assets/github.png"><a href="http://www.baidu.com">miracle</a></div>
   </section>
</template>

<script>
 import userInfo from './userInfo'

  export default{
    data(){
      return {

      }
    },
    props: {
      showMenu: Boolean,
    },
    methods: {

    },
    components:{
      userInfo
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  $menuWidth : 200px;

  #slideMenu{
    position: fixed;
    top: 0;
    bottom: 0;
    left: -200px;
    width: $menuWidth;
    background-color: #fff;
    z-index: 99;
    transition: all .3s ease;
    text-align: center;

     &.show{
       transform: translateX(200px);
     }

    /*菜单列表*/
    .nav-list{
      margin-left: 15px;
      margin-right: 15px;
      padding-top: 20px;
      border-top: 1px solid #d4d4d4;
        .item{
          display: block;
          padding: 9px 0;
        }
    }

    /*菜单底部*/
    .menu-footer{
      border-top: 1px solid #d4d4d4;
      padding-top: 10px;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: initial;
    }
    .git-img{
      width: 50px;
      height: 50px;
    }
  }
</style>
