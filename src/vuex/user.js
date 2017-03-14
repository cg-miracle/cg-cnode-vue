import Vue from 'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

//全局用户属性
const userStore=new Vuex.Store({
      state: {
          userInfo: {}
      },
      getters: {
          getUserInfo: (state)=>{
              return state.userInfo

          }
      },
      mutations: {
           setUserInfo: (state,user)=>{
              state.userInfo=user
          }
      }


})

export default userStore;