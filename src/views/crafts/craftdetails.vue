<template>
  <div>
     <div class="row">
       <div class="col-md-6">
          
       </div>
       <div class="col-md-6">
         <Card>
             <div class="row">
                 <div class="col-md-12">
                     <strong>
                        <i class="fas fa-arrow-left"></i>
                        <span> Back to crafts list</span>
                     </strong> 
                 </div>
             </div>
             <div class="row mt-4">
                 <div class="col-md-12">
                   <h2>{{craft.name}} {{craft.category}}</h2>
                 </div>
             </div>
             <div class="row">
                 <div class="col-md-12">
                     <div class="row">
                         <div class="col md-12">
                             <h3>
                                 Description
                             </h3>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-12">
                             {{craft.comment}}
                         </div>
                     </div>
                 </div>
             </div>
             <div class="row">
                <div class="col-md-12">
                    <h3 class="d-flex justify-content-end">{{craft.price}} RWF</h3>
                </div>
             </div>
             <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Artist</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col md-6">
                            <Card>
                                <img slot="image" class="card-img-top" :src="'http://localhost:8081/users/profile/'+ownerUuid" alt="Card image cap" height="200px" />
                            </Card>
                        </div>
                        <div class="col md-6">
                            <Card>
                                <div class="row mb-2">{{craft.owner? craft.owner.name:"" }}</div>
                                <div class="row mb-2">{{craft.owner? craft.owner.email:"" }}</div>
                                <div class="row mb-2" >{{craft.owner? craft.owner.phone:"" }}</div>
                                <div class="row mb-2">{{craft.owner? craft.owner.adress:"" }}</div>
                               
                            </Card>
                        </div>
                    </div>
                </div>
             </div>
             <div class="row">
                 
                 <div class="col-md-12">
                     <div class="row">
                         <div class="col-md-12">
                             <h4>Comment</h4>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-12">
                           <textarea v-model="comment" class="form-control customstyle" rows="2"></textarea>
                           <div class="d-flex justify-content-end">
                             <BButton   size="sm" @click="submit()">Submit</BButton>
                           </div> 
                         </div>
                     </div>
                     <div class="row">
                       <div class="col-md-12 mb-3" v-for="comment in comments" v-bind:key="comment.id">
                       
                            <div class="col-md-12 text-primary">
                               {{comment.commentator.name}}
                            </div>
                            <div class="col-md-12">
                               {{comment.comment}}
                            </div>
                        
                       </div>
                     </div>
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
export default {
  name:"Craftdetails",
  props:['uuid'],
  components:{
      Card,
      BButton,
  },
  data(){
     return{
        craft:{},
        ownerUuid:"",
        comments:[],
        comment:"",
        
     }
  },
  methods:{
     
     
    submit:function(){
        var commentData={
          userUuid:"27f45793-56f0-4ad0-870c-1ac4ace1da09",
          craftUuid:this.uuid ,
          comment:this.comment
        }
     axios({
         method:"POST",
         url:this.$store.state.backend_url+"/comments/create",
         data:commentData
     }).then(res=>{
        this.viewComment();
     })
    },

    viewComment:function(){
      axios({
          method:"GET",
          url:this.$store.state.backend_url+"/comments/"+this.uuid
      }).then(res=>{
          if(res.data.code==200){
              this.comments=res.data.data.comments
              console.log(res)
          }
      })
    },

    viewArtifacts:function(){
       axios({
         methods:"GET",
         url:this.$store.state.backend_url+"/crafts/"+this.uuid,
       }).then(res=>{
           
          if(res.data.code==200){
            this.craft=res.data.data.craft;
            this.ownerUuid=this.craft.owner.uuid;
            // console.log(res)
            this.viewComment()
          }
       })
     },
  },

  created(){
    this.viewArtifacts()
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