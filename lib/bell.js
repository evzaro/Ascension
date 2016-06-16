
var BellModel = function(canvas) {
  this.radius = 15;
  this.canvas = canvas;
  this.y = -50;
  this.fallSpeed = 1;
  this.x = (Math.random() * this.canvas.width);
};

BellModel.prototype.drawBell = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
  this.y += this.fallSpeed;

};


module.exports = BellModel;
