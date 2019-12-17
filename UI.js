
class UI extends Phaser.Scene {
    constructor() {
        super('UI');
        this.score = 0;

    }

    preload() {
        console.log('Soy UI');
        this.load.image("statBar","images/statusbar.png");

    }
    
    create() {

        this.statusbar = this.add.image(0,0, "statBar");
       // this.statusbar.width=1;
       // statusbar.x=game.width/2-statusbar.width/2;
      //statusbar.y=game.height;

          //  Our Text object to display the Score
         this.add.text(20, 20, 'Puntos', { font: '48px Arial', fill: '#000000' }); 

          this.puntos= this.add.text(240, 20, '0', { font: '48px Arial', fill: '#000000' });

        this.registry.events.on('puntos',(puntos)=>
        {
           this.puntos.setText(puntos);
        });
     

    }

}

export default UI;