
export default class Health {
	constructor(scene, health, type){
    super(scene,health,type);
  }
  
     damage(daño){
       if (this.alive)
     {
         this.health -= daño;

         if (this.health <= 0)
         {
             this.kill();
         }
     }

     return this;
    }

 
  }
