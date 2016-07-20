/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var PlayerModel = __webpack_require__(1);
	var BellModel = __webpack_require__(3);
	var Background = __webpack_require__(5);
	
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var player = new PlayerModel(canvas, gameOver);
	var score = 0;
	var high_score = 0;
	var currentBellPointVal = 10;
	var bells = {};
	var bell_num = 0;
	
	var Images = __webpack_require__(2);
	var imageStore = new Images();
	
	var Sounds = __webpack_require__(4);
	var soundStore = new Sounds();
	soundStore.music.play();
	
	var bgCanvas = document.getElementById('background');
	var bgContext = bgCanvas.getContext('2d');
	Background.prototype.context = bgContext;
	Background.prototype.canvasWidth = bgCanvas.width;
	Background.prototype.canvasHeight = bgCanvas.height;
	var background = new Background();
	
	var makeNewBell = function () {
		if (player.dead === false) {
	  	bells[bell_num]=(new BellModel(canvas, score));
			bell_num += 1;
		}
	};
	
	function handleScore (){
	  score += currentBellPointVal;
	  currentBellPointVal += 10;
	}
	
	function checkCollision (bell) {
	  var dx = player.playerX - bell.x;
	  var dy = (canvas.height - player.playerRadius + player.playerY) - bell.y;
	  var distance = Math.sqrt(dx * dx + dy * dy);
	
	  if (distance < player.playerRadius + bell.radius) {
	    handleScore();
			bell.chime.play();
	    return true;
	  } else {
	    return false;
	  }
	}
	
	function draw () {
	  background.draw();
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.fillStyle = 'white';
	  ctx.fillText(score, 5, 15);
	  player.drawPlayer(ctx);
	
		Object.keys(bells).forEach(function(bell_num){
	
			if (player.startedAscent === true && bells[bell_num].y > 500 + bells[bell_num].radius) {
				delete bells[bell_num];
			} else if (player.startedAscent === false && bells[bell_num].y > 300 + bells[bell_num].radius) {
				delete bells[bell_num];
			} else {
				bells[bell_num].drawBell(ctx);
				if (player.dead === false){
		      if (checkCollision(bells[bell_num])){
						player.startedAscent = true;
		        delete bells[bell_num];
		        if ( (canvas.height-player.playerRadius + player.playerY) > canvas.height * 0.3){
		          player.handleJump();
						} else {
							player.handleJump();
							// var timers = [];
							// Object.keys(bells).forEach(function(bell_num){
							//     bells[bell_num].startShift();
							// 		window.setTimeout(bells[bell_num].endShift, 50);
							// });
						}
					}
				} else {
					if (player.playerY > -220){
						player.playerY += -0.15;
					}
					bells[bell_num].fallSpeed = -5;
					background.falling = true;
				}
			}
		});
	
		// if ( (canvas.height-player.playerRadius + player.playerY) <= canvas.height * 0.27){
		//
	  //   player.jumpVelocity = player.jumpVelocity/1.3;
	  //   Object.keys(bells).forEach(function(bell_num){
	  //     bells[bell_num].startShift();
	  //   });
	  // } else {
	  //   Object.keys(bells).forEach(function(bell_num){
	  //     bells[bell_num].endShift();
	  //   });
	  // }
	
	  // for (var i = 0; i < bells.length; i++) {
		//
	  //    if (bells[i].y > 500 + bells[i].radius) {
	  //     bells.pop(); //clear bell when off screen
	  //   } else {
		// 		if (player.dead === false){
		//       bells[i].drawBell(ctx);
		//       if (checkCollision(bells[i])){
		// 				player.startedAscent = true;
		//         bells.splice(i, 1);
		//         if ( (canvas.height-player.playerRadius + player.playerY) > canvas.height * 0.3){
		//           player.handleJump();
		//         }
		//       }
		// 		} else {
		// 			if (player.playerY > -220){
		// 				player.playerY += -0.15;
		// 			}
		// 			bells[i].fallSpeed = -5;
		// 			bells[i].drawBell(ctx);
		// 			background.falling = true;
		// 		}
	  //    }
	  // }
		//
	  // if ( (canvas.height-player.playerRadius + player.playerY) <= canvas.height * 0.27){
		//
	  //   player.jumpVelocity = player.jumpVelocity/1.3;
	  //   bells.forEach(function(bell){
	  //     bell.startShift();
	  //   });
	  // } else {
	  //   bells.forEach(function(bell){
	  //     bell.endShift();
	  //   });
	  // }
	
	ctx.font = "15px comic-sans";
	ctx.fillText(score, 5, 15);
	}
	
	function gameOver (){
		window.clearInterval(bellMaker);
		window.clearInterval(mainDraw);
		if (high_score < score){
			high_score = score;
		}
		drawGameOver();
		canvas.addEventListener('click', run, false);
		player = new PlayerModel(canvas, gameOver);
		score = 0;
		currentBellPointVal = 10;
		bells = [];
		background.falling = false;
		background.panningSpeed = 0.6;
	}
	
	function drawIntro() {
		imageStore.splash.onload = function() {
		ctx.drawImage(imageStore.splash, 0,0);
		};
	}
	
	function drawGameOver() {
			ctx.fillStyle = '#000033';
	    ctx.fillRect(0,0,canvas.width, canvas.height);
			ctx.fillStyle = 'white';
			ctx.font = "70px comic-sans";
			ctx.fillText("GAME OVER", 150, 55);
			ctx.font = "30px comic-sans";
			ctx.fillText("Your score: " + score, 35, 140);
			ctx.fillText("Your high score: " + high_score, 35, 180);
			ctx.font = "30px comic-sans";
	
			ctx.font = "15px comic-sans";
			ctx.fillText("Click anywhere to try again", 35, 300);
	}
	
	drawIntro();
	canvas.addEventListener('click', run, false);
	
	function run(){
		canvas.removeEventListener('click', run, false);
		bellMaker = window.setInterval(makeNewBell, 380);
		mainDraw = window.setInterval(draw, 10);
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Images = __webpack_require__(2);
	var imageStore = new Images();
	
	var PlayerModel = function(canvas, deathFunc) {
	  this.canvas = canvas;
	  this.playerRadius = 25;
	  this.playerY = 0;
	  this.playerX = (this.canvas.width - this.playerRadius)/2;
	  this.jumping = false;
	  this.jumpVelocity = -4.5;
	  this.startedAscent = false;
	  this.addListeners();
	  this.dead = false;
	  this.deathFunc = deathFunc;
	
	  this.leftsit = imageStore.sprite({
	    width: 80,
	    height: 80,
	    image: imageStore.leftsit,
	  });
	
	  this.leftjump = imageStore.sprite({
	    width: 80,
	    height: 80,
	    image: imageStore.leftjump,
	  });
	
	  this.rightsit = imageStore.sprite({
	    width: 80,
	    height: 80,
	    image: imageStore.rightsit,
	  });
	
	  this.rightjump = imageStore.sprite({
	    width: 80,
	    height: 80,
	    image: imageStore.rightjump,
	  });
	
	};
	
	
	
	handleMove = function (e) {
	  if (e.movementX > 0){
	    this.direction = "right";
	  } else if (e.movementX < 0) {
	    this.direction = "left";
	  }
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
	      } else {
	        this.handleDeath();
	
	      }
	      this.jumping = false;
	      this.playerY = 0;
	      this.jumpVelocity = -5;
	    }
	};
	
	PlayerModel.prototype.handleDeath = function () {
	  this.dead = true;
	  window.setTimeout(this.deathFunc, 5000);
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
	  var pos = {y: this.canvas.height-this.playerRadius + this.playerY - 45, x: this.playerX - 40};
	  if (this.direction === "left") {
	    if (this.jumpVelocity > 1){
	      this.leftsit.render(ctx, pos);
	    } else if (this.jumping){
	      this.leftjump.render(ctx, pos);
	    } else {
	      this.leftsit.render(ctx, pos);
	    }
	  } else if (this.direction === "right") {
	    if (this.jumpVelocity > 1){
	      this.rightsit.render(ctx, pos);
	    } else if (this.jumping){
	      this.rightjump.render(ctx, pos);
	    } else {
	      this.rightsit.render(ctx, pos);
	    }
	  }
	
	  // ctx.beginPath();
	  // ctx.arc(this.playerX, this.canvas.height-this.playerRadius + this.playerY , this.playerRadius, 0, Math.PI*2);
	  //ctx.fill();
	  if (this.jumping === true){
	    this.initiateJump();
	  }
	  // ctx.closePath();
	};
	
	
	
	module.exports = PlayerModel;


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	
		this.splash = new Image();
		this.splash.src = "./images/splash.png";
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Sounds = __webpack_require__(4);
	var Images = __webpack_require__(2);
	var imageStore = new Images();
	
	var soundStore = new Sounds();
	
	var BellModel = function(canvas, score) {
	
	  if (score < 1000) {
	    this.radius = 28;
	  } else if (score < 5000) {
	    this.radius = 24;
	  } else if (score < 9000) {
	    this.radius = 20;
	  } else if (score < 14000) {
	    this.radius = 16;
	  } else if (score > 14000) {
	    this.radius = 12;
	  }
	
	
	
	  this.chime = soundStore.chime;
	  this.canvas = canvas;
	  this.y = -100;
	  this.fallSpeed = 1.0;
	  // this.shifting = false;
	  this.shiftVelocity = 2.5;
	  this.x = (Math.random() * this.canvas.width);
	  this.fruit = imageStore.fruits[Math.floor(Math.random() * imageStore.fruits.length)];
	
	  this.fruitSprite = imageStore.sprite({
	    width: this.radius * 2.5,
	    height: this.radius * 2.5,
	    image: this.fruit,
	  });
	
	  this.avacado = imageStore.sprite({
	    width: this.radius * 2.5,
	    height: this.radius * 2.5,
	    image: imageStore.avacado,
	  });
	
	  this.broc = imageStore.sprite({
	    width: this.radius * 2.5,
	    height: this.radius * 2.5,
	    image: imageStore.broc,
	  });
	
	  this.pear = imageStore.sprite({
	    width: this.radius * 2.5,
	    height: this.radius * 2.5,
	    image: imageStore.pear,
	  });
	
	};
	
	BellModel.prototype.startShift = function() {
	  // this.shifting = true;
	  this.fallSpeed = this.shiftVelocity;
	  // console.log("starting");
	};
	
	BellModel.prototype.endShift = function() {
	  // this.shifting = false;
	  // console.log("ending");
	  // this.fallSpeed = 1;
	  // console.log(this.fallSpeed);
	};
	
	BellModel.prototype.drawBell = function (ctx) {
	  var pos = {y: this.y - this.radius, x: this.x - this.radius};
	  this.fruitSprite.render(ctx, pos);
	  // ctx.beginPath();
	  // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	  // ctx.fill();
	
	    this.y += this.fallSpeed;
	
	  // ctx.closePath();
	};
	
	
	module.exports = BellModel;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Sounds = function() {
	
		this.chime = new Audio();
		this.chime.src = "./audio/chime.wav";
	  this.music = new Audio();
	  this.music.src = "./audio/music.wav";
	  this.music.loop = true;
	
	};
	
	module.exports = Sounds;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Images = __webpack_require__(2);
	
	var imageStore = new Images();
	function Background() {
	  this.falling = false;
	  this.x = 0;
	  this.y = 0;
		this.panningSpeed = 0.6;
		this.draw = function() {
			this.y += this.panningSpeed;
			this.context.drawImage(imageStore.background, this.x, this.y);
			this.context.drawImage(imageStore.background, this.x, this.y - this.canvasHeight);
			if (this.y >= this.canvasHeight) {
				this.y = 0;
	    } else if (this.falling === true) {
	      this.panningSpeed = -5.5;
	      if (this.y < 0) {
	        this.y = this.canvasHeight;
	      }
	    }
	
		};
	}
	
	module.exports = Background;


/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map