<template>
  <div>
     <div class="row">
        <div class="col-md-3">
            <a href="#"  @click="viewPaintings($event)">
                 <stats-card title="Paintings"
                      type="gradient-red"
                      :sub-title="paintings.length.toString()"
                      :statsClassess="isPainting? 'card-stats bg-gradient-default':'card-stats'"
                      icon="ni ni-active-40">
                 </stats-card>
            </a> 
        </div>
        <div class="col-md-3">
          <a href="#"  @click="viewFigurines($event)">
              <stats-card title="Figurines"
                      type="gradient-red"
                      :sub-title="figurines.length.toString()"
                      :statsClassess="isFigurines? 'card-stats bg-gradient-default':'card-stats'"
                      icon="ni ni-active-40">
              </stats-card>
          </a> 
        </div>
        <div class="col-md-3">
          <a href="#"  @click="viewStatues($event)">
             <stats-card title="Statues"
                      type="gradient-red"
                      :sub-title="statues.length.toString()"
                      :statsClassess="isStatue? 'card-stats bg-gradient-default':'card-stats'"
                      icon="ni ni-active-40">
              </stats-card>
          </a> 
        </div>
         <div class="col-md-3">
          <a href="#"  @click="viewJeweries($event)">
              <stats-card title="jeweries"
                      type="gradient-red"
                      :sub-title="jeweries.length.toString()"
                      :statsClassess="isJewery? 'card-stats bg-gradient-default':'card-stats'"
                      >
              </stats-card>
          </a> 
      </div>
     </div>
     <!-- <div class="row">
       <div class="col-md-12">
           <div class="card bg-dark text-white border-0">
            <img class="card-img" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/img-1-1000x600.jpg" alt="Card image" height="400px">
            <div class="card-img-overlay d-flex align-items-center">
                <div>
                    <p class="card-text">Category description</p>
                </div>
            </div>
        </div>
       </div>
     </div> -->

     <div class="row">
      <div class="col-md-12">
        <Card>
          <div class="row mb-3" >
            <div class="col-md-12">
              <BButton size="sm" type="primary" @click="viewAll()">
                ALL CRAFTS
              </BButton>
              <!-- <BButton size="sm" v-if="isLoggedIn" type="primary" @click="newOrdermodal.show=true">Send craft request</BButton> -->
            </div>
          </div>
          <div class="row">
            <div v-for="data in paginationData" v-bind:key="data.id" class="col-md-3">
             <a :href="'craftdetails/'+data.uuid">
              <card>
                <img slot="image" class="card-img-top" :src="'http://localhost:8081/crafts/profile/'+data.uuid" alt="Card image cap" height="400px">
                
                <h5 class="card-title">{{data.name}}</h5>
                <p class="card-text">{{data.comment}}</p>
                <p class="card-text"><small class="text-muted">{{data.price}}</small></p>
              </card>
             </a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
               <Pagination @input="managePaging" :page-count="pagination.pageCount" v-model="pagination.default"></Pagination>
            </div>
          </div>
        </Card>
      </div>
     </div>


      <!-- <Modal :show.sync='newOrdermodal.show' modalClasses="modal-dialog-centered modal-dialog modal-lg ">
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
                 <NewOrder @reload="reload" uuid="No Craft" v-if="newOrdermodal.show"></NewOrder>
               </div>
            </div>
       </Modal> -->


  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/Cards/Card"
import StatsCard from '../components/Cards/StatsCard';
import Crafts_mixins from "../Mixins/craftMixins"
import Pagination from "../components/BasePagination";
import BButton from "../components/BaseButton"
import NewOrder from "./crafts/NewOrder"
import Modal from "../components/Modal"

export default {
  name:"HomePage",
  components:{
      Card,
      Pagination,
      BButton,
      NewOrder,
      Modal
  },
  data(){
      return{
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

      }
  },
  mixins:[Crafts_mixins],
  computed:{
     isLoggedIn:function(){
         return this.$store.state.isLoggedIn
     },
  },
  methods:{
      reload:function(){
         this.newOrdermodal.show=false;
     },
     triggernewRequest:function(){
       
        this.newOrdermodal=this.newOrdermodal.show?false:true
     },
     viewPaintings:function(){
       this.isPainting=true
       this.isFigurines=false;
       this.isJewery=false;
       this.isStatue=false
       this.displayableData=this.paintings
       this.managePagination()
        if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
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
         if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
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
         if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
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
         if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
            }else{
              this.paginationData=this.displayableData
         }
     },

     viewAll(){
         this.displayableData=this.crafts;
        this.managePagination()
         if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
            }else{
              this.paginationData=this.displayableData
         }
     },
     viewArtifacts:function(){
       axios({
         methods:"GET",
         url:this.$store.state.backend_url+"/crafts/published",

       }).then(res=>{
            console.log(res)
          if(res.data.code==200){
            this.crafts=res.data.data.crafts;
            this.displayableData=this.crafts
            this.filterCrafts();
            this.managePagination()
            if(this.displayableData.length>4){
               this.paginationData=this.displayableData.slice(0,4)
            }else{
              this.paginationData=this.displayableData
            }
          
          }
       })
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
    this.viewArtifacts()
    
  }
   
}
</script>

<style scoped>
 .active{
     background-color: #e0e0e0;
 }
 .normal{
     background-color: white;
 }
</style>