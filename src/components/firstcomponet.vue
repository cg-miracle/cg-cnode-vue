<template>
 <div id="firstcomponent">
    <h1>我是第一个子页面.</h1>
    <a> written by {{ author }} </a>
 </div>
</template>

<script>
 export default{
 data(){
   return {
     author:"微信 Miracle"
   }
   }
 }
</script>
