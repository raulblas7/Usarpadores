

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
  	this.load.image("terreno", "images/terreno.png");
  	this.load.image("gladiador", "images/gladiador1.png");
  	this.load.image("muro", "images/muro.png");
  	this.load.image("jugador", "images/jugador1.png");
  }

  create() {
  	this.terreno = this.add.image(0,0, "terreno");
  	this.muro = this.add.image(87.5,225, "muro");
  	this.gladiador = this.physics.add.image(600,385,"gladiador");
  	this.jugador = this.add.image(87.5,225, "jugador");
  	this.terreno.setScale(7);
  	this.jugador.setScale(0.5);
  	this.gladiador.setScale(0.8);
  	//Fisicas
  	this.gladiador.setCollideWorldBounds(true); //limita el personaje a los limites del mundo
  	this.gladiador.body.gravity.y = 0; //corregir
  	this.gladiador.setVelocity(-10,0);

  }

  update(time, delta) {   
  	
  }
}