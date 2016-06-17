
var BellModel = function(canvas) {
  this.radius = 15;
  this.canvas = canvas;
  this.y = -100;
  this.fallSpeed = 1;
  // this.jumping = false;
  this.x = (Math.random() * this.canvas.width);
};

// BellModel.prototype.handleJumpShift = function() {
//   this.oldY = this.y;
//   this.jumping = true;
//   this.jumpVelocity = 5;
//   this.initiateJumpShift();
// };
//
// BellModel.prototype.initiateJumpShift = function () {
//
//   //var gravity = -0.10;
//
//     this.y += this.jumpVelocity;
//     this.jumpVelocity += gravity;
//
//     // if (this.y > this.oldY) {
//     //  this.jumping = false;
//     //   this.jumpVelocity = 5;
//     // }
//
// };

BellModel.prototype.drawBell = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fill();
  // if (this.jumping === true){
  //   this.initiateJumpShift();
  // } else {
    this.y += this.fallSpeed;
  // }
  ctx.closePath();
};


module.exports = BellModel;
