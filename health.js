
export default class Health {
  constructor( health)
{
  this.health=health;
  }
  
     damage( enemy,platform){

      console.log(this.health);

       if (this.health>0)
     {
         this.health -= 10;
         console.log(this.health);
        
     }

     
    }

 
}
