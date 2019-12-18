export default class YouWin extends Phaser.Scene{
    constructor(){
        super({
            key: 'YouWin'
        })
    }
    preload(){
        this.load.image("youWin", "images/hasganado.png");
        this.load.image("botonPlay", "images/playboton.png");
        this.load.image("botonReturnMenu", "images/mainmenuboton.png");
        this.load.image("fondoMenu", "images/fondomenu.png");
    }

    create(){
        this.scene.stop('UI');
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.youWin = this.add.image(350,80, "youWin");
       this.youWin.setScale(0.5);
       let botonPlay = this.add.image(350,250,"botonPlay");
       botonPlay.setScale(0.5);
       let botonReturnMenu = this.add.image(350,350,"botonReturnMenu");
       botonReturnMenu.setScale(0.5);
       botonPlay.setInteractive();
       botonPlay.on("pointerdown", ()=>{
           this.scene.start('Game');
       })

       botonReturnMenu.setInteractive();
       botonReturnMenu.on("pointerdown", ()=>{
           this.scene.start('MainMenu');
       })
    }
}