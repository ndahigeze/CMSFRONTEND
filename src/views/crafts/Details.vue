<template>
  <div>
     <div class="row">
         <div class="col-md-12">
              <Card>
                 <div class="row mt-2">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3">
                                <card>
                                    <img slot="image" class="card-img-top" :src="main_image_url" alt="Card image cap" height="300px">
                                </card>
                            </div>
                            <div class="col-md-9">
                                <Card>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h2>DETAILS</h2>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <table class="dtable">
                                                <tr>
                                                    <td class="td-header">
                                                        Name:
                                                    </td>
                                                    <td>
                                                        <strong>{{craft.name}}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="td-header">Status</td>
                                                    <td>
                                                        <strong>{{craft.status}}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="td-header">
                                                        Published :
                                                    </td>
                                                    <td>
                                                        <strong v-if="published">
                                                            <Badge type="primary">YES</Badge>
                                                        </strong>
                                                        <strong v-if="!published" class="text-warning">
                                                            <Badge type="danger">NO</Badge>
                                                        </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="td-header">
                                                        Sold
                                                    </td>
                                                    <td>
                                                        <strong>{{(craft.sold)? 'YES':'NO'}}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="th-header">
                                                        End of Subscription
                                                    </td>
                                                    <td>
                                                        <strong>{{craft.endOfSubscription}}</strong>
                                                    </td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div class="col-md-6">
                                            <table class="dtable">
                                                <tr>
                                                    <td class="td-header">Category</td>
                                                    <td>
                                                        <strong>{{craft.category}}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="td-header">Price</td>
                                                    <td>{{craft.price}} RWF</td>
                                                </tr>
                                                <tr>
                                                    <td class="td-header">
                                                        Paid Subscription :
                                                    </td>
                                                    <td>
                                                        <strong v-if="craft.paidSubscription">YES</strong>
                                                        <strong v-if="!craft.paidSubscription" class="text-warning">No</strong>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <strong>Description:</strong>
                                        </div>
                                        <div class="col-md-12">
                                            {{craft.comment}}
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-12">
                                            <Dropdown>
                                                <BButton slot="title-container" type="secondary" class="dropdown-toggle btn btn-sm btn-outline-primary">
                                                    Action
                                                </BButton>
                                                <a v-if="!craft.publish && userRole!='ADMIN'" class="dropdown-item" href="#" id="publish" @click="publish()">
                                                    <em class="fas fa-braille"></em>
                                                    Publish
                                                </a>
                                                <a v-if="craft.publish && userRole!='ADMIN'" class="dropdown-item" href="#" id="unpublish" @click="unpublish()">
                                                    <em class="fas fa-braille"></em>
                                                    Unpublish
                                                </a>
                                                <a v-if="userRole!='ADMIN'" class="dropdown-item" href="#" @click="paymentModal.show=true">
                                                    <em class="fas fa-ruble-sign"></em>
                                                    Pay subscription
                                                </a>
                                                <a v-if="userRole!='ADMIN'" class="dropdown-item" href="#" @click="galleryModal.show=true">
                                                    <em class="fas fa-upload"></em>
                                                    Upload Craft gallery
                                                </a>
                                                 <a class="dropdown-item text-danger" href="#" @click="deleteCraft">
                                                    <em class="fas fa-trash"></em>
                                                    Delete
                                                </a>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                       <div class="col-md-1" v-for="image in craft_images" :key="image.id" v-on:click="viewImage(image)">
                                           <img slot="image" class="avatar avatar-xl rounded-circle" :src="root_path+'/gallery/images/'+image.uuid" alt="Card image cap" height="100px">
                                       </div>
                                       <div class="col-md-1 mb-4" @click="viewImage('ORIGINAL')">
                                           <img slot="image" class="avatar avatar-xl rounded-circle" :src="root_path+'/crafts/profile/'+uuid" alt="Card image cap" height="200px">
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- <div class="row">
                  <div class="col-md-12">
                      <Card>
                         <div class="row">
                           <div class="col-md-12">
                             <Tabs tabNavClasses="nav-fill flex-column flex-sm-row nav-wrapper" tabContentClasses="card shadow">
                                <TabPane id="requests">
                                   <span slot="title">
                                     Requests
                                   </span>
                                   <div class="card-body description">

                                   </div>
                                </TabPane>
                             </Tabs>
                           </div>
                         </div>
                      </Card>
                  </div>
                 </div> -->
              </Card>
         </div>
     </div>
    


     <!-- payment modal -->
    <Modal :show.sync='paymentModal.show' modalClasses="modal-dialog-centered modal-dialog modal-lg ">
        <template slot="header">
            <div class="row">
                <div class="col-md-12">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Pay Subscription
                    </h5>
                </div>
            </div>
            <br>

        </template>
        <div class="row">
            <div class="col-md-12">
                <PaymentPage @reload="reload" :craft="craft.uuid" v-if="paymentModal.show"></PaymentPage>
            </div>
        </div>
    </Modal>

    <Modal :show.sync="galleryModal.show"  modalClasses="modal-dialog-centered modal-dialog modal-lg ">
      <template slot="header">
            <div class="row">
                <div class="col-md-12">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Save gallery pictures
                    </h5>
                </div>
            </div>
            <br>

        </template>
        <div class="row">
            <div class="col-md-12">
               <div class="row">
                 <div class="col-md-12">
                   <Card>
                        <div class="row">
                          
                            <div class="col-md-12">
                                <base-input name="Main picture" label="Craft picture">
                                    <input type="file" @change="onUploadFile($event)" multiple class="form-control form-control-alternative" name="mainPicture" />
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
        </div>
    </Modal>
    <!-- <Modal :show.sync="picturemodal.show"  modalClasses="modal-dialog-centered modal-dialog modal-lg ">
        <div class="row">

        </div>
    </Modal> -->
  </div>
</template>

<script>

import axios from "axios";
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
import Dropdown from "../../components/BaseDropdown"
import Tabs from "../../components/Tabs/Tabs"
import TabPane from "../../components/Tabs/Tab"
import datatable from "../../components/Datatables";
import Modal from "../../components/Modal";
import Badge from "../../components/Badge";
import PaymentPage from './payment_page'
export default {
  name:"CraftUserDetails",
  props:['uuid'],
  components:{
      Card,
      BButton,
      Dropdown,
       Tabs,
       TabPane,
       datatable,
       Modal,
       Badge,
        PaymentPage,
  },
  data(){
     return{
        craft:{},
        ownerUuid:"",
        comments:[],
        comment:"",
        published:true,
        paymentModal: {
                show: false,
        },
        galleryModal:{
           show:false,
        },
        file: [],
        invalidForm: "false",  
        craft_images:[], 
        main_image_url:"", 
        role:this.userRole
        
     }
  },
  computed: {
        root_path: function () {
            return this.$store.state.backend_url
        },
        userRole: function () {
          return this.$store.state.user.role.title
        }
    },
  methods:{
     
     
   

    viewArtifacts:function(){
       axios({
         methods:"GET",
         url:this.$store.state.backend_url+"/crafts/"+this.uuid,
       }).then(res=>{
           console.log(res)
          if(res.data.code==200){
            this.craft=res.data.data.craft;
            this.ownerUuid=this.craft.owner.uuid;
            this.main_image_url = this.$store.state.backend_url+'/crafts/profile/'+this.uuid
            this.viewImages()
            
            if(this.craft.publish && this.craft.paidSubscription){
              this.published=true;
            }else{
              this.published=false;
            }

            
          }
       })
     },
      publish: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/crafts/publish/publish/" + this.craft.uuid,
                headers: {
                    'username': this.$store.state.user.username
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.$alert.success("Craft is published successfuly")
                    var evt = {
                        'uuid': this.craft.uuid
                    }
                    this.viewArtifacts(evt)
                } else {
                    this.$alert.error(res.data.description);
                }
            })
        },

        unpublish: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/crafts/publish/unpublish/" + this.craft.uuid,
                headers: {
                    'username': this.$store.state.user.username
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.$alert.success("Craft is unpublished successfuly")
                    var evt = {
                        'uuid': this.craft.uuid
                    }
                    this.viewArtifacts(evt)
                } else {
                    this.$alert.error(res.data.description);
                }
            })
        },
         reload: function () {
            this.paymentModal.show = false
            this.viewArtifacts()
            // var evt = {
            //     'uuid': this.craft.uuid
            // }
            // this.viewDetails(evt)

        },
        onUploadFile: function (evt) {
        
           for (let i = 0; i < evt.target.files.length; i++) {
             this.file.push(evt.target.files[i])  
           }   
        },

        submit: function () {
          // console.log(this.file.length)
            if (this.file.length == 0) {
                this.invalidForm = true;
            }  else {
                this.invalidForm = false
            }
            if (!this.invalidForm) {
                let formData = new FormData();
                this.file.forEach(el => {
                  formData.append('file', el)
                });
                
                axios({
                    method: "POST",
                    url: this.$store.state.backend_url + "/gallery/create/crafts/"+this.uuid,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'username': this.$store.state.user.username
                    }
                }).then(res => {

                    if (res.data.code == 200) {
                       
                        this.file = [];
                       this.$alert.success(res.data.description)
                        this.galleryModal.show=false;
                        this.viewImages()
                    } else {
                        this.$alert.error(res.data.description)
                    }

                }).catch(res => {
                    this.$alert.error("error occured try again later")
                })
            } else {
                this.$alert.error("Please choose at least one picture to submitt the")
            }

        },
        viewImages:function(){
              axios({
                methods:"GET",
                url:this.$store.state.backend_url+"/gallery/crafts/"+this.uuid,
              }).then(res=>{
                  if(res.data.code==200){
                    
                    this.craft_images=res.data.data.pictures;
                    console.log(res.data.data)
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
      
     },
     deleteCraft:function(){
         var localObject=this;
        this.$alert.promptDelete("data",function(){
            axios({
                methods:"PUT",
                url:localObject.$store.state.backend_url+"/crafts/delete/"+localObject.craft.uuid,
              }).then(res=>{
                  if(res.data.code==200){
                    if(localObject.role="ADMIN"){ 
                        localObject.$router.push({ name: 'ALL CRAFTS'})
                    }else{
                     localObject.$router.push({ name: 'crafts'})
                    }
                    localObject.$alert.success(res.data.description)
                  }else{
                       localObject.$alert.error(res.data.description)
                  }
              })
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
.dtable {
  width: 80%;
  background-color: transparent;
  text-align: left;
  /* padding-bottom: 20px; */
}

.dtable td {
  padding-top: 1rem;
  padding-bottom: 0px;
  padding-right: 0px;
}

.dtable .td-header {
  width: 50%;
}

.dtableAccount {
  width: 100%;
  background-color: transparent;
  text-align: left;
}
.dtableAccount td {
  padding-top: 1rem;
  padding-bottom: 0px;
  padding-right: 0px;
}
.dtableAccount .td-header {
  width: 35%;
}
</style>