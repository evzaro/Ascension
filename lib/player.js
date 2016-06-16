var PlayerModel = function(canvas) {

  this.canvas = canvas;
  this.playerRadius = 25;
  this.playerY = 0;
  this.playerX = (this.canvas.width - this.playerRadius)/2;
  this.jumping = false;
  this.jumpVelocity = -8;
  this.addListeners();
};

handleMove = function (e) {
  this.playerX = e.pageX - this.canvas.offsetLeft - (this.playerRadius/2);
};

PlayerModel.prototype.handleJump = function() {
  this.jumping = true;
  this.jumpVelocity = -8;
  this.initiateJump();
};

PlayerModel.prototype.initiateJump = function () {
  var gravity = 0.14;

    this.playerY += this.jumpVelocity;
    this.jumpVelocity += gravity;

    if (this.playerY > 0) {
      this.jumping = false;
      this.playerY = 0;
      this.jumpVelocity = -8;
    }
};

PlayerModel.prototype.addListeners = function () {
  this.canvas.addEventListener("mousemove", handleMove.bind(this), false);
  this.canvas.addEventListener("mousedown", this.handleJump.bind(this), false);
};

PlayerModel.prototype.drawPlayer = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.playerX, this.canvas.height-this.playerRadius + this.playerY , this.playerRadius, 0, Math.PI*2);
  ctx.fill();
  if (this.jumping === true){
    this.initiateJump();
  }
  ctx.closePath();
};

module.exports = PlayerModel;
