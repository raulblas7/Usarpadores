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
        this.load.audio("music","audio/music.mp3");

        this.load.json('fontJSON', 'font/font.json');
        this.load.image('font', 'font/font.png');
    }

    create(){
       this.fondoMenu = this.add.image(350,200,"fondoMenu");
       this.titulo = this.add.image(350,80, "titulo");
       this.titulo.setScale(0.5);
       let botonPlay = this.add.image(350,250,"botonPlay");
       botonPlay.setScale(0.5);
       let botonControls = this.add.image(350,350,"botonControls");
       botonControls.setScale(0.5);
       let audio =this.sound.add("music",{loop:true})
       audio.play();
       botonPlay.setInteractive();
       botonPlay.on("pointerdown", ()=>{
       audio.stop();
          const fontJSON = this.cache.json.get('fontJSON');
          this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));
           this.scene.start('Game');
       })

       botonControls.setInteractive();
       botonControls.on("pointerdown", ()=>{
           this.scene.start('Controls');
       })
       
    }
}