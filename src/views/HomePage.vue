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
                      icon="ni ni-active-40">
              </stats-card>
          </a> 
      </div>
     </div>
     <div class="row">
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
     </div>

     <div class="row">
      <div class="col-md-12">
        <Card>
          <div class="row">
            <div v-for="data in displayableData" v-bind:key="data.id" class="col-md-4">
              <card>
                <img slot="image" class="card-img-top" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/img-1-1000x600.jpg" alt="Card image cap">
                
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </card>
            </div>
          </div>
        </Card>
      </div>
     </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/Cards/Card"
import StatsCard from '../components/Cards/StatsCard';
export default {
  name:"HomePage",
  components:{
      Card
  },
  data(){
      return{
          isPainting:true,
          isFigurines:false,
          isJewery:false,
          isStatue:false,
          paintings:[],
          figurines:[],
          statues:[],
          jeweries:[],
          displayableData:[],
          crafts:[],
          classes:""
      }
  },
  methods:{
     viewPaintings:function(){
       this.isPainting=true
       this.isFigurines=false;
       this.isJewery=false;
       this.isStatue=false
     }, 
     viewFigurines:function(){
        this.isPainting=false
        this.isFigurines=true;
        this.isJewery=false;
        this.isStatue=false
     },
     viewStatues:function(){
        this.isPainting=false
        this.isFigurines=false;
        this.isJewery=false;
        this.isStatue=true
     },
     viewJeweries:function(){
        this.isPainting=false
        this.isFigurines=false;
        this.isJewery=true;
        this.isStatue=false;
     },

     viewArtifacts:function(){
       axios({
         methods:"GET",
         url:this.$store.state.backend_url+"/crafts/published",

       }).then(res=>{
          console.log(res);
          if(res.data==200){
            this.crafts=res.data.data.crafts;
          }
       })
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