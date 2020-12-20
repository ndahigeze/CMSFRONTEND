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
    backend_url:"http://localhost:8082",
    isLoggedIn:false,

  },
  mutations: {
    setUser:(state,user) => {
      state.user=user
    },
    setIsLoggedIn: (state,value) =>{
      state.isLoggedIn=value;
    },
   
  },
  getters:{

  },
  actions:{
    refreshToken:(context)=>{
      axios({
        method:"PUT",
        url:context.state.backend_url+"/users/username/"+context.state.user.username
      }).then(res=>{
          if(res.data.code==200){
             context.commit("setUser", res.data.data)
             context.commit("setIsLoggedIn", true)
          }else{
             context.commit("setIsLoggedIn", false)
          }

           
      })
    },
    login: (context,logindata) => {
    
       axios({
         method:"PUT",
         data:logindata,
         url:context.state.backend_url+"/users/login",

       }).then(res=>{
        //  console.log(res)
          // console.log(logindata)
         if(res.data.code==200){
            context.commit("setUser",res.data.data)
            context.commit("setIsLoggedIn",true)
            if(res.data.data.role.title=="ARTIST"){
                  router.push("ArtistDashboard")
            }else if(res.data.data.role.title=="ADMIN"){
                 router.push("AdminDashboard")
            }else{
              router.push("/home")
            }
         }else{
            context.commit("setIsLoggedIn", false)
            alert.error("Wrong credentials");
         }
       }).catch(res=>{
         console.log(res)
         alert.error("Wrong credentials");
       })
    },
    logout: context => {
      localStorage.clear();
      // this.$router.push({ name: 'craftdetails', params: { uuid: evt.uuid } })
      router.push({ name: '/home'});
      context.commit('setUser', {});
      context.commit('setIsLoggedIn', false);
      
    },
  }
})