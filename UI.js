class UI extends Phaser.Scene {
    constructor() {
        super('UI');
    }

    preload() {
        console.log('Soy UI');
    }
    
    create() {
        console.log('Soy UI');

        this.add.image(0, 0, 'tablero').setOrigin(0);
        console.log('Soy UI');

        this.add.dynamicBitmapText(10, 7, 'pixel', 'PUNTOS', 8);
        console.log('Soy UI');

       this.puntos = this.add.dynamicBitmapText(this.sys.game.config.width - 60, 7, 'pixel', Phaser.Utils.String.Pad(0, 6, 0, 1), 8);
        console.log('Soy UI');

    }
    addPoint() {
        console.log('h');

        this.puntos.setText(
            Phaser.Utils.String.Pad(parseInt(this.puntos.text) + 10, 6, 0, 1)
        );
        console.log('h');

    }

}

export default UI;