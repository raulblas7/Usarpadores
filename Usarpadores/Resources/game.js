import Sprites from './sprites.js';
import Arrow from './arrow.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

   preload() {  

  	this.load.image("terreno", "images/terreno.png");
  	//hacer sprites
  	this.load.image("gladiador", "images/gladiador1.png");
    this.load.image("gladiador2", "images/gladiador1.png");
  	this.load.image("jugador", "images/jugador1.png");
  	this.load.image("guerrero", "images/Guerrero1.png");
  	this.load.image("lancer", "images/lancer1.png");
    this.load.image("flecha","images/Arrow1.png")
  	this.load.image("muro", "images/muro.png");

    this.lanzada = false;
  }
  create() {
    var platforms;
    //var guerrero;
    var gladiador;
    var gladiador2;
    var lancer;
    var flechas;
    platforms = this.physics.add.staticGroup();
    //flechas = new Arrow(this,"flecha");

    this.terreno = this.add.image(0,0, "terreno");
    platforms.create(87.5, 225, "muro");
    
    this.jugador = new Sprites(this,87.5,225, "jugador");
    this.guerrero = new Sprites(this, 600, 315, "guerrero");
    gladiador = new Sprites(this, 600, 415, "gladiador");
    gladiador2 = new Sprites(this, 600, 115, "gladiador");
    lancer = new Sprites(this, 600, 215, "lancer");

  	this.terreno.setScale(7);
  	this.jugador.setScale(0.5);
  	gladiador.setScale(0.8);
    gladiador2.setScale(0.8);
    lancer.setScale(0.8);
    this.guerrero.setScale(0.8);
    
    this.guerrero.body.setVelocity(-40,0);
    gladiador.body.setVelocity(-40,0);
    gladiador2.body.setVelocity(-50,0);
    lancer.body.setVelocity(-42,0);

    //flechas=this.physics.add.sprite(200,200,"flecha");
    this.cursor = this.input.keyboard.createCursorKeys();
    //this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //colision enemigos y muro
    this.physics.add.collider(this.guerrero,platforms);
    this.physics.add.collider(gladiador, platforms);
    this.physics.add.collider(gladiador2, platforms);
    this.physics.add.collider(lancer, platforms);
    // if (this.flecha != undefined) {this.physics.add.collider(guerrero,this.flecha,this.flecha.hitArrow,null,this);}

   // this.physics.add.collider(guerrero, flechas, hitArrow, null, this);
  }

  update(time, delta) {   
    //control del jugador
    if(this.cursor.down.isDown){
     // this.jugador.body.setVelocityY(100);
      this.jugador.y++;
    }
    else if(this.cursor.up.isDown){
     // this.jugador.body.setVelocityY(-100);
     this.jugador.y--;
    }
    else if(this.cursor.right.isDown) //Te crea 4 flechas CAMBIAR
    {
      if (this.lanzada == false){
        this.flecha = new Arrow(this,this.jugador.x + (this.jugador.x/2), this.jugador.y, "flecha");
        console.log(this.flecha);
        this.lanzada = true;
      }
      //this.hitArrow;
      //this.physics.add.collider(this.guerrero,this.flecha,this.hitArrow,null,this);
      //this.flecha.setScale(0.15);
      //this.flecha.body.setVelocity(60,0);
      //this.flecha.setCollideWorldBounds(true);
      //this.physics.arcade.overlap(guerrero, suelo, perderVida, null, this);
    }
    else if(this.cursor.right.isUp){
      this.lanzada = false;
    }
    if (this.flecha != undefined) {this.physics.add.collider(this.guerrero,this.flecha,this.flecha.hitArrow,null,this);}
  }
  hitArrow() {
    console.log("Colisión");
    //obj1.destroy();
  }
}