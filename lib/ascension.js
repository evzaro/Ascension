var PlayerModel = require('./player.js');
var BellModel = require('./bell.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = new PlayerModel(canvas);

var bells = [];
var makeNewBell = function () {
  bells.push(new BellModel(canvas));
};
setInterval(makeNewBell, 400);


function checkCollision (bell) {
  var dx = player.playerX - bell.x;
  var dy = (canvas.height - player.playerRadius + player.playerY) - bell.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < player.playerRadius + bell.radius) {
    return true;
  } else {
    return false;
  }
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer(ctx);

  for (var i = 0; i < bells.length; i++) {
    if (bells[i].y > 500 + bells[i].radius) {
      bells.splice(i, 1); //clear bell when off screen
    } else {
      bells[i].drawBell(ctx);
      if (checkCollision(bells[i])){
        bells.splice(i, 1);
        if ( (canvas.height-player.playerRadius + player.playerY) > canvas.height * 0.2){
          player.handleJump();
        }
      }
    }
  }

  if ( (canvas.height-player.playerRadius + player.playerY) <= canvas.height * 0.2){


    bells.forEach(function(bell){
      bell.y += 3;
    });
  }
}
setInterval(draw, 10);
