
class UI extends Phaser.Scene {
    constructor() {
        super('UI');
        this.score = 0;
        this.health=500;

    }

    preload() {
        console.log('Soy UI');

    }
    
    create() {

       
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(50, 50,( this.health)+20, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
          //  Our Text object to display the Score
      /*   this.add.text(20, 20, 'Puntos', { font: '48px Arial', fill: '#000000' }); 

          this.puntos= this.add.text(240, 20, '0', { font: '48px Arial', fill: '#000000' });

        this.registry.events.on('puntos',(puntos)=>
        {
           this.puntos.setText(puntos);
        });*/

        percentText.setText(parseInt(this.health));
        progressBar.clear();
        progressBar.fillStyle(0x5FFF33, 1);
      // progressBar.fillRect(60, 60 , , 30);
        this.registry.events.on('vida',(vida)=>
        { 
            percentText.setText(parseInt(vida));

        progressBar.fillRect(60,60,vida , 30);
               }
        );


    }

}

export default UI;