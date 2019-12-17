
import Arrow from './arrow.js';
import Player from './player.js';
import Gladiator from './gladiador.js';
import Lancer from './lancer.js';
import Fighter from './fighter.js';
import StatusBar from './statusbar.js';
import Health from './health.js';
import Wave from './wave.js';

//variables para la cantidad de enemigos
var numGladiadores;
var numGuerreros;
var numLancers;
var actNumGladiadores = 0;
var actNumGuerreros = 0;
var actNumLancers = 0;
//var totalEnemigos;
export default class Game extends Phaser.Scene {
  constructor(   
    ) {
    super({ key: 'Game' } );
  }

   preload() {  
    //suelo
    this.load.image("terreno", "images/terreno.png");
    this.load.image('tablero', "images/tablero.png");

    //sprites
  	this.load.image("gladiador", "images/gladiador1.png");
    this.load.image("gladiador2", "images/gladiador1.png");
  	this.load.image("jugador", "images/jugador1.png");
  	this.load.image("guerrero", "images/Guerrero1.png");
  	this.load.image("lancer", "images/lancer1.png");
    this.load.image("flecha","images/Arrow1.png")
    //muro
    this.load.image("muro", "images/muro.png");

    this.lanzada = false;
    this.registry.set('points',0);
    this.registry.set('health',500);

    this.puntos=0;
    this.health=500;
  }
  create() {
    
    this.scene.launch('UI');
    this.platforms = this.physics.add.staticGroup();
    this.terreno = this.add.image(0,0, "terreno");
    this.gladiadores = this.add.group();
    this.guerreros = this.add.group();
    this.lancers = this.add.group();
    this.platforms.create(87.5, 225, "muro");
    this.jugador = new Player(this,87.5,225, "jugador");
    this.guerrero = new Fighter(this, 800, 315, "guerrero");
    this.gladiador2 = new Gladiator(this, 800, 115, "gladiador");
    this.lancer = new Lancer(this, 800, 215, "lancer");
  	this.terreno.setScale(7);
    //
    this.wave = new Wave(1);
    //control de enemigos por oleada
    if(this.wave.number >= 0){
      numGladiadores = this.wave.numGladiadores1;
      numGuerreros = this.wave.numGuerreros1;
      numLancers = this.wave.numLancers1;
      //totalEnemigos = numGladiadores + numGuerreros + numLancers;
    }
    this.totalEnemigos = numGladiadores + numGuerreros + numLancers;
 
    this.cursor = this.input.keyboard.createCursorKeys();

    //control de tiempos de spawn de enemigos
    this.timeIni = 0;
    this.timeSpawnGlad = /*Phaser.Math.Between(3000, 5000)*/ 2000;
    this.timeSpawnFight = 3000;
    this.timeSpawnLanc = 5000; 
    this.timeIniGlad = 0;
    this.timeIniFight = 0;
    this.timeIniLanc = 0;

    //colision enemigos y muro
    this.physics.add.collider(this.guerreros,this.platforms,this.damage,null,this);
    this.physics.add.collider(this.gladiadores, this.platforms,this.damage,null,this);
    this.physics.add.collider(this.gladiador2, this.platforms,this.damage,null,this);
    this.physics.add.collider(this.lancers, this.platforms,this.damage,null,this);

   this.registry.events.on('changedata',(parent,key,data)=>
    {
     if(key==='points'){console.log(data);}
      if(key==='vida'){console.log(data);}

    });
    
  }
  update(time, delta) {  
    
    //control del jugador
    if(this.cursor.down.isDown){
        this.jugador.body.setVelocityY(200);
    }
    else if(this.cursor.up.isDown){
        this.jugador.body.setVelocityY(-200);
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
    /*  this.physics.add.collider(this.guerreros,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.gladiadores,this.flecha,this.flecha.hitArrow,null,this);
      //this.physics.add.collider(this.gladiador2,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.lancers,this.flecha,this.flecha.hitArrow,null,this);

      ////////////////////////////////////////////////////////////////////////
      this.physics.add.collider(this.guerreros,this.flecha,this.lessEnem);
      this.physics.add.collider(this.gladiadores,this.flecha,this.lessEnem);
      //this.physics.add.collider(this.gladiador2,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.lancers,this.flecha,this.lessEnem);*/
    

      this.physics.add.collider(this.guerreros,this.flecha,this.hit,null,this);
      this.physics.add.collider(this.gladiadores,this.flecha,this.hit,null,this);
      //this.physics.add.collider(this.gladiador2,this.flecha,this.flecha.hitArrow,null,this);
      this.physics.add.collider(this.lancers,this.flecha,this.hit,null,this);
      
     
     
    }
      console.log(this.totalEnemigos);
    if(this.totalEnemigos<=0){
      alert("fin oleada");
    }

    //spawn de enemigos
    if (this.gladiadores != undefined && this.guerreros != undefined && this.lancers != undefined) {

          //creacion de enemigos
          if(this.timeIniGlad >= this.timeSpawnGlad && actNumGladiadores < numGladiadores){    
            this.locationYSpawn = Phaser.Math.Between(0, 450); //posicion aleatoria de spawn        
            this.gladiadores.add(new Gladiator(this, 600, this.locationYSpawn, "gladiador"));
            actNumGladiadores++;
            this.timeIniGlad = 0;
          }
          else{
            this.timeIniGlad+= delta;
          }

          if(this.timeIniFight >= this.timeSpawnFight && actNumGuerreros < numGuerreros){    
            this.locationYSpawn = Phaser.Math.Between(0, 450); //posicion aleatoria de spawn        
            this.guerreros.add(new Fighter(this, 600, this.locationYSpawn, "guerrero"));
            actNumGuerreros++;
            this.timeIniFight = 0;
          }
          else{
            this.timeIniFight += delta;
          }

          if(this.timeIniLanc >= this.timeSpawnLanc && actNumLancers < numLancers){    
            this.locationYSpawn = Phaser.Math.Between(0, 450); //posicion aleatoria de spawn        
            this.lancers.add(new Lancer(this, 600, this.locationYSpawn, "lancer"));
            actNumLancers++;
            this.timeIniLanc = 0;
          }
          else{
            this.timeIniLanc += delta;
          }
        
          this.timeSpawnGlad = /*Phaser.Math.Between(3000, 5000)*/ 2000;
          this.timeSpawnFight = 3000;
          this.timeSpawnLanc = 5000;
        }      
  }

  damage(enemy,platform){
    

    if (this.health>0)
    {
      this.health-=100;
      this.registry.events.emit('vida',this.health);
       }
    else {this.scene.start('GameOver');}
  }

  lessEnem(){
    
    this.totalEnemigos -= 1;
    alert(this.totalEnemigos);
  }
  hit(enemy,flecha)
  {
 
   this.lessEnem();

   flecha.hitArrow(enemy,flecha);

   this.puntos++;
   this.registry.events.emit('puntos',this.puntos);

  

    
  }
  
}
