<template>
  <div>
     <div class="row">
         <div class="col-md-12">
              <Card>
                 <div class="row">
                     <div class="col-md-3">
                          <card>
                            <img slot="image" class="card-img-top" :src="'http://localhost:8081/crafts/profile/'+uuid" alt="Card image cap" height="300px">
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
                                                <strong v-if="published">YES</strong>
                                                <strong v-if="!published" class="text-warning">No</strong>
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
                                       <Base-button slot="title-container" type="secondary" class="dropdown-toggle btn btn-sm btn-outline-primary">
                                         Action
                                       </Base-button>
                                       <a class="dropdown-item" href="#">
                                         <i class="fas fa-braille"></i>
                                         Publish
                                       </a>
                                       <a class="dropdown-item" href="#">
                                         <i class="fas fa-braille"></i>
                                         Unpublish
                                         </a>
                                       <a class="dropdown-item" href="#">
                                         <i class="fas fa-ruble-sign"></i>
                                          Pay subscription
                                         </a>
                                    </Dropdown>
                                 </div>
                              </div>
                            
                         </Card>
                     </div>
                 </div>
                 <div class="row">
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
import Dropdown from "../../components/BaseDropdown"
import Tabs from "../../components/Tabs/Tabs"
import TabPane from "../../components/Tabs/Tab"
import datatable from "../../components/Datatables";
import Modal from "../../components/Modal"
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
  },
  data(){
     return{
        craft:{},
        ownerUuid:"",
        comments:[],
        comment:"",
        published:true,
        
     }
  },
  methods:{
     
     
   

    viewArtifacts:function(){
       axios({
         methods:"GET",
         url:this.$store.state.backend_url+"/crafts/"+this.uuid,
       }).then(res=>{
           
          if(res.data.code==200){
            this.craft=res.data.data.craft;
            this.ownerUuid=this.craft.owner.uuid;
            
            if(this.craft.publish && this.craft.paidSubscription){
              this.published=true;
            }else{
              this.published=false;
            }

            console.log(res)
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