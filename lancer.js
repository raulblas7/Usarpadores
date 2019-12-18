import Sprites from "./sprites.js";

export default class Lancer extends Sprites{
	constructor(scene, x, y, type){
		super(scene, x, y, type);
        this.setScale(0.8);
        this.body.setVelocity(-50,0);
	}
}