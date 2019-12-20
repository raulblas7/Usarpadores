export default class YouWin extends Phaser.Scene{
    constructor(){
        super({
            key: 'YouWin'
        })
    }
    preload(){
        this.load.image("youWin", "images/hasganado.png");
        this.load.image("fondoMenu", "images/fondomenu.png");
    }

    create(){
        this.scene.stop('UI');
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.youWin = this.add.image(350,180, "youWin");
       this.youWin.setScale(0.8);
    }
}