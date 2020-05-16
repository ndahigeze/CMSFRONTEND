import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios';
import {router} from '../routes/router';
import createPersistedState from 'vuex-persistedstate'

import {
  alert
} from "../util/alertUtils";
Vue.use(Vuex)

 export const store = new Vuex.Store({
   plugins: [createPersistedState({
     storage: window.sessionStorage,
   })],
  state: {
    user: {},
    backend_url:"http://localhost:8081",
    isLoggedIn:false
  },
  mutations: {
    setUser:(state,user) => {
      state.user=user
    },
    setIsLoggedIn: (state,value) =>{
      state.isLoggedIn=value;
    }
  },
  getters:{

  },
  actions:{
    refreshToken:(context)=>{
      axios({
        method:"GET",
        url:context.state.backend_url+"/users/username/"+context.state.user.username
      }).then(res=>{
       
            context.commit("setUser", res.data.data)
            context.commit("setIsLoggedIn", true)
      })
    },
    login: (context,logindata) => {
      // console.log(logindata)
       axios({
         method:"PUT",
         data:logindata,
         url:context.state.backend_url+"/users/login",

       }).then(res=>{
        //  console.log(res)
         if(res.data.code==200){
            context.commit("setUser",res.data.data)
            context.commit("setIsLoggedIn",true)
            if(res.data.data.role.title=="ARTIST"){
                  router.push("ArtistDashboard")
            }else{
                 router.push("CustomDashboard")
            }
         }else{
            alert.error("Wrong credentials");
         }
       })
    }
  }
})