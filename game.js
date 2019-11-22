
import Arrow from './arrow.js';
import Player from './player.js';
import Gladiator from './gladiador.js';
import Lancer from './lancer.js';
import Fighter from './fighter.js';
import StatusBar from './statusbar.js';
import Health from './health.js';
//
import Wave from './wave.js';

//variables para la cantidad de enemigos
var numGladiadores;
var numGuerreros;
var numLancers;
var actNumGladiadores = 0;
var actNumGuerreros = 0;
var actNumLancers = 0;
export default class Game extends Phaser.Scene {
  constructor(   
    ) {
    super({ key: 'Game' } );
  }

   preload() {  
    //suelo
    this.load.image("terreno", "images/terreno.png");
    //sprites
  	this.load.image("gladiador", "images/gladiador1.png");
    this.load.image("gladiador2", "images/gladiador1.png");
  	this.load.image("jugador", "images/jugador1.png");
  	this.load.image("guerrero", "images/Guerrero1.png");
  	this.load.image("lancer", "images/lancer1.png");
    this.load.image("flecha","images/Arrow1.png")
    //muro
    this.load.image("muro", "images/muro.png");
    //barra de vida
    this.load.image("statBar","images/statusbar.png");
    //flecha lanzada es false al inicio
    this.lanzada = false;
  }
  create() {
  //this.statBar=new StatusBar();
    this.platforms = this.physics.add.staticGroup();
    this.terreno = this.add.image(0,0, "terreno");
    this.platforms.create(87.5, 225, "muro");
    this.jugador = new Player(this,87.5,225, "jugador");
    this.guerrero = new Fighter(this, 600, 315, "guerrero");
    this.gladiador2 = new Gladiator(this, 600, 115, "gladiador");
    this.lancer = new Lancer(this, 600, 215, "lancer");
    this.statbar = new StatusBar(this, 400, 35, "statBar");
    this.health = 100;
  	this.terreno.setScale(7);
    //
    this.wave = new Wave(1);
    //control de enemigos por oleada
    if(this.wave.number == 1){
      numGladiadores = 2;
      numGuerreros = 2;
      numLancers = 2;
    }
    else if(this.wave.number == 2){
      alert("haw");
    }


    this.cursor = this.input.keyboard.createCursorKeys();

    this.timeIni = 0;
    this.timeSpawn = Phaser.Math.Between(100, 500);  
    this.gladiadores = this.add.group();
    this.guerreros = this.add.group();
    this.lancers = this.add.group();

    //colision enemigos y muro
    this.physics.add.collider(this.guerreros,this.platforms,this.damage,null,this);
    this.physics.add.collider(this.gladiadores, this.platforms,this.damage,null,this);
    this.physics.add.collider(this.gladiador2, this.platforms,this.damage,null,this);
    this.physics.add.collider(this.lancers, this.platforms,this.damage,null,this);

    
  }
  update(time, delta) {  
    
    this.Create2; 
    
    //control del jugador
    if(this.cursor.down.isDown){
        this.jugador.body.setVelocityY(60);
    }
    else if(this.cursor.up.isDown){
        this.jugador.body.setVelocityY(-60);
    }
    else {
        this.jugador.body.setVelocityY(0);
    }
    //control del lanzamiento de flechas
    if(this.cursor.right.isDown)
    {
      if (!this.lanzada){
       // this.statbar.setPercent(200);
        this.flecha = new Arrow(this,this.jugador.x + (this.jugador.x/2), this.jugador.y, "flecha");
       // console.log(this.flecha);
        this.lanzada = true;
      }
    }
    else if(this.cursor.right.isUp){

      this.lanzada = false;
    }
    if (this.flecha != undefined) {
      this.physics.add.collider(this.guerreros,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.gladiadores,this.flecha,this.flecha.hitArrow,null,this);
      //this.physics.add.collider(this.gladiador2,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.lancers,this.flecha,this.flecha.hitArrow,null,this);
    }

    //spawn de enemigos
    if (this.gladiadores != undefined && this.guerreros != undefined && this.lancers != undefined) {
        if(this.timeIni >= this.timeSpawn){

          this.randomNum = Phaser.Math.Between(0, 2); //eleccion aleatoria de enemigo a colocar
          this.locationYSpawn = Phaser.Math.Between(0, 450); //posicion aleatoria de spawn ////////////////////////////////////////////////////
          if(this.randomNum == 0 && actNumGladiadores < numGladiadores){           
            this.gladiadores.add(new Gladiator(this, 600, this.locationYSpawn, "gladiador"));
            actNumGladiadores++;
          }
          else if(this.randomNum == 1 && actNumGuerreros < numGuerreros){
            this.guerreros.add(new Fighter(this, 600, this.locationYSpawn, "guerrero"));
            actNumGuerreros++;
          }
          else if(this.randomNum == 2 && actNumLancers < numLancers){
            this.gladiadores.add(new Lancer(this, 600, this.locationYSpawn, "lancer"));
            actNumLancers++;
          }

          this.timeIni = 0;
          this.timeSpawn = Phaser.Math.Between(200, 500);
        }
        else{
          this.timeIni += 3;
        }
    }    
  }

  damage(enemy,platform){
    if (this.health>0)
    {
      this.health -= 10;
      console.log(this.health);   
    }
  }
  
}
