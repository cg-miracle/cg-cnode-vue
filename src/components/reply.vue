<template>
    <section id="reply">
    <h1 class="title">评论</h1>
        <div class="user-info">
           <img :src="info.avatar" alt="头像">
           <span class="name">{{info.loginname}}</span>
        </div>
        <div class="comment-body clearfix">
           <textarea id="content"
                      v-model="content"
                      row="8"
                      placeholder='回复支持Markdown语法'
           ></textarea>
           <a class='btn' @click="submitReply">提交</a>
        </div>
    </section>
</template>
<style lang="scss" rel="stylesheet/scss">
    @import '../style/app.scss';
    $avatarW: 30px;
    $textareaH: 200px; 
    $topicColor: #80bd01;
    #reply{
        margin－top: 20px;
        padding: 10px;
        .title{
            font-size: 20px;
            font-weight: bold;
        }
        .user-info{
            border-top: 1px solid #ececec;
            padding: 8px 0;
            img{
                width:  $avatarW;
                height: $avatarW;
                vertical-align: middle;
                @include radius(50%)
            }
            .name{
                display: inline-block;
                line-height: $avatarW;
                height: $avatarW;
                margin－left: 10px;
            }
        }
        .comment-body{
            #content{
                 width: 100%;
                 height: $textareaH;
                 border: 1px solid #ececec;
                 &:focus{
                     outline-color: $topicColor;
                 }
            }
            .btn{
                float: right;
                margin－top: 10px;
                padding: 5px 10px;
                color: #fff;
                background-color: $topicColor;
                @include radius(4px)
            }
        }
       
    }
    

</style>
<script>
import {mapGetters} from 'vuex'; 
    export default{
        data(){
            return{
                content: ''
            }
        },
        props:['articleId'],
        computed: {
            ...mapGetters({
                info:'getUserInfo'
            })
        },
        methods:{
            submitReply: function(){//提交评论
                axios.post('/topic/'+this.articleId+'/replies',{
                    accesstoken: info.token,
                    content: this.content
                })
                    .then(res=>{
                        if(res.data.success){
                            
                        console.log('评论成功');
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        }
    }
</script>
