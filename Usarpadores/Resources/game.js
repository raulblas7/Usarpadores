import Sprites from './sprites.js';

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
    this.load.image("flecha","images/favicon.png")
    

  	this.load.image("muro", "images/muro.png");
  }
  create() {
    var platforms;
    var guerrero;
    var flechas;
    platforms = this.physics.add.staticGroup();
    flechas = this.physics.add.group();


    this.terreno = this.add.image(0,0, "terreno");
    platforms.create(87.5, 225, "muro");
    

    
  //  this.muro = new Sprites(this, 87.5, 225, "muro");
    this.gladiador = new Sprites(this, 600, 415, "gladiador");
    this.gladiador2 = new Sprites(this, 600, 115, "gladiador");
    this.guerrero = new Sprites(this, 600, 315, "guerrero");
    this.lancer = new Sprites(this, 600, 215, "lancer");
    this.jugador = new Sprites(this,87.5,225, "jugador");
  	this.terreno.setScale(7);
  	this.jugador.setScale(0.5);
  	this.gladiador.setScale(0.8);
    this.gladiador2.setScale(0.8);
  	this.guerrero.setScale(0.8);
    this.lancer.setScale(0.8);
    

    this.gladiador.body.setVelocity(-40,0);
    this.gladiador2.body.setVelocity(-50,0);
    this.guerrero.body.setVelocity(-40,0);
    this.lancer.body.setVelocity(-42,0);
//this.muro=this.physics.add.image(0,100,"muro");
guerrero = this.physics.add.sprite(500, 200, "guerrero");
guerrero.setCollideWorldBounds(true);
guerrero.body.setGravityX(-30);
flechas=this.physics.add.sprite(200,200,"flecha");
    this.cursor = this.input.keyboard.createCursorKeys();
    //colision enemigos y muro
    this.physics.add.collider(guerrero,platforms);
    this.physics.add.collider(guerrero,flechas,this.hitArrow,null,this);

   // this.physics.add.collider(guerrero, flechas, hitArrow, null, this);

  /// this.add.collider(this.muro, this.gladiador, this.collision(this.gladiador), null, this);
  // this.physics.add.collider(this.gladiador2,platforms);
   // this.physics.add.collider(this.muro, this.guerrero, this.collision(this.guerrero), null, this);
   // this.physics.add.collider(this.muro, this.lancer, this.collision(this.lancer), null, this);
  }

  update(time, delta) {   
    //control del jugador
    if(this.cursor.down.isDown){
     // this.jugador.body.setVelocityY(100);
      this.jugador.y++;
    }
    if(this.cursor.up.isDown){
     // this.jugador.body.setVelocityY(-100);
     this.jugador.y--;
    }
    if(this.cursor.right.isDown)
    {
      this.flecha = this.physics.add.sprite(this.jugador.x, this.jugador.y, "flecha");
      //this.physics.add.collider(this.guerrero,this.flecha,this.hitArrow,null,this);

      this.flecha.body.setVelocity(40,0);
      this.flecha.setCollideWorldBounds(true);


      //this.physics.arcade.overlap(guerrero, suelo, perderVida, null, this);
    }

    

  }
   hitArrow() {

    this.guerrero.destroy();
  }
 
}