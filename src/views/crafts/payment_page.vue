<template>
  <div>
      <div id="testDropin">
          
          <div id="dropin-container"></div>
          <button id="submit-button" class="btn btn-primary">Submit</button>
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
   components:{
       Card,
       BButton,
      
   },
   data(){
     return{
       token:'',
       instance:null
     }
   },
   methods:{
       loadDroping:function(){
            var button = document.querySelector('#submit-button');
             Dropin.create({
                authorization: this.token,
                container: '#dropin-container'
             },function(createErr, instance){
                 button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function(err,payload){
                      console.log(payload)
                     var nonce = {
                                    "clientNonce": payload.nonce,
                                    "cardType": payload.type,
                                    "lastFour": payload.details.lastFour,
                                    "lastTwo": payload.lastTwo,
                                    "bin": payload.details.bin,
                                    "amount": payAmount,
                                    "cardType": payload.details.cardType,
                                    "clientEmail": $("#email").val(),
                                    "clientPhone": $("#phone").val(),
                                    "clientName": $("#username").val()
                                }

                                // Write request to submit payment
                    })
                 })
                  
             })
       },
     
     
     requestToken:function(){
         
      axios({
         methods:"GET",
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