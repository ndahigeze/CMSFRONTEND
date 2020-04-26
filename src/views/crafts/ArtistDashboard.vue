<template>
  <div>
     <div class="row">
      
      
         <Card>
           
         </Card>
       
     </div>
  </div>
</template>

<script>

import axios from "axios";
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
export default {
  name:"Artistdashboard",
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