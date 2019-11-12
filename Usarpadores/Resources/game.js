
import Arrow from './arrow.js';
import Player from './player.js';
import Gladiator from './gladiador.js';
import Lancer from './lancer.js';
import Fighter from './fighter.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

   preload() {  
    //suelo
    this.load.image("terreno", "images/terreno.png");
    //sprites
  	this.load.image("gladiador", "images/gladiador1.png");
    this.load.image("gladiador2", "images/gladiador1.png");
  	this.load.image("jugador", "images/jugador1.png");
  	this.load.image("guerrero", "images/Guerrero1.png");
  	this.load.image("lancer", "images/lancer1.png");
    this.load.image("flecha","images/Arrow1.png")
    //muro
  	this.load.image("muro", "images/muro.png");
    //flecha lanzada es false al inicio
    this.lanzada = false;
  }
  create() {
    this.platforms = this.physics.add.staticGroup();
    this.terreno = this.add.image(0,0, "terreno");
    this.platforms.create(87.5, 225, "muro");
    
    this.jugador = new Player(this,87.5,225, "jugador");
    this.guerrero = new Fighter(this, 600, 315, "guerrero");
    this.gladiador = new Gladiator(this, 600, 415, "gladiador");
    this.gladiador2 = new Gladiator(this, 600, 115, "gladiador");
    this.lancer = new Lancer(this, 600, 215, "lancer");

  	this.terreno.setScale(7);

    this.cursor = this.input.keyboard.createCursorKeys();
    //colision enemigos y muro
    this.physics.add.collider(this.guerrero,this.platforms);
    this.physics.add.collider(this.gladiador, this.platforms);
    this.physics.add.collider(this.gladiador2, this.platforms);
    this.physics.add.collider(this.lancer, this.platforms);
  }

  update(time, delta) {   
    //control del jugador
    if(this.cursor.down.isDown){
        this.jugador.body.setVelocityY(60);
    }
    else if(this.cursor.up.isDown){
        this.jugador.body.setVelocityY(-60);
    }
    else {
        this.jugador.body.setVelocityY(0);
    }
    //control del lanzamiento de flechas
    if(this.cursor.right.isDown)
    {
      if (!this.lanzada){
        this.flecha = new Arrow(this,this.jugador.x + (this.jugador.x/2), this.jugador.y, "flecha");
        console.log(this.flecha);
        this.lanzada = true;
      }
    }
    else if(this.cursor.right.isUp){
      this.lanzada = false;
    }
    if (this.flecha != undefined) {
      this.physics.add.collider(this.guerrero,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.gladiador,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.gladiador2,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.lancer,this.flecha,this.flecha.hitArrow,null,this);
    }
  }
}