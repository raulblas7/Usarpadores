
class UI extends Phaser.Scene {
    constructor() {
        super('UI');
        this.score = 0;
        this.health=1000;

    }

    preload() {
        console.log('Soy UI');
    }
    
    create() {

       
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(170, 20,( this.health/2)+20, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        
        
        var percentText = this.make.text({
            x:200,
            y: 10,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
         

        percentText.setText(parseInt(this.health));
        progressBar.clear();
        progressBar.fillStyle(0x5FFF33, 1);
      progressBar.fillRect(180, 30 ,this.health/2 , 30);
        this.registry.events.on('vida',(vida)=>
        { 
            percentText.setText(parseInt(vida));
             console.log("vida");
             progressBar.clear();
             progressBar.fillStyle(0x5FFF33, 1);

             progressBar.fillRect(180, 30 ,vida/2, 30);
        }
        );


    }

}

export default UI;