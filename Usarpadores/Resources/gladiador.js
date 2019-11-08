export default class Gladiator extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, type){
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
        this.setScale(0.8);
        this.body.setVelocity(-40,0);
		this.body.setCollideWorldBounds(true);
	}
}