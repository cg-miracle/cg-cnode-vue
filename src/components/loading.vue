<template>
  <div id="loading">
    <div class="load-inner">
      (´・ω・`)正在加载中。。。
      <PulseLoader class="pulseLoader"></PulseLoader>
    </div>
  </div>
</template>

<script>
  import  PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {

  data () {
    return {

    }
  },
  components:{
    PulseLoader
  }
}
</script>


<style scoped style="scss" rel="stylesheet/scss">
    #loading{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 50px;
      background-color: #f0f2f4;
      text-align: center;
      z-index: 99;
     }
    .load-inner{
      width: 100%;
      min-height: 70px;
      position: fixed;
      top:50%;;
      margin-top: -35px;

    }
    .pulseLoader{
      margin-top: 15px;
    }
</style>
