
var BellModel = function(canvas) {
  this.radius = 15;
  this.canvas = canvas;
  this.y = -100;
  this.fallSpeed = 1;
  // this.shifting = false;
  this.shiftVelocity = 3.5;
  this.x = (Math.random() * this.canvas.width);
};

BellModel.prototype.startShift = function() {
  // this.shifting = true;
  this.fallSpeed = this.shiftVelocity;
};

BellModel.prototype.endShift = function() {
  // this.shifting = false;
  this.fallSpeed = 1;
};

BellModel.prototype.drawBell = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fill();

    this.y += this.fallSpeed;

  ctx.closePath();
};


module.exports = BellModel;
