class Gameover extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image("fondoMenu", "images/fondomenu.png");
    }

    create() {
        this.fondoMenu = this.add.image(350,200,"fondoMenu");
        this.scene.stop('UI');
        
        this.evento = setTimeout(() => {
            this.salirEscene();
        }, 5000);
        
        this.input.keyboard.on('keydown_ENTER', () => {
            this.salirEscene();
        });
        this.input.on('pointerdown', () => {
            this.salirEscene();
        })
    }

    salirEscene() {
        clearTimeout(this.evento);
        this.scene.start('MainMenu');
    }

}

export default Gameover;