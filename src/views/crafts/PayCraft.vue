<template>
  <div>
           <div class="row" v-if="waiting">
              <div class="col-md-4 offset-3">
                  <h2 class=" text-info ">Loading...</h2>
              </div>
          </div>
          <div class="row" v-if="!show_payment">
              <div class="col-md-8 offset-2">
                       <BButton @click="requestToken()">Load payment form</BButton>
              </div>
          </div>
         
          <div class="row" v-if="show_payment">
                  <div id="dropin-container" class="col-md-12 d-flex justify-content-center">
                     
                  </div>
                  <div class="col-md-12 d-flex justify-content-center">
                    <button id="submit-button" class="btn btn-primary" >Submit</button>
                  </div>
                  
           </div>
  </div>
</template>

<script>
import axios from "axios";
import VueBraintre from 'braintree-web'
import Dropin from 'braintree-web-drop-in'
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
export default {
     props:['craft'],
   components:{
       Card,
       BButton,
      
   },
   data(){
       return{
         show_payment:false,
         token:{},
         waiting:false,
       }
   },
   methods:{
     loadDroping:function(){

          
           
            var craft=this.craft;
            var clientEmail= this.$store.state.user.email
            var userUuid=this.$store.state.user.uuid;
            var backend_url=this.$store.state.backend_url
            var alert=this.$alert
            var amount=this.payment_amount
           
            
             Dropin.create({
               
                authorization: this.token,
                container: '#dropin-container'
             },function(createErr, instance){
                 document.querySelector('#submit-button').addEventListener('click', function () {
                    instance.requestPaymentMethod(function(err,payload){
                      
                      
                     var nonce = {
                                    "nonce": payload.nonce,
                                    "cardType": payload.type,
                                    "lastFour": payload.details.lastFour,
                                    "lastTwo": payload.lastTwo,
                                    "bin": payload.details.bin,
                                    "propertyUuid":craft,
                                    "cardetailType": payload.details.cardType,
                                    "clientEmail":clientEmail,
                                    "userUuid":userUuid,
                                    "amount":amount
                                   
                                }

                                // Write request to submit payment
                                //console.log(nonce)
                                axios({
                                  method:'POST',
                                  url:backend_url+"/crafts/paycraft",
                                  data:nonce
                                }).then(res=>{
                                  console.log(res)
                                  if(res.data.code==200){
                                         alert.success(res.data.description)
                                         this.$emit('reload')
                                        
                                  }else{
                                       alert.error(res.data.description)
                                  }
                                })
                    })
                 })
                  
             })
             this.waiting=false;
       },
    requestToken:function(){
        this.waiting=true;
         
      axios({
         method:"GET",
         url:this.$store.state.backend_url+"/crafts/client_token",
       }).then(res=>{
           
          if(res.data.code==200){
               this.show_payment=true;
               this.token=res.data.data
               this.loadDroping()
          }
       })
      }
   },   
}
  
</script>

<style>

</style>