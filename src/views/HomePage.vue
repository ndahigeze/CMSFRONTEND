<template>
  <div>
     <!-- <div class="row">
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
     </div> -->
    <div class="row"></div>
     <div class="row mt-5">
        <div class="col-md-12">
          <div class="row">
             <div class="col-md-12 mt-5" >
                  <header class="masthead" :style="{ backgroundImage: 'url(' + require('@/assets/images/home_image.jpg') + ')' }" id="header">
                    <div class="overlay"></div>
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-8 col-md-10 mx-auto">
                          <div class="site-heading">
                            <h3 style="color:white;">In publishing and graphic design, Lorem ipsum is a placeholder text</h3>
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
          displayOption:"ALL"

      }
  },
  mixins:[Crafts_mixins],
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
  methods:{
      viewCrafts:function(){
            
      },
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
     viewArtifacts:function(){
       axios({
         methods:"GET",
         url: this.$store.state.backend_url+"/crafts/published",

       }).then(res=>{
            console.log(res)
          if(res.data.code==200){
            this.crafts=res.data.data.crafts;
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
 #header{
   height: 50vh;
   background-repeat: no-repeat;
   background-position: center;
   /* background-size: auto; */
   background-size: 100% 100%;
   /* opacity:0.5 */
   /* width: 80%; */
   margin-bottom: 20;
 }






 /* cr */
body {
    font-size: 20px;
    color: #212529;
    font-family: 'Lora', 'Times New Roman', serif;
  }
  
  p {
    line-height: 1.5;
    margin: 30px 0;
  }
  
  p a {
    text-decoration: underline;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 800;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  a {
    color: #212529;
    transition: all 0.2s;
  }
  
  a:focus, a:hover {
    color: #0085A1;
  }
  
  blockquote {
    font-style: italic;
    color: #868e96;
  }
  
  .section-heading {
    font-size: 36px;
    font-weight: 700;
    margin-top: 60px;
  }
  
  .caption {
    font-size: 14px;
    font-style: italic;
    display: block;
    margin: 0;
    padding: 10px;
    text-align: center;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  
  ::-moz-selection {
    color: #fff;
    background: #0085A1;
    text-shadow: none;
  }
  
  ::selection {
    color: #fff;
    background: #0085A1;
    text-shadow: none;
  }
  
  img::-moz-selection {
    color: #fff;
    background: transparent;
  }
  
  img::selection {
    color: #fff;
    background: transparent;
  }
  
  img::-moz-selection {
    color: #fff;
    background: transparent;
  }
  
  #mainNav {
    position: absolute;
    border-bottom: 1px solid #e9ecef;
    background-color: white;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  #mainNav .navbar-brand {
    font-weight: 800;
    color: #343a40;
  }
  
  #mainNav .navbar-toggler {
    font-size: 12px;
    font-weight: 800;
    padding: 13px;
    text-transform: uppercase;
    color: #343a40;
  }
  
  #mainNav .navbar-nav > li.nav-item > a {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  @media only screen and (min-width: 992px) {
    #mainNav {
      border-bottom: 1px solid transparent;
      background: transparent;
    }
    #mainNav .navbar-brand {
      padding: 10px 20px;
      color: #fff;
    }
    #mainNav .navbar-brand:focus, #mainNav .navbar-brand:hover {
      color: rgba(255, 255, 255, 0.8);
    }
    #mainNav .navbar-nav > li.nav-item > a {
      padding: 10px 20px;
      color: #fff;
    }
    #mainNav .navbar-nav > li.nav-item > a:focus, #mainNav .navbar-nav > li.nav-item > a:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
  
  @media only screen and (min-width: 992px) {
    #mainNav {
      transition: background-color 0.2s;
      /* Force Hardware Acceleration in WebKit */
      transform: translate3d(0, 0, 0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    #mainNav.is-fixed {
      /* when the user scrolls down, we hide the header right above the viewport */
      position: fixed;
      top: -67px;
      transition: transform 0.2s;
      border-bottom: 1px solid white;
      background-color: rgba(255, 255, 255, 0.9);
    }
    #mainNav.is-fixed .navbar-brand {
      color: #212529;
    }
    #mainNav.is-fixed .navbar-brand:focus, #mainNav.is-fixed .navbar-brand:hover {
      color: #0085A1;
    }
    #mainNav.is-fixed .navbar-nav > li.nav-item > a {
      color: #212529;
    }
    #mainNav.is-fixed .navbar-nav > li.nav-item > a:focus, #mainNav.is-fixed .navbar-nav > li.nav-item > a:hover {
      color: #0085A1;
    }
    #mainNav.is-visible {
      /* if the user changes the scrolling direction, we show the header */
      transform: translate3d(0, 100%, 0);
    }
  }
  
  header.masthead {
    margin-bottom: 20px;
    background: no-repeat center center;
    background-color: #868e96;
    background-attachment: scroll;
    position: relative;
    background-size: cover;
  }
  
  header.masthead .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #212529;
    opacity: 0.5;
  }
  
  header.masthead .page-heading,
  header.masthead .post-heading,
  header.masthead .site-heading {
    padding: 200px 0 150px;
    color: white;
  }
  
  @media only screen and (min-width: 768px) {
    header.masthead .page-heading,
    header.masthead .post-heading,
    header.masthead .site-heading {
      padding: 50px 0;
    }
  }
  
  header.masthead .page-heading,
  header.masthead .site-heading {
    text-align: center;
  }
  
  header.masthead .page-heading h1,
  header.masthead .site-heading h1 {
    font-size: 10px;
    margin-top: 0;
  }

  header.masthead .page-heading h3,
  header.masthead .site-heading h3 {
    font-size: 40px;
    margin-top: 0;
  }
  
  header.masthead .page-heading .subheading,
  header.masthead .site-heading .subheading {
    font-size: 24px;
    font-weight: 300;
    line-height: 1.1;
    display: block;
    margin: 10px 0 0;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  @media only screen and (min-width: 768px) {
    header.masthead .page-heading h1,
    header.masthead .site-heading h1 {
      font-size: 80px;
    }
  }
  
  header.masthead .post-heading h1 {
    font-size: 35px;
  }
  
  header.masthead .post-heading .meta,
  header.masthead .post-heading .subheading {
    line-height: 1.1;
    display: block;
  }
  
  header.masthead .post-heading .subheading {
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0 30px;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  header.masthead .post-heading .meta {
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    font-family: 'Lora', 'Times New Roman', serif;
  }
  
  header.masthead .post-heading .meta a {
    color: #fff;
  }
  
  @media only screen and (min-width: 768px) {
    header.masthead .post-heading h1 {
      font-size: 55px;
    }
    header.masthead .post-heading .subheading {
      font-size: 30px;
    }
  }
  
  .post-preview > a {
    color: #212529;
  }
  
  .post-preview > a:focus, .post-preview > a:hover {
    text-decoration: none;
    color: #0085A1;
  }
  
  .post-preview > a > .post-title {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  
  .post-preview > a > .post-subtitle {
    font-weight: 300;
    margin: 0 0 10px;
  }
  
  .post-preview > .post-meta {
    font-size: 18px;
    font-style: italic;
    margin-top: 0;
    color: #868e96;
  }
  
  .post-preview > .post-meta > a {
    text-decoration: none;
    color: #212529;
  }
  
  .post-preview > .post-meta > a:focus, .post-preview > .post-meta > a:hover {
    text-decoration: underline;
    color: #0085A1;
  }
  
  @media only screen and (min-width: 768px) {
    .post-preview > a > .post-title {
      font-size: 36px;
    }
  }
  
  .floating-label-form-group {
    font-size: 14px;
    position: relative;
    margin-bottom: 0;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #dee2e6;
  }
  
  .floating-label-form-group input,
  .floating-label-form-group textarea {
    font-size: 1.5em;
    position: relative;
    z-index: 1;
    padding: 0;
    resize: none;
    border: none;
    border-radius: 0;
    background: none;
    box-shadow: none !important;
    font-family: 'Lora', 'Times New Roman', serif;
  }
  
  .floating-label-form-group input::-webkit-input-placeholder,
  .floating-label-form-group textarea::-webkit-input-placeholder {
    color: #868e96;
    font-family: 'Lora', 'Times New Roman', serif;
  }
  
  .floating-label-form-group label {
    font-size: 0.85em;
    line-height: 1.764705882em;
    position: relative;
    z-index: 0;
    top: 2em;
    display: block;
    margin: 0;
    transition: top 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }
  
  .floating-label-form-group .help-block {
    margin: 15px 0;
  }
  
  .floating-label-form-group-with-value label {
    top: 0;
    opacity: 1;
  }
  
  .floating-label-form-group-with-focus label {
    color: #0085A1;
  }
  
  form .form-group:first-child .floating-label-form-group {
    border-top: 1px solid #dee2e6;
  }
  
  footer {
    padding: 50px 0 65px;
  }
  
  footer .list-inline {
    margin: 0;
    padding: 0;
  }
  
  footer .copyright {
    font-size: 14px;
    margin-bottom: 0;
    text-align: center;
  }
  
  
 
</style>