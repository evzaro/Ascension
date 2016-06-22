var Images = require('./images.js');
var imageStore = new Images();

var PlayerModel = function(canvas, deathFunc) {
  this.canvas = canvas;
  this.playerRadius = 25;
  this.playerY = 0;
  this.playerX = (this.canvas.width - this.playerRadius)/2;
  this.jumping = false;
  this.jumpVelocity = -4.5;
  this.startedAscent = false;
  this.addListeners();
  this.dead = false;
  this.deathFunc = deathFunc;

  this.leftsit = imageStore.sprite({
    width: 80,
    height: 80,
    image: imageStore.leftsit,
  });

  this.leftjump = imageStore.sprite({
    width: 80,
    height: 80,
    image: imageStore.leftjump,
  });

  this.rightsit = imageStore.sprite({
    width: 80,
    height: 80,
    image: imageStore.rightsit,
  });

  this.rightjump = imageStore.sprite({
    width: 80,
    height: 80,
    image: imageStore.rightjump,
  });

};



handleMove = function (e) {
  if (e.movementX > 0){
    this.direction = "right";
  } else if (e.movementX < 0) {
    this.direction = "left";
  }
  this.playerX = e.pageX - this.canvas.offsetLeft - (this.playerRadius/2);
};

PlayerModel.prototype.handleJump = function() {

  this.jumping = true;
  this.jumpVelocity = -5;


};

PlayerModel.prototype.initiateJump = function () {
  var gravity = 0.10;
    this.removeListener();
    this.playerY += this.jumpVelocity;
    this.jumpVelocity += gravity;

    if (this.playerY > 0) {
      if (this.startedAscent === false) {
        this.addListeners();
      } else {
        this.handleDeath();

      }
      this.jumping = false;
      this.playerY = 0;
      this.jumpVelocity = -5;
    }
};

PlayerModel.prototype.handleDeath = function () {
  this.dead = true;
  window.setTimeout(this.deathFunc, 5000);
};

PlayerModel.prototype.addListeners = function () {
  this.listener = this.handleJump.bind(this);
  this.canvas.addEventListener("mousemove", handleMove.bind(this), false);
  this.canvas.addEventListener("mousedown", this.listener, false);
};

PlayerModel.prototype.removeListener = function () {

  this.canvas.removeEventListener("mousedown", this.listener, false);
};



PlayerModel.prototype.drawPlayer = function (ctx) {
  var pos = {y: this.canvas.height-this.playerRadius + this.playerY - 45, x: this.playerX - 40};
  if (this.direction === "left") {
    if (this.jumpVelocity > 2){
      this.leftsit.render(ctx, pos);
    } else if (this.jumping){
      this.leftjump.render(ctx, pos);
    } else {
      this.leftsit.render(ctx, pos);
    }
  } else if (this.direction === "right") {
    if (this.jumpVelocity > 2){
      this.rightsit.render(ctx, pos);
    } else if (this.jumping){
      this.rightjump.render(ctx, pos);
    } else {
      this.rightsit.render(ctx, pos);
    }
  }

  // ctx.beginPath();
  // ctx.arc(this.playerX, this.canvas.height-this.playerRadius + this.playerY , this.playerRadius, 0, Math.PI*2);
  //ctx.fill();
  if (this.jumping === true){
    this.initiateJump();
  }
  // ctx.closePath();
};



module.exports = PlayerModel;
