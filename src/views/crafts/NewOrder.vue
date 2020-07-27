<template>
  <div>
     <div class="row">
       <div class="col-md-12">
          <Card>
             <div class="row">
               
              
               <div class="col-md-12">
                  <base-input label="Request type">
                    <label for="yes">This craft</label>
                    <input type="radio" v-model="order.newCraft" value="False" name="orderNew" id="yes" style="margin:12px;width:25px" >
                    <label for="no">New craft</label>
                    <input type="radio" v-model="order.newCraft" value="True" name="orderNew" id="no" style="margin:12px;width:25px">
                  </base-input>
               </div>
              
               <div class="col-md-12" v-if="order.newCraft=='True'">
                 <base-input name="Main picture" label="Picture of desired craft if available">
                  <input type="file" @change="onUploadFile($event)"  class="form-control form-control-alternative" name="mainPicture"/>
                 </base-input>
               </div>
                <div class="col-md-12">
                 <base-input label="Description of desired craft" name="Description">
                    <textarea v-model="order.comment" required class="form-control form-control-alternative" id="Description" rows="3"></textarea>
                 </base-input>
               </div>
               
             </div>
             <div class="row">
                <div class="col-md-12">
                   <base-button type="primary" @click="submit()">Submit</base-button>
                </div>
             </div>
         </Card>
       </div>
     </div>
  </div>
</template>

<script>

import axios from "axios";
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
import BaseInput from "../../components/Inputs/BaseInput";
export default {
  name:"NewOrder",
  props:['uuid'],
  components:{
      Card,
      BButton,
      BaseInput,
  },
  data(){
     return{
        
       invalidForm:"false",
       file:[],
       order:{
           "comment":"",
           "craftUuid":this.uuid,
           "userUuid":this.$store.state.user.uuid,
           "newCraft":"False"
       } 
        
     }
  },
  methods:{
     
     onUploadFile:function(evt){
     
       this.file.push(evt.target.files[0]);
     },
    submit:function(){
        if(this.order.comment.length!=0){
          this.invalidForm=false
        }else{
          this.invalidForm=true
        }
        if(!this.invalidForm){
          let formData=new FormData();
         
          formData.append('comment',this.order.comment)
          formData.append('userUuid',this.order.userUuid)
          formData.append('craftUuid',this.order.craftUuid)
          formData.append('file',this.file[0])
          formData.append("newCraft",this.order.newCraft)
         
          axios({
              method:"POST",
              url:this.$store.state.backend_url+"/orders/create",
              data:formData,
              headers:{
                      'Content-Type': 'multipart/form-data',
                      'username':this.$store.state.user.username
                }
          }).then(res=>{
            
            if(res.data.code==200){
                this.$alert.success(res.data.description)
               this.$emit("reload")
            }else{
               this.$alert.error(res.data.description)
            }
              this.invalidForm=false
          }).catch(res=>{
             this.$alert.error("error occured try again later")
             this.invalidForm=false
          })
        }else{
           this.$alert.error("Form is invalid")
        }
   
    },



   
  },

  created(){
    
  }
  
}
</script>

<style>
.ownerdetails{
    list-style: none;
}
.customstyle{
    border-top: 0;
    border-right: 0;
    border-left:0;
}
</style>