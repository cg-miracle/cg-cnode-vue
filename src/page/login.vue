<template>
    <div id="login">
    <nv page-type="登录"
        :fix="false"
    ></nv>
    <section class="login-body">
       <input type="passsword" id="token-input"  v-model="token" placeholder="Acess Token">
       <a class="login-btn" @click="toLogin">登录</a>
    </section>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  
</style>
<script>
   import nv from '../components/header.vue'
   import axios from 'axios'
    export default{
        data(){
            return{
               token:''
            }
        },
        methods:{
            toLogin: function(){
                axios.post('https://cnodejs.org/api/v1/accesstoken',{
                    accesstoken:  this.token
                }).then((res)=>{
                    if(res.data.success){
                      let user={
                            loginname: res.data.loginname,
                            avatar: res.data.avatar_url,
                            userId: res.data.id,
                            token: this.token
                        }
                        /*用户信息本地存储*/
                      window.sessionStorage.user=JSON.stringify(user);
                      this.$store.commit('setUserInfo',user)
                      this.$router.push({
                         name:'artlist'
                      })

                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        components: {
            nv
        }
    }
</script>
