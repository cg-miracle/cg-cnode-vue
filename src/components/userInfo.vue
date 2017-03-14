<template>
    <div id="login-info">
    <div class="user-info" v-if="!info.loginname"   @click="goLogin"><div class="login-content">登录</div></div>
        <div v-if="info.loginname" class="logined" @click="goMe">
            <img :src="info.avatar" alt="头像" class="avatar">
            <div class="name"> 
               <p>{{info.loginname}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    @import '../style/app.scss';
    $avatarW: 40px;
    $userFontS: 13px;

     #login-info{
        padding: 15px;
        .login-content{
            margin: 5px;
        }

            /*成功登录*/
            .logined{
                .avatar{
                    width: $avatarW;
                    height: $avatarW;
                    margin-right: 10px;
                    vertical-align: middle;
                    @include radius(50%);
                }
                .name{
                    display: inline-block;
                    height: $avatarW;
                    line-height: $avatarW;
                }
            }
    }

</style>
<script>
import {mapGetters} from 'vuex'; 
    export default{
        data(){
            return{
        
            }
        },
        computed: {
            ...mapGetters({
                info:'getUserInfo'
            })
        },
        methods:{
            goLogin: function(){//跳转到登陆页
                this.$router.push({
                    name:'login'
                })
            },
            goMe: function(){//跳转到个人信息页
                   this.$router.push({
                    name:'userInfo',
                    params: {name: this.info.loginname}
                })
            }
        }
    }
</script>
