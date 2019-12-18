import Sprites from "./sprites.js";

export default class Explosion extends Sprites{
	constructor(scene, x, y, type){
		super(scene, x, y, type);
        this.setScale(0.3);
        this.body.setImmovable(true);
    }
    hitExp(obj1, obj2) {
        obj1.destroy();
    }
}