var PlayerModel = require('./player.js');
var BellModel = require('./bell.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var bell = new BellModel(canvas);
var player = new PlayerModel(canvas);


var bells = [];
var newBell = function () {
  bells.push(new BellModel(canvas));
};
setInterval(newBell, 700);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer(ctx);
  bells.forEach(function(bell){
    bell.drawBell(ctx);
  });
}

setInterval(draw, 10);
