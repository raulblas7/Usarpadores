import Gladiator from './gladiador.js';
//this.load.image("gladiador", "images/gladiador1.png");

export default class Spawner{
	constructor(scene, x, y){
        //super(scene, x, y);
        console.log(x);
    }
    
    SpawnObject(obj){
        this.load.image("gladiador", "images/gladiador1.png");
        this.gladiador = new Gladiator(this, 200, 415, "gladiador");
        console.log("3secondshavepassed");
        //const Gladiadurr = Object.create(obj);
        //this.gladiador = new Gladiator(this, 600, 415, "gladiador");
    }
}