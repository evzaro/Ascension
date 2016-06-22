var Images = function() {

	this.background = new Image();
	this.background.src = "./images/bg.png";
	// this.left = new Image();
	// this.left.src = "./images/leftsprite.png";
	this.leftsit = new Image();
	this.leftsit.src = "./images/leftsit.png";
	this.leftjump = new Image();
	this.leftjump.src = "./images/leftjump.png";
	// this.right = new Image();
	// this.right.src = "./images/rightsprite.png";
	this.rightsit = new Image();
	this.rightsit.src = "./images/rightsit.png";
	this.rightjump = new Image();
	this.rightjump.src = "./images/rightjump.png";

	this.sprite = function (options) {

    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
		that.render = function (ctx, options) {
       ctx.drawImage(
         that.image,
       		options.x,
       		options.y,
       		that.width,
        	that.height
      //  50,
      //  50,
      //  options.width,
      //  options.height
				);
    };
    return that;
	};
};


module.exports = Images;
