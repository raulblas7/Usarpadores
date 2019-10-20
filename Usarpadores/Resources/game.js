//import Enemies from 'sprites.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  

  	this.load.image("terreno", "images/terreno.png");
  	//hacer sprites
  	this.load.image("gladiador", "images/gladiador1.png");
  	this.load.image("jugador", "images/jugador1.png");
  	this.load.image("guerrero", "images/Guerrero1.png");
  	this.load.image("lancer", "images/lancer1.png");


  	this.load.image("muro", "images/muro.png");
  }

  create() {
  	this.terreno = this.add.image(0,0, "terreno");
  	this.muro = this.add.image(87.5,225, "muro");
  	this.gladiador = this.physics.add.image(600,415,"gladiador");
  	this.guerrero = this.physics.add.sprite(600, 315, "guerrero");
  	this.lancer = this.physics.add.sprite(600, 215, "lancer");
  	this.jugador = this.add.image(87.5,225, "jugador");
  	this.terreno.setScale(7);
  	this.jugador.setScale(0.5);
  	this.gladiador.setScale(0.8);
  	this.guerrero.setScale(0.8);
  	this.lancer.setScale(0.8);
  	//Fisicas
  	this.gladiador.setCollideWorldBounds(true); //limita el personaje a los limites del mundo
  	this.guerrero.setCollideWorldBounds(true);
  	this.lancer.setCollideWorldBounds(true);
  	
  	this.gladiador.setVelocity(-15,0);
  	this.guerrero.setVelocity(-30,0);
  	this.lancer.setVelocity(-20,0);

  }

  update(time, delta) {   

  }
}