var Sounds = require('./sounds.js');
var Images = require('./images.js');
var imageStore = new Images();

var soundStore = new Sounds();

var BellModel = function(canvas, score) {

  if (score < 1000) {
    this.radius = 28;
  } else if (score < 5000) {
    this.radius = 24;
  } else if (score < 9000) {
    this.radius = 20;
  } else if (score < 14000) {
    this.radius = 16;
  } else if (score > 14000) {
    this.radius = 12;
  }



  this.chime = soundStore.chime;
  this.canvas = canvas;
  this.y = -100;
  this.fallSpeed = 1.0;
  // this.shifting = false;
  this.shiftVelocity = 2.5;
  this.x = (Math.random() * this.canvas.width);
  this.fruit = imageStore.fruits[Math.floor(Math.random() * imageStore.fruits.length)];

  this.fruitSprite = imageStore.sprite({
    width: this.radius * 2.5,
    height: this.radius * 2.5,
    image: this.fruit,
  });

  this.avacado = imageStore.sprite({
    width: this.radius * 2.5,
    height: this.radius * 2.5,
    image: imageStore.avacado,
  });

  this.broc = imageStore.sprite({
    width: this.radius * 2.5,
    height: this.radius * 2.5,
    image: imageStore.broc,
  });

  this.pear = imageStore.sprite({
    width: this.radius * 2.5,
    height: this.radius * 2.5,
    image: imageStore.pear,
  });

};

BellModel.prototype.startShift = function() {
  // this.shifting = true;
  this.fallSpeed = this.shiftVelocity;
  // console.log("starting");
};

BellModel.prototype.endShift = function() {
  // this.shifting = false;
  // console.log("ending");
  // this.fallSpeed = 1;
  // console.log(this.fallSpeed);
};

BellModel.prototype.drawBell = function (ctx) {
  var pos = {y: this.y - this.radius, x: this.x - this.radius};
  this.fruitSprite.render(ctx, pos);
  // ctx.beginPath();
  // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  // ctx.fill();

    this.y += this.fallSpeed;

  // ctx.closePath();
};


module.exports = BellModel;
