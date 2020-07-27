<template>
  <div>
      <div id="testDropin">
          
         
           <div class="row" v-if="show_category">
              <div class="col-md-4">
                  <card >
                    <div class="row">
                      <div class="col-md-12"><h3>Lower Price</h3><hr/></div>
                      <div class="col-md-12">
                         1 MONTH SUBSCRIPTION
                      </div>
                      <div class="col-md-12 mt-2">
                          <h2>RWF 1000</h2>
                      </div>
                       <div class="col-md-12">
                        <button class="btn btn-block btn-primary"  @click="pickSubscription" :data-price="1000">Pay</button>
                      </div>
                    </div>
                  </card>
              </div>
              <div class="col-md-4">
                 <card>
                   <div class="row">
                     <div class="col-md-12"><h3>STANDARD PRICE</h3><hr/></div>
                     <div class="col-md-12">
                         2 MONTH SUBSCRIPTION
                     </div>
                     <div class="col-md-12 mt-2">
                          <h2>RWF 2000</h2>
                      </div>
                      <div class="col-md-12">
                        <button class="btn btn-block btn-primary"  @click="pickSubscription" :data-price="2000">Pay</button>
                      </div>
                   </div>
                 </card>
              </div>
              <div class="col-md-4">
                 <card>
                   <div class="row">
                      <div class="col-md-12"><h3 class="label label-primary">HIGHER PRICE</h3><hr/></div>
                       <div class="col-md-12">
                          3 MONTH SUBSCRIPTION
                       </div>
                       <div class="col-md-12 mt-2">
                          <h2>RWF 3000</h2>
                       </div>
                       <div class="col-md-12">
                        <button class="btn btn-block btn-primary" @click="pickSubscription" :data-price="3000">Pay</button>
                       </div>
                   </div>
                 </card>
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
       token:'',
       instance:null,
       show_category:true,
       show_payment:false,
       payment_amount:0,
       waiting:true,

     }
   },
   methods:{
      
       pickSubscription:function(e){
            console.log(e.target.dataset.price)
            this.payment_amount=e.target.dataset.price;
            this.show_category=false
            this.show_payment=true
            this.loadDroping()
       },
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
                                  url:backend_url+"/crafts/paysubcription",
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
       },
     
     
     requestToken:function(){
         
      axios({
         method:"GET",
         url:this.$store.state.backend_url+"/crafts/client_token",
       }).then(res=>{
           
          if(res.data.code==200){
           this.token=res.data.data
            this.loadDroping()
          }
       })
      }
   },
   created(){
       this.requestToken()
       
   }
}
</script>

<style>

</style>