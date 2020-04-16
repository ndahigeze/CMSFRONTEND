import Vuex from 'vuex'
import Vue from 'vue'

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
    login:(username,password)=>{
      
    }
  }
})