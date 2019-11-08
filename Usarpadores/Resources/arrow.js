export default class Arrow extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, type){
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
		this.setScale(0.15);
		this.body.setVelocity(60,0);
		this.body.setCollideWorldBounds(true);
	}
	hitArrow(obj1, obj2) {
   		obj1.destroy();
		obj2.destroy();
  }
}