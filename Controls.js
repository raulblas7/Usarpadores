export default class Controls extends Phaser.Scene {
    constructor(){
        super({
            key: 'Controls'
        })
    }

    preload(){
        this.load.image("titulo", "letras.png");
        this.load.image("botonPlay", "images/playboton.png");
        this.load.image("fondoMenu", "images/fondomenu.png");
    }

    create(){
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.titulo = this.add.image(350,80, "titulo");
       this.titulo.setScale(0.5);
       let botonPlay = this.add.image(550,400,"botonPlay");
       botonPlay.setScale(0.3);
       botonPlay.setInteractive();
       botonPlay.on("pointerdown", ()=>{
           this.scene.start('Game');
       })
    }
}