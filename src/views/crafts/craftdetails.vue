<template>
  <div>
    <div class="row mt-5"></div>
     <div class="row mt-5 ml-5">
       <div class="col-md-5">
          <Card>
              <div class=row>
                  <div class="col-md-12">
                                <img slot="image" class="card-img-top" :src="main_image_url" alt="Card image cap" height="450px">
                  </div>
                  <div class="col-md-12 mt-4">
                     <div class="row">
                        <div class="col-md-2 mb-4" v-for="image in craft_images" :key="image.id" v-on:click="viewImage(image)">
                           <img slot="image" class="avatar avatar-xl rounded-circle" :src="backend_url+'/gallery/images/'+image.uuid" alt="Card image cap" height="200px">
                        </div>
                        <div class="col-md-12 mb-4" @click="viewImage('ORIGINAL')">
                           <img slot="image" class="avatar avatar-xl rounded-circle" :src="backend_url+'/crafts/profile/'+craft.uuid" alt="Card image cap" height="200px">
                        </div>
                     </div>
                  </div>
              </div>
          </Card>
       </div>
       <div class="col-md-6">
         <Card>
             <div class="row">
                 <div class="col-md-12">
                     <strong>
                        <a href="#!" @click="$router.push('/home')">
                            <em class="fas fa-arrow-left"></em>
                            <span> Back to crafts list</span>
                        </a>
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
                     <Card>
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
                                <div class="col-md-12">
                                    <h3 class="d-flex justify-content-end">{{craft.price}} RWF</h3>
                                </div>
                            </div>
                            
                     </Card>
                    
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
                                <div class="row mb-2"><span><strong>Name:   </strong> </span>{{craft.owner? craft.owner.name:"" }}</div>
                                <div class="row mb-2"><span><strong>Email:</strong> </span>{{craft.owner? craft.owner.email:"" }}</div>
                                <div class="row mb-2" ><span><strong>Phone:</strong> </span>{{craft.owner? craft.owner.phone:"" }}</div>
                                <div class="row mb-2"><span><strong>Address:</strong></span>{{craft.owner? craft.owner.adress:"" }}</div>
                            </Card>
                        </div>
                    </div>
                </div>
             </div>
             <div class="row">
                 <div class="col-md-12">
                     <div v-if="isLoggedIn">
                        <BButton v-if="user.email!= owner.email" @click="newOrdermodal.show=true">Send craft request</BButton>
                        <BButton v-if="user.email!= owner.email && !craft.sold" @click="payModal.show=true">Buy this craft</BButton>
                     </div>
                 </div>
             </div>
         </Card>
       </div>
     </div>

         
         <!-- payment modal -->
       <Modal :show.sync='newOrdermodal.show' modalClasses="modal-dialog-centered modal-dialog modal-lg ">
           <template slot="header">
                 <div class="row">
                   <div class="col-md-12">
                     <h5 class="modal-title" id="exampleModalLabel">
                          Send craft order
                     </h5>
                   </div> 
                 </div>
                <br>
                
            </template>
            <div class="row">
               <div class="col-md-12">
                 <NewOrder @reload="reload" :uuid="craft.uuid" v-if="newOrdermodal.show"></NewOrder>
               </div>
            </div>
       </Modal>


       <!-- For buying this craft -->
       <Modal :show.sync='payModal.show' modalClasses="modal-dialog-centered modal-dialog modal-sm ">
           <template slot="header">
                 <div class="row">
                   <div class="col-md-12 " style="diplay:flex; justify-content: center;" >
                     <h2 class="modal-title"  id="exampleModalLabel">
                          BUY THIS CRAFT 
                     </h2>
                   </div> 
                 </div>
            </template>
            <div class="row">
               <div class="col-md-12">
                 <PayCraft @reload="reload" :craft="craft.uuid" v-if="payModal.show"></PayCraft>
               </div>
            </div>
       </Modal>

       


  </div>
</template>

<script>

import axios from "axios";
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
import NewOrder from "./NewOrder"
import Modal from "../../components/Modal"
import PayCraft from "./PayCraft"
export default {
  name:"Craftdetails",
  props:['uuid'],
  components:{
      Card,
      BButton,
      NewOrder,
      Modal,
      PayCraft
  },
  data(){
     return{
        craft:{},
        ownerUuid:"",
        owner:{},
        comments:[],
        comment:"",
          
        //   Create order modal data
        newOrdermodal:{
          show:false,
        },
        payModal:{
            show:false,
        },
        craft_images:[],
        main_image_url:"", 

        
     }
  },
  computed:{
     isLoggedIn:function(){
         return this.$store.state.isLoggedIn
     },
     user: function(){
         
         return this.$store.state.user
     },
     backend_url:function(){
       return this.$store.state.backend_url
     }
  },
  methods:{
     
     reload:function(){
         this.newOrdermodal.show=false;
         this.payModal.show=false;
         this.viewArtifacts();
     },
     triggernewRequest:function(){
        this.newOrdermodal=this.newOrdermodal.show?false:true
     },
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
            //   console.log(res)
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
            this.owner=this.craft.owner
            this.ownerUuid=this.craft.owner.uuid;
            this.main_image_url=this.$store.state.backend_url+'/crafts/profile/'+this.uuid
            // console.log(res)
            this.viewImages()
            this.viewComment()

          }
       })
     },

      viewImages:function(){
              axios({
                methods:"GET",
                url:this.$store.state.backend_url+"/gallery/crafts/"+this.uuid,
              }).then(res=>{
                  if(res.data.code==200){
                    this.craft_images=res.data.data.pictures;
                    // console.log(res.data.data)
                  }
              })
     },
     viewImage:function(evt){
       console.log(evt)
       if(evt==="ORIGINAL"){
        this.main_image_url=this.$store.state.backend_url+'/crafts/profile/'+this.craft.uuid
       }else{
          this.main_image_url=this.$store.state.backend_url+"/gallery/images/"+evt.uuid;
       }
      
     }
  },

  created(){
    this.viewArtifacts()
  },
  
  
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