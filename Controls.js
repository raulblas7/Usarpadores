export default class Controls extends Phaser.Scene {
    constructor(){
        super({
            key: 'Controls'
        })
    }

    preload(){
        this.load.image("titulo", "letras.png");
        this.load.image("botonPlay", "images/playboton.png");
        this.load.image("botonReturn", "images/returnboton.png");
        this.load.image("fondoMenu", "images/fondomenu.png");
        this.load.image("controlsmenu", "images/controlsmenu.png");
    }

    create(){
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.titulo = this.add.image(350,80, "titulo");
       this.titulo.setScale(0.5);
       let botonPlay = this.add.image(550,400,"botonPlay");
       let botonReturn = this.add.image(100,400,"botonReturn");
       this.controlsmenu = this.add.image(350, 250, "controlsmenu");
       botonPlay.setScale(0.3);
       botonPlay.setInteractive();
       botonPlay.on("pointerdown", ()=>{
           this.scene.start('Game');
       })
       botonReturn.setScale(0.3);
       botonReturn.setInteractive();
       botonReturn.on("pointerdown", ()=>{
           this.scene.start('MainMenu');
       })
    }
}