<template>
  <div>
     <div class="row">
         <div class="col-md-3 offset-4 mt-8">
           <Card>
               <div class="row">
                 <div class="col-md-12 d-flex justify-content-center">
                   <h1> LOGIN</h1> 
                 </div>
               </div>
               <div class="row">
                 <div class="col-md-12">
                     <form>
                        <BaseInput :alternative="true" label="Username" v-model="loginData.username" :value="loginData.username" type="text" placeholder="Username"/>
                        <BaseInput :alternative="true" label="Password" v-model="loginData.password" :value="loginData.password" type="password" placeholder="password"/>
                        <BButton block type="default" @click="login()">Login</BButton>
                     </form>
                 </div>
               </div>
           </Card>
         </div>
     </div>
  </div>
</template>

<script>

import axios from "axios";
import Card from "../../components/Cards/Card";
import BButton from "../../components/BaseButton";
import BaseInput from "../../components/Inputs/BaseInput";
export default {
   name:"login",
   components:{
        Card,
        BButton,
        BaseInput
   },
   data(){
       return{
          loginData:{
              username:"",
              password:""
          }
       }
   },
   methods:{
      
       login:function(){
       var test= this.$store.dispatch("login",this.loginData)
        
       }
   }
}
</script>

<style>

</style>