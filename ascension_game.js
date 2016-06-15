var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var mouseMovement = canvas.addEventListener("mousemove", updateMousePos, false);

function updateMousePos(e) {
  playerX = e.pageX - canvas.offsetLeft;
  console.log(playerX);
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
}



var playerHeight = 30;
var playerWidth = 30;
var playerX = (canvas.width-playerWidth)/2;

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, canvas.height-playerHeight, playerWidth, playerHeight);
  ctx.fill();
  ctx.closePath();

}

setInterval(draw, 10);
