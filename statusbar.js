
export default class StatusBar extends Phaser.GameObjects.Sprite {
constructor(scene, x , y, type)
{   
    super(scene, x, y, type);
    scene.add.existing(this);
    this.setScale(0.2);
   // this.create(0,0,"statBar");
}
setPercent(percent)
{
    console.log(this.width);
    percent=percent/100;
    this.width = 750*percent;
    this.setScale(this.width*0.0001,0.2);


}
}
