var PlayerModel = function(canvas) {
  this.canvas = canvas;
  this.playerRadius = 25;
  this.playerY = 0;
  this.playerX = (this.canvas.width - this.playerRadius)/2;
  this.jumping = false;
  this.jumpVelocity = -4.5;
  this.startedAscent = false;
  this.addListeners();
};

handleMove = function (e) {
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
      }
      this.jumping = false;
      this.playerY = 0;
      this.jumpVelocity = -5;
    }



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


  ctx.beginPath();
  ctx.arc(this.playerX, this.canvas.height-this.playerRadius + this.playerY , this.playerRadius, 0, Math.PI*2);
  ctx.fill();
  if (this.jumping === true){
    this.initiateJump();
  }
  ctx.closePath();
};

module.exports = PlayerModel;
