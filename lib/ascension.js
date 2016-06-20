var PlayerModel = require('./player.js');
var BellModel = require('./bell.js');
var Background = require('./bg.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = new PlayerModel(canvas, gameOver);
var score = 0;
var currentBellPointVal = 10;
var bells = [];

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
