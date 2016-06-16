var PlayerModel = function(canvas) {

  this.canvas = canvas;
  this.playerHeight = 30;
  this.playerWidth = 30;

  this.playerY = 0;
  this.playerX = (this.canvas.width - this.playerWidth)/2;

  this.jumping = false;
  this.jumpVelocity = -7;

  this.addListeners();
};

handleMove = function (e) {
  this.playerX = e.pageX - this.canvas.offsetLeft - this.playerWidth;
};

handleJump = function() {
  this.jumping = true;
  this.initiateJump();
};

PlayerModel.prototype.initiateJump = function () {
  var gravity = 0.14;

  this.playerY += this.jumpVelocity;
  this.jumpVelocity += gravity;

  if (this.playerY > 0) {
    this.jumping = false;
    this.playerY = 0;
    this.jumpVelocity = -7;
  }
};

PlayerModel.prototype.addListeners = function () {
  this.canvas.addEventListener("mousemove", handleMove.bind(this), false);
  this.canvas.addEventListener("mousedown", handleJump.bind(this), false);
};

PlayerModel.prototype.drawPlayer = function (ctx) {
  ctx.beginPath();
  ctx.rect(this.playerX, this.canvas.height-this.playerHeight + this.playerY , this.playerWidth, this.playerHeight);
  ctx.fill();
  if (this.jumping === true){
    this.initiateJump();
  }
  ctx.closePath();
};


module.exports = PlayerModel;
