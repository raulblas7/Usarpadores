
import Arrow from './arrow.js';
import Player from './player.js';
import Gladiator from './gladiador.js';
import Lancer from './lancer.js';
import Fighter from './fighter.js';
import StatusBar from './statusbar.js';
import Health from './health.js';
import Wave from './wave.js';
import PowHealth from './PowHealth.js';
import PowBomb from './PowBomb.js';
import PowSpeed from './PowSpeed.js';
//variables para la cantidad de enemigos
var numGladiadores;
var numGuerreros;
var numLancers;
var actNumGladiadores = 0;
var actNumGuerreros = 0;
var actNumLancers = 0;
//variable de oleada
var numOleada = 1;
var ponTitulo = true;
//velocidad de jugador
var playVel = 200;
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
    this.load.image("flecha","images/Arrow1.png");
    //powups
    this.load.image("health", "images/POWUPSALUD.png");
    this.load.image("bomb", "images/POWUPBOMB.png");
    this.load.image("speed", "images/POWUPSPEED.png");
    this.load.image("explosion", "images/Explosion.png");
    //muro
    this.load.image("muro", "images/muro.png");
    //texto
    this.load.image("finOleada", "images/finoleada.png");


    this.lanzada = false;
    this.registry.set('points',0);
    this.registry.set('health',1000);

    this.puntos=0;
    this.health=1000;
  }
  create() {
    //botones para los power-ups
    this.input.keyboard.on('keydown_Q', this.powHealing, this);
    this.input.keyboard.on('keydown_W', this.powBombing, this);
    this.input.keyboard.on('keydown_E', this.powSpeeding, this);
    
    this.scene.launch('UI');
    this.platforms = this.physics.add.staticGroup();
    this.terreno = this.add.image(0,0, "terreno");
    this.gladiadores = this.add.group();
    this.guerreros = this.add.group();
    this.lancers = this.add.group();
    this.platforms.create(87.5, 225, "muro");
    this.jugador = new Player(this,87.5,225, "jugador");
    this.guerrero = new Fighter(this, 800, 600, "guerrero");
    this.gladiador2 = new Gladiator(this, 800, 600, "gladiador");
    this.lancer = new Lancer(this, 800, 600, "lancer");

    this.statbar = new StatusBar(this, 400, 35, "statBar");
    this.health = 100;
    this.terreno.setScale(7);
    
    this.powHealth = new PowHealth(this, 30, 425, "health");
    this.powBomb = new PowBomb(this, 70, 425, "bomb");
    this.powSpeed = new PowSpeed(this, 110, 425, "speed");

    this.wave = new Wave(numOleada);
    //control de enemigos por oleada
    if(this.wave.number >= 0){
      numGladiadores = this.wave.numGladiadores1;
      numGuerreros = this.wave.numGuerreros1;
      numLancers = this.wave.numLancers1;
    }
    this.totalEnemigos = numGladiadores + numGuerreros + numLancers;
 
    this.cursor = this.input.keyboard.createCursorKeys();

    //control de tiempos de spawn de enemigos
    this.timeIni = 0;
    this.timeIniGlad = 0;
    this.timeIniFight = 0;
    this.timeIniLanc = 0;
    //control de timepo entre oleada
    this.timeOleada = 5000;
    //control de tiempo lanzamineto flechas
    this.timeArrow = 250;

    //colision enemigos y muro
    this.physics.add.collider(this.guerreros,this.platforms,this.damage,null,this);
    this.physics.add.collider(this.gladiadores, this.platforms,this.damage,null,this);
    this.physics.add.collider(this.gladiador2, this.platforms,this.damage,null,this);
    this.physics.add.collider(this.lancers, this.platforms,this.damage,null,this);

   this.registry.events.on('changedata',(parent,key,data)=>
    {
      if(key==='points'){console.log(data);}
      if(key==='health'){console.log(data);}

    });
    
  }
  update(time, delta) {  
    /////////////////////////////////////////////////////control jugador y flechas////////////////////////////////////////////////////
    //control del jugador
    if(this.cursor.down.isDown){
        this.jugador.body.setVelocityY(playVel);
    }
    else if(this.cursor.up.isDown){
        this.jugador.body.setVelocityY(-playVel);
    }
    else {
        this.jugador.body.setVelocityY(0);
    }
    //control del lanzamiento de flechas
    if(this.cursor.right.isDown)
    {
      this.timeArrow -= delta;
      if(this.timeArrow <= 0){
        if (!this.lanzada){
          this.flecha = new Arrow(this,this.jugador.x + (this.jugador.x/2), this.jugador.y, "flecha");
          this.lanzada = true;
        }
        this.timeArrow = 250;
      }
    }
    else if(this.cursor.right.isUp){
      this.lanzada = false;
    }
    if (this.flecha != undefined) {

      this.physics.add.collider(this.guerreros,this.flecha,this.flechaGolpea, null, this);
      this.physics.add.collider(this.gladiadores,this.flecha,this.flechaGolpea, null, this);
      this.physics.add.collider(this.lancers,this.flecha,this.flechaGolpea, null, this);
    }

    /////////////////////////////////////////////////////control oleadas////////////////////////////////////////////////////
    console.log(this.totalEnemigos);

    
    if(this.totalEnemigos<=0){
        
        if(ponTitulo){
          this.finOleada = this.add.image(350, 225, "finOleada");
          ponTitulo = false;
        }
        
        this.timeOleada -= delta;
        

        if(this.timeOleada <= 0){
          numOleada++;
          this.wave = new Wave(numOleada);
          numGladiadores = this.wave.numGladiadores1;
          numGuerreros = this.wave.numGuerreros1;
          numLancers = this.wave.numLancers1;
          this.totalEnemigos = numGladiadores + numGuerreros + numLancers;

          actNumGuerreros = actNumLancers = actNumGladiadores = 0;

          this.timeIni = 0;
          this.timeIniGlad = 0;
          this.timeIniFight = 0;
          this.timeIniLanc = 0;

          this.finOleada.destroy();

          this.timeOleada = 5000;
          ponTitulo = true;
        } 
    }

    /////////////////////////////////////////////////////spawn de enemigos////////////////////////////////////////////////////
    if (this.gladiadores != undefined && this.guerreros != undefined && this.lancers != undefined) {

          //creacion de enemigos
          if(this.timeIniGlad >= this.timeSpawnGlad && actNumGladiadores < numGladiadores){    
            this.locationYSpawn = Phaser.Math.Between(60, 390); //posicion aleatoria de spawn        
            this.gladiadores.add(new Gladiator(this, 600, this.locationYSpawn, "gladiador"));
            actNumGladiadores++;
            this.timeIniGlad = 0;
          }
          else{
            this.timeIniGlad+= delta;
          }

          if(this.timeIniFight >= this.timeSpawnFight && actNumGuerreros < numGuerreros){    
            this.locationYSpawn = Phaser.Math.Between(60, 390); //posicion aleatoria de spawn        
            this.guerreros.add(new Fighter(this, 600, this.locationYSpawn, "guerrero"));
            actNumGuerreros++;
            this.timeIniFight = 0;
          }
          else{
            this.timeIniFight += delta;
          }

          if(this.timeIniLanc >= this.timeSpawnLanc && actNumLancers < numLancers){    
            this.locationYSpawn = Phaser.Math.Between(60, 390); //posicion aleatoria de spawn        
            this.lancers.add(new Lancer(this, 600, this.locationYSpawn, "lancer"));
            actNumLancers++;
            this.timeIniLanc = 0;
          }
          else{
            this.timeIniLanc += delta;
          }
        
          this.timeSpawnGlad = /*Phaser.Math.Between(3000, 5000)*/ 200;
          this.timeSpawnFight = 300;
          this.timeSpawnLanc = 500;
        }      
  }

  /////////////////////////////////////////////////////resto de metodos////////////////////////////////////////////////////
  damage(enemy,platform){
    if (this.health>0)
    {
      this.health -= 10;
      this.registry.set('health',this.health);
    }
    else {this.scene.start('GameOver');}
  }

  lessEnem(){   
    this.totalEnemigos -= 1;
    console.log(this.totalEnemigos);
  }

  flechaGolpea(enemy, arrow){
    this.flecha.hitArrow(enemy, arrow);   
    this.lessEnem();
  }

  powHealing(){ //aqui controlamos el tiempo de cada uno
    console.log("healed");
  }

  powBombing(){
    console.log("bombed");
    this.bomb = this.add.image(350, 225, "bomb");
    this.bomb.setScale(0.1);
    this.Explosion = this.add.image(350,225, "explosion");
    this.Explosion.setScale(0.1);
  }

  powSpeeding(){
    console.log("sped up");
    playVel = 500;
  }
  
}
