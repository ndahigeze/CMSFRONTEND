import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios';
import {
  alert
} from "../util/alertUtils";
Vue.use(Vuex)

 export const store = new Vuex.Store({
  state: {
    user: {},
    backend_url:"http://localhost:8081"
  },
  mutations: {
    setUser:(state,user) => {
      state.user=user
    }
  },
  getters:{

  },
  actions:{
    login: (context,logindata) => {
      console.log(logindata)
       axios({
         method:"PUT",
         data:logindata,
         url:context.state.backend_url+"/users/login",

       }).then(res=>{
         console.log(res)
         if(res.data.code==200){
            context.commit("setUser",res.data.data)
         }else{
            alert.error("Wrong credentials");
         }
       })
    }
  }
})