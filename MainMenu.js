export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({
            key: 'MainMenu'
        })
    }

    preload(){
        this.load.image("titulo", "letras.png");
        this.load.image("botonPlay", "images/playboton.png");
        this.load.image("botonControls", "images/controlsboton.png");
        this.load.image("fondoMenu", "images/fondomenu.png");
    }

    create(){
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.titulo = this.add.image(350,80, "titulo");
       this.titulo.setScale(0.5);
       let botonPlay = this.add.image(350,250,"botonPlay");
       botonPlay.setScale(0.5);
       let botonControls = this.add.image(350,350,"botonControls");
       botonControls.setScale(0.5);

       botonPlay.setInteractive();
       botonPlay.on("pointerdown", ()=>{
           this.scene.start('Game');
       })

       botonControls.setInteractive();
       botonControls.on("pointerdown", ()=>{
           this.scene.start('Controls');
       })
    }
}