var PlayerModel = require('./player.js');
var BellModel = require('./bell.js');
var Background = require('./bg.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = new PlayerModel(canvas, gameOver);
var score = 0;
var high_score = 0;
var currentBellPointVal = 10;
var bells = {};
var bell_num = 0;

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
		} else if (player.startedAscent === false && bells[bell_num].y > 320 + bells[bell_num].radius) {
			delete bells[bell_num];
		} else {
			bells[bell_num].drawBell(ctx);

			if (player.dead === false){
	      if (checkCollision(bells[bell_num])){
					player.startedAscent = true;
	        delete bells[bell_num];
	        if ( player.playerY > -370){
	          player.handleJump();
					}
					// else {
					// 	shiftBells();
					// }
				}

				if ( player.playerY < -370) {
					player.playerY = -370;
					Object.keys(bells).forEach(function(bell_num){
						bells[bell_num].shift();
						console.log(player.jumpVelocity);
						miniShiftTimer = window.setTimeout(unshiftBells, 600);
					});
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

	function shiftBells (){
		Object.keys(bells).forEach(function(bell_num){
			bells[bell_num].fallSpeed -= player.jumpVelocity;
			 shiftTimer = window.setTimeout(unshiftBells, 500);
		});
	}

	function unshiftBells (){
			Object.keys(bells).forEach(function(bell_num){
				bells[bell_num].fallSpeed = 1.2;
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
		ctx.fillStyle = '#000033';
    ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = 'white';

		ctx.font = "70px comic-sans";
		ctx.fillText("GAME OVER", 150, 55);

		ctx.font = "30px comic-sans";
		ctx.fillText("Your score: " + score, 35, 140);
		ctx.fillText("Your high score: " + high_score, 35, 180);

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
