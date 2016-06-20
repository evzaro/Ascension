var PlayerModel = require('./player.js');
var BellModel = require('./bell.js');
var Background = require('./bg.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = new PlayerModel(canvas);
var score = 0;
var currentBellPointVal = 10;
var bells = [];

var bgCanvas = document.getElementById('background');
var bgContext = bgCanvas.getContext('2d');
Background.prototype.context = bgContext;
Background.prototype.canvasWidth = bgCanvas.width;
Background.prototype.canvasHeight = bgCanvas.height;
var background = new Background();

var makeNewBell = function () {
  bells.push(new BellModel(canvas));
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
      bells[i].drawBell(ctx);
      if (checkCollision(bells[i])){
				player.startedAscent = true;
        bells.splice(i, 1);
        if ( (canvas.height-player.playerRadius + player.playerY) > canvas.height * 0.2){
          player.handleJump();
        }
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


function drawIntro() {

    ctx.fillRect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = 'white';
		ctx.font = "30px comic-sans";
		ctx.fillText("Ascension", 35, 30);
		ctx.font = "30px comic-sans";
	  ctx.fillText("Try to get the high-score by bouncing on the snowflakes!", 35, 200);
		ctx.font = "15px comic-sans";
		ctx.fillText("Click anywhere to begin", 35, 300);

}

drawIntro();
canvas.addEventListener('click', run, false);

function run(){
	canvas.removeEventListener('click', run, false);
	setInterval(makeNewBell, 340);
	setInterval(draw, 10);
}
