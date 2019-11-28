import Sprites from "./sprites.js";

export default class Arrow extends Sprites{
	constructor(scene, x, y, type){
		super(scene, x, y, type);
		this.setScale(0.15);
		this.body.setVelocity(500,0);
	}
	hitArrow(obj1, obj2) {
   		obj1.destroy();
		obj2.destroy();
  }
}