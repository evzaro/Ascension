var PlayerModel = require('./player.js');
var BellModel = require('./bell.js');
var Background = require('./bg.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = new PlayerModel(canvas, gameOver);
var score = 0;
var high_score = 0;
var currentBellPointVal = 10;
var bells = [];

var Images = require('./images.js');
var imageStore = new Images();

var Sounds = require('./sounds.js');
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
  	bells.push(new BellModel(canvas, score));
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
	        if ( (canvas.height-player.playerRadius + player.playerY) > canvas.height * 0.3){
	          player.handleJump();
	        }
	      }
			} else {
				if (player.playerY > -220){
					player.playerY += -0.15;
				}
				bells[i].fallSpeed = -5;
				bells[i].drawBell(ctx);
				background.falling = true;
			}
    }
  }

  if ( (canvas.height-player.playerRadius + player.playerY) <= canvas.height * 0.27){

    player.jumpVelocity = player.jumpVelocity/1.3;
    bells.forEach(function(bell){
      bell.startShift();
    });
  } else {
    bells.forEach(function(bell){
      bell.endShift();
    });
  }
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
		ctx.fillStyle = 'black';
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
