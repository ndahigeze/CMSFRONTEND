<template>
<div>
    
    <div class="row mt-5"></div>
     <div class="row mt-5">
         <div class="col-md-12">
           <h1>MY CRAFTS</h1>
         </div>
     </div>
     <div class="row mt-2">
        <div class="col-md-12">
          <div class="row">
             <div class="col-md-12 mt-5" >
                  <header class="masthead" id="header">
                    <div class="overlay"></div>
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-8 col-md-10 mx-auto">
                          <div class="site-heading">
                            <!-- <h3 style="color:white;">In publishing and graphic design, Lorem ipsum is a placeholder text</h3> -->
                            <div class="col-md-12 ">
                              <base-input >
                                  <select v-model="displayOption" class="form-control">
                                      <option value="ALL">ALL</option>
                                      <option value="PAINTING" selected>PAINTING</option>
                                      <option value="STATUE">STATUE</option>
                                      <option value="FIGURINE">FIGURINE</option>
                                      <option value="JEWERY">JEWERY</option>
                                  </select>
                              </base-input>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
             </div>
          </div>
        </div>
     </div>
     <div class="row">
      <div class="col-md-12">
        <!-- <Card> -->
         
          <div class="row">
            <div v-for="data in paginationData" v-bind:key="data.id" class="col-md-3">
             <a :href="'craftdetails/'+data.uuid">
              <card>
                <img slot="image" class="card-img-top" :src="backEndUrl+'/crafts/profile/'+data.uuid" alt="Card image cap" height="300px">
                
                <h5 class="card-title">{{data.name}}</h5>
                <p class="card-text">{{data.comment|displayLimit}} . . .</p>
                <p class="card-text"><small class="text-muted">{{data.price}} <i class="fa fa-money-bill "></i></small></p>
              </card>
             </a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
               <Pagination @input="managePaging" :page-count="pagination.pageCount" v-model="pagination.default"></Pagination>
            </div>
          </div>
        <!-- </Card> -->
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
import NewCraft from "./NewCraft"
import Dropdown from "../../components/BaseDropdown"
import PaymentPage from './payment_page'
import Badge from '../../components/Badge'
import Pagination from "../../components/BasePagination";
export default {
    name: "Crafts",
    mixins: [Crafts_mixins],
    components: {
        Card,
        BButton,
        Tabs,
        TabPane,
        datatable,
        Dropdown,
        Modal,
        NewCraft,
        PaymentPage,
        Pagination,
        Badge

    },
    data() {
        return {
  
            ownerUuid: "",
             pagination:{
            default:1,
            pageCount:0,

          },
          isPainting:false,
          isFigurines:false,
          isJewery:false,
          isStatue:false,
          paintings:[],
          figurines:[],
          statues:[],
          jeweries:[],
          displayableData:[],
          crafts:[],
          classes:"",
          paginationData:[],
          displayStart:0,
          displayEnd:0,
            
        //   Create order modal data
          newOrdermodal:{
            show:false,
          },
          displayOption:"ALL"
         
           
        }
    },
    computed:{
        isLoggedIn:function(){
            return this.$store.state.isLoggedIn
        },
        backEndUrl:function(d){
        return this.$store.state.backend_url
        },

     },
     filters:{
            displayLimit:function(value){
               return value.substring(0,100)
            }
    },
    watch: {
       displayOption: {
       handler: function  (newVal,oldVAL){
         console.log(this.displayOption)
           if(this.displayOption=="ALL"){
            this.viewAll();
          }else if(this.displayOption=="PAINTING"){
            this.viewPaintings()
          }else if(this.displayOption=="STATUE"){
            this.viewStatues()
          }else if(this.displayOption=="FIGURINE"){
            this.viewFigurines()
          }else if(this.displayOption=="JEWERY"){
            this.viewJeweries()
          }else{
            this.viewAll();
          }
       },
       deep:true      
        
      }
    },
    methods: {
      
    
        viewDetails: function (evt) {
            // this.showdetails = true;
            // this.viewArtifact(evt.uuid)
              this.$router.push({ name: 'craftdetails', params: { uuid: evt.uuid } })
        },

        viewArtifacts: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/crafts/buyers/" + this.$store.state.user.uuid,
            }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.crafts = res.data.data.crafts;
                      this.displayableData=this.crafts
                    this.filterCrafts();
                    this.managePagination()
                    if(this.displayableData.length>8){
                      this.paginationData=this.displayableData.slice(0,8)
                    }else{
                      this.paginationData=this.displayableData
                    }
                }
            })
        },
       
       viewPaintings:function(){
       this.isPainting=true
       this.isFigurines=false;
       this.isJewery=false;
       this.isStatue=false
       this.displayableData=this.paintings
       this.managePagination()
        if(this.displayableData.length>8){
               this.paginationData=this.displayableData.slice(0,8)
            }else{
              this.paginationData=this.displayableData
         }
     }, 
     viewFigurines:function(){
        this.isPainting=false
        this.isFigurines=true;
        this.isJewery=false;
        this.isStatue=false
        this.displayableData=this.figurines;
        this.managePagination()
         if(this.displayableData.length>8){
               this.paginationData=this.displayableData.slice(0,8)
            }else{
              this.paginationData=this.displayableData
          }
     },
     viewStatues:function(){
        this.isPainting=false
        this.isFigurines=false;
        this.isJewery=false;
        this.isStatue=true
        this.displayableData=this.statues;
        this.managePagination()
         if(this.displayableData.length>8){
               this.paginationData=this.displayableData.slice(0,8)
            }else{
              this.paginationData=this.displayableData
          }

     },
     viewJeweries:function(){
        this.isPainting=false
        this.isFigurines=false;
        this.isJewery=true;
        this.isStatue=false;
        this.displayableData=this.jeweries;
        this.managePagination()
         if(this.displayableData.length>8){
               this.paginationData=this.displayableData.slice(0,8)
            }else{
              this.paginationData=this.displayableData
         }
     },

     viewAll(){
         this.displayableData=this.crafts;
        this.managePagination()
         if(this.displayableData.length>8){
               this.paginationData=this.displayableData.slice(0,8)
            }else{
              this.paginationData=this.displayableData
         }
     },
      managePagination:function(){
        if(this.displayableData.length>8){
          if(this.displayableData.length%8==0){
              this.pagination.pageCount=this.displayableData.length/8
          }else{
            this.pagination.pageCount=(this.pagination.pageCount=this.displayableData.length/8)+1;
            
          } 
        }else{
          this.pagination.pageCount=1;
        }
       
     },
     managePaging:function(evt){
        // console.log(evt);
         this.displayEnd=evt*8
         this.displayStart=this.displayEnd-7;
         this.paginationData=this.displayableData.slice(this.displayStart-1,this.displayEnd);
     }

    },
    created() {
        this.viewArtifacts();
    }
}
</script>

<style>

</style>
