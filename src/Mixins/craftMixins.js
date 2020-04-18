export default{
    methods:{

        filterCrafts:function(){
            
             this.paintings=[]
             this.figurines=[],
             this.statues=[],
             this.jeweries=[],
             this.crafts.filter(craft=>{
                 if(craft.category=="PAINTING"){
                     this.paintings.push(craft);
                 }else if(craft.category=="FIGURINE"){
                      this.figurines.push(craft);
                 }else if(craft.category=="STATUE"){
                     this.statues.push(craft);
                 }else if(craft.category=="JEWERY"){
                     this.jeweries.push(craft);
                 }
             })
        }
    }
}