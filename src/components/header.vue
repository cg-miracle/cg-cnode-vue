<template>
  <div>
    <div class="mask"
         v-if="show&&fix"
         @click="showMenu"></div>
    <header id="header" :class="{'fixed':fix,'no-fixed':!fix}">
      <div class="navbar clearfix" :class="{'show':show}">
        <div class="hamburg-btn"
         v-if="fix"
         @click="openMenu"></div>
        <h1 class="title" v-text="pageType"></h1>
      </div>
    </header>
    <slideMenu
    :show-menu="show"></slideMenu>
  </div>
</template>

<script>
  import slideMenu from './menu.vue'

  export default{
    data(){
      return {
        show:false
      }
    },
    props:{
      pageType:String,
      fix:Boolean

    },
    methods: {
      openMenu:function () {
        let h = document.getElementsByTagName('html')[0],
            b = document.getElementsByTagName('body')[0];
        this.show = !this.show;
        //使页面不滚动

          h.className = 'scrollHide';
          b.className = 'scrollHide';

      },
      showMenu:function(){
        this.show = !this.show;
        let h = document.getElementsByTagName('html')[0],
            b = document.getElementsByTagName('body')[0];
            h.className = '';
            b.className = '';
      }
    },
    components: {
      slideMenu
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  $height:50px;
  $btnwidth:25px;

    //遮罩层
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 22;
    background-color: rgba(0,0,0,.4);
  }
#header{
     width: 100%;
     &.fixed{
      position: fixed;
      top: 0;
     }
   .scrollHide{
    height: 100%;
    overflow: hidden;
  }
  //导航条
  .navbar{
    z-index: 20;
    height: $height;
    line-height: $height;
    background-color: #fff;
    color: #80bd01;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    text-align: center;
    transition: all .3s ease;

      &.show{
        transform: translateX(200px);
      }
      .title{
        font-size: 20px;
      }
      .hamburg-btn{
        width:  $btnwidth;
        height: $btnwidth;
        background-image: url("../assets/btn.png");
        background-size: $btnwidth ;
        position: fixed;
        top:11px;
        left: 10px;
        background-repeat: no-repeat;
      }
  } 
}
 
</style>
