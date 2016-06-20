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
	var BellModel = __webpack_require__(2);
	var Background = __webpack_require__(4);
	
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var player = new PlayerModel(canvas, gameOver);
	var score = 0;
	var currentBellPointVal = 10;
	var bells = [];
	
	var Sounds = __webpack_require__(3);
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
	  	bells.push(new BellModel(canvas));
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
	
	  for (var i = 0; i < bells.length; i++) {
	
	    if (bells[i].y > 500 + bells[i].radius) {
	      bells.splice(i, 1); //clear bell when off screen
	    } else {
				if (player.dead === false){
		      bells[i].drawBell(ctx);
		      if (checkCollision(bells[i])){
						player.startedAscent = true;
		        bells.splice(i, 1);
		        if ( (canvas.height-player.playerRadius + player.playerY) > canvas.height * 0.2){
		          player.handleJump();
		        }
		      }
				} else {
					if (player.playerY > -230){
						player.playerY += -0.15;
					}
					bells[i].fallSpeed = -5;
					bells[i].drawBell(ctx);
					background.falling = true;
				}
	    }
	  }
	
	  if ( (canvas.height-player.playerRadius + player.playerY) <= canvas.height * 0.2){
	    player.jumpVelocity = player.jumpVelocity/1.3;
	    bells.forEach(function(bell){
	      bell.startShift();
	    });
	  } else {
	    bells.forEach(function(bell){
	      bell.endShift();
	    });
	  }
	
	}
	
	function gameOver (){
		window.clearInterval(bellMaker);
		window.clearInterval(mainDraw);
		drawGameOver();
		canvas.addEventListener('click', run, false);
		player = new PlayerModel(canvas, gameOver);
		console.log(background);
		score = 0;
		currentBellPointVal = 10;
		bells = [];
		background.falling = false;
		background.panningSpeed = 0.6;
		//refactor
	}
	
	function drawIntro() {
			ctx.fillStyle = 'black';
	    ctx.fillRect(0,0,canvas.width, canvas.height);
			ctx.fillStyle = 'white';
			ctx.font = "30px comic-sans";
			ctx.fillText("Ascension", 35, 30);
			ctx.font = "30px comic-sans";
		  ctx.fillText("Try to get the high-score by bouncing on the snowflakes!", 35, 200);
			ctx.font = "15px comic-sans";
			ctx.fillText("Click anywhere to begin", 35, 300);
	}
	
	function drawGameOver() {
			ctx.fillStyle = 'black';
	    ctx.fillRect(0,0,canvas.width, canvas.height);
			ctx.fillStyle = 'white';
			ctx.font = "30px comic-sans";
			ctx.fillText("GAME OVER", 35, 30);
			ctx.fillText("Your score was " + score, 35, 100);
			ctx.font = "30px comic-sans";
		  ctx.fillText("Try again?", 35, 250);
			ctx.font = "15px comic-sans";
			ctx.fillText("Click anywhere to begin", 35, 300);
	
	}
	
	drawIntro();
	canvas.addEventListener('click', run, false);
	
	function run(){
		console.log(background);
		canvas.removeEventListener('click', run, false);
		bellMaker = window.setInterval(makeNewBell, 340);
		mainDraw = window.setInterval(draw, 10);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  window.setTimeout(this.deathFunc, 7000);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Sounds = __webpack_require__(3);
	
	var soundStore = new Sounds();
	
	var BellModel = function(canvas) {
	  this.radius = 15;
	  this.chime = soundStore.chime;
	  this.canvas = canvas;
	  this.y = -100;
	  this.fallSpeed = 1;
	  // this.shifting = false;
	  this.shiftVelocity = 3.0;
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


/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Images = __webpack_require__(5);
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Images = function() {
	
		this.background = new Image();
		this.background.src = "./images/bg.png";
	};
	
	module.exports = Images;


/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map