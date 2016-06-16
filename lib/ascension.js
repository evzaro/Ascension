var PlayerModel = require('./player.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var player = new PlayerModel(canvas);
player.addListeners();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer(ctx);
}



// var movementListener = canvas.addEventListener("mousemove", handleMove, false);
// var jumpListener = canvas.addEventListener("mousedown", handleJump, false);
//
// function handleMove(e) {
//   playerX = e.pageX - canvas.offsetLeft - (playerWidth/2);
//   console.log(playerX);
// }
//
// function handleJump() {
//   playerY = -160;
//
// }
//
// var playerHeight = 30;
// var playerWidth = 30;
// var playerY = 0;
// var playerX = (canvas.width-playerWidth)/2;
//
// function drawPlayer() {
//   ctx.beginPath();
//   ctx.rect(playerX, canvas.height-playerHeight + playerY , playerWidth, playerHeight);
//   ctx.fill();
//   ctx.closePath();
//
// }

setInterval(draw, 10);
