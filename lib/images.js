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

	this.apple = new Image();
	this.apple.src = "./images/apple.png";

	this.avacado = new Image();
	this.avacado.src = "./images/avacado.png";

	this.broc = new Image();
	this.broc.src = "./images/broc.png";

	this.pear = new Image();
	this.pear.src = "./images/pear.png";

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

	this.fruits = [this.avacado, this.pear, this.broc, this.apple];
};


module.exports = Images;
