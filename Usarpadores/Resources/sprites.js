class Sprites extends Phaser.GameObjects.Enemies{
	constructor(scene, x, y, type){
		super(scene, x, y, type);
		scene.add.existing(this);
	}
}

export default Sprites;