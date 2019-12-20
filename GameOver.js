class Gameover extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload(){
        this.load.image("youLose", "images/hasperdido.png");
        this.load.image("fondoMenu", "images/fondomenu.png");
    }

    create(){
        this.scene.stop('UI');
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.youLose = this.add.image(350,180, "youLose");
    }
}

export default Gameover;