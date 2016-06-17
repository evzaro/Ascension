var Images = require('./images.js');

var imageStore = new Images();
function Background() {
  this.x = 0;
  this.y = 0;
	this.panningSpeed = 0.5;
	this.draw = function() {
		// Pan background
		this.y += this.panningSpeed;
		this.context.drawImage(imageStore.background, this.x, this.y);
		// Draw another image at the top edge of the first image
		this.context.drawImage(imageStore.background, this.x, this.y - this.canvasHeight);
		// If the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}

module.exports = Background;
