<template>
  <div>
     <div class="row">
        
         <div class="col-md-12">
             <Card>
                 <div class="row">
                     <div class="col-md-12">
                        <h3>CUSTOMER CRAFTS ORDERS AND REQUESTS</h3> 
                     </div>
                 </div>
                 <div class="row mt-2">
                       <div class="col-md-4 text-center" >
                           <div :class="isPending? 'shadow active-tab':'shadow'" data-category="pending" style="padding:20px" @click="changecategory">PENDING</div>
                       </div>
                       <div class="col-md-4 text-center" >
                           <div :class="isAccepted? 'shadow active-tab':'shadow'" data-category="accepted" style="padding:20px" @click="changecategory">ACCEPTED</div>
                       </div>
                       <div class="col-md-4 text-center" >
                           <div :class="isRejected? 'shadow active-tab':'shadow'" data-category="rejected"  style="padding:20px" @click="changecategory">REJECTED</div>
                       </div>
                 </div>
                 <div class="row mt-3">
                      <div class="col-md-12">
                         <div class="row">
                             <div class="col-md-12">
                                 <Card>
                                     <div class="col-md-12">
                                         <div class="row">
                                             <div class="col-md-3" v-for="data in paginationData" v-bind:key="data.id">
                                                 <a href="" >
                                                     <Card>
                                                         <div class="row">
                                                             <div class="col-md-12">
                                                               <h3 style="color:black">CUSTOMER: <em style="color:#efebe9">{{data.customer.name}}</em></h3>
                                                             </div>
                                                             <div class="col-md-12" v-if="data.craftOrder">
                                                                     <img slot="image" class="card-img-top" :src="'http://localhost:8081/orders/orderpicture/'+data.uuid" alt="Card image cap" height="200px" width="200px">
                                                             </div>
                                                             <div class="col-md-12" v-else>
                                                                 <img slot="image" class="card-img-top" :src="'http://localhost:8081/crafts/profile/'+data.craftUuid" alt="Card image cap" height="150px" width="150px">
                                                             </div>
                                                             
                                                             <div class="col-md-12 text-small" style="font-size:10px">
                                                              
                                                                 <strong style="font-size:12px; color:black">Sent at:</strong> {{new Date(data.doneAt)}}
                                                             </div>
                                                             <div class="col-md-12 mt-2">
                                                                 <span style="color:blacK;">Client comment</span><br>
                                                                 <span class="mt-4" style="color:#757575">{{data.comment}}</span>
                                                             </div>
                                                         </div>
                                                     </Card>
                                                 </a>
                                             </div>
                                         </div>
                                     </div>
                                     <div class="col-md-12">
                                        <Pagination @input="managePaging" :page-count="pagination.pageCount" v-model="pagination.default"></Pagination>
                                     </div>
                                 </Card>
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
import datatable from "../../components/Datatables";
import Tabs from "../../components/Tabs/Tabs"
import TabPane from "../../components/Tabs/Tab"
import Crafts_mixins from "../../Mixins/craftMixins"
import Modal from "../../components/Modal"
import Dropdown from "../../components/BaseDropdown"
import Badge from '../../components/Badge'
import Pagination from "../../components/BasePagination";
export default {
 name:"Crafts",
  mixins: [Crafts_mixins],
 components:{
       Card,
       BButton,
       Tabs,
       TabPane,
       datatable,
        Dropdown,
       Modal,
       Badge,
       Pagination,
       

       
 },
 data(){
     return{

         orders:{},
         tabclass:"",
         isPending:false,
         isRejected:false,
         isAccepted:false,
         pending:[],
         accepted:[],
         rejected:[],
         displayableData:[],
         paginationData:[],
         displayStart:0,
         displayEnd:0,
         pagination:{
            default:1,
            pageCount:0,

         },

     }
 },
 methods:{
    
     changecategory:function(event){
         let category=event.target.getAttribute("data-category")
         if(category==="pending"){
             this.isPending=true;
             this.isRejected=false;
             this.isAccepted=false;
             this.displayableData=this.pending
             this.managePagination()
              if(this.displayableData.length>4){
                    this.paginationData=this.displayableData.slice(0,4)
                }else{
                    this.paginationData=this.displayableData
               }
         }else if(category==="rejected"){
              this.isPending=false;
              this.isRejected=true;
              this.isAccepted=false;
              this.displayableData=this.rejected
              this.managePagination()
              if(this.displayableData.length>4){
                    this.paginationData=this.displayableData.slice(0,4)
                }else{
                    this.paginationData=this.displayableData
               }
         }else if(category === "accepted"){
             this.isPending=false;
             this.isRejected=false;
             this.isAccepted=true;
             this.displayableData=this.accepted
             this.managePagination()
              if(this.displayableData.length>4){
                    this.paginationData=this.displayableData.slice(0,4)
                }else{
                    this.paginationData=this.displayableData
               }
         }
        
     },
     filter_orders:function(){
          this.paintings=[]
             this.rejected=[]
             this.accepted=[]
             this.pending=[]
             this.orders.filter(order=>{
                 if(order.orderStatus=="PENDING"){
                     this.pending.push(order);
                 }else if(order.orderStatus=="ACCEPTED"){
                      this.accepted.push(order);
                 }else if(order.orderStatus=="REJECTED"){
                     this.accepted.push(order);
                 }
             })
     },
     viewOrders:function(){
      axios({
         method:"GET",
         url:this.$store.state.backend_url+"/orders/artist/"+this.$store.state.user.uuid,
       }).then(res=>{
          if(res.data.code==200){
            this.orders=res.data.data.orders;
            this.filter_orders()
            console.log(this.orders)
          }
       })
     }, 
      viewAll(){
         this.displayableData=this.orders;
        this.managePagination()
         if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
            }else{
              this.paginationData=this.displayableData
         }
     },
      managePagination:function(){
        if(this.displayableData.length>4){
          if(this.displayableData.length%4==0){
              this.pagination.pageCount=this.displayableData.length/4
          }else{
            this.pagination.pageCount=(this.pagination.pageCount=this.displayableData.length/4)+1;
            
          } 
        }else{
          this.pagination.pageCount=1;
        }
       
     },
      managePaging:function(evt){
        // console.log(evt);
         this.displayEnd=evt*4
         this.displayStart=this.displayEnd-3;
         this.paginationData=this.displayableData.slice(this.displayStart-1,this.displayEnd);
     }
    
 },
 created(){
     this.viewOrders();
 }
}
</script>
  
<style>
 .shadow{
     border:0 !important;
      -webkit-box-shadow:0px 0px 25px 0px rgba(0,0,0,.12);
      -moz-box-shadow:0px 0px 25px 0px rgba(0,0,0,.12);
        box-shadow:0px 0px 25px 0px rgba(0,0,0,.12)
     }
 .active-tab{
     background-color: #33b5e5;
 }    
</style>