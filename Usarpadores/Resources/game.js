

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
  	this.load.image("muñeco", "favicon.png");
  }

  create() {
  	this.muñeco = this.physics.add.image(100,100,"muñeco");
  	this.muñeco.setScale(5);
  	//Fisicas
  	this.muñeco.setCollideWorldBounds(true); //limita el personaje a los limites del mundo
  }

  update(time, delta) {   

  }
}