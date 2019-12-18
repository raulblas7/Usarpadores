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

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(190, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(200, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
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
            var theOtherScene=this.scene.get('Game');
           theOtherScene.scene.restart();
       })

       botonControls.setInteractive();
       botonControls.on("pointerdown", ()=>{
           this.scene.start('Controls');
       })
       
    }
}