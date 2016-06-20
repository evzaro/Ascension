var Images = require('./images.js');

var imageStore = new Images();
function Background() {
  this.falling = false;
  this.x = 0;
  this.y = 0;
	this.panningSpeed = 0.5;
	this.draw = function() {
		this.y += this.panningSpeed;
		this.context.drawImage(imageStore.background, this.x, this.y);
		this.context.drawImage(imageStore.background, this.x, this.y - this.canvasHeight);
		if (this.y >= this.canvasHeight) {
			this.y = 0;
    } else if (this.falling === true) {
      this.panningSpeed = -1.0;
    }

	};
}

module.exports = Background;
