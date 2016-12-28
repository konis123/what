var width = 600, height = 400, range = 20;
var player = {x: 150, y: 75, width: 20, height: 20, val:2};
var enemy = {x: 0, y: 0, width: 20, height: 20, val:1};
var score = 0, count = 0, key = [];
var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
canvas.style.border = "1px solid black";
var ctx = canvas.getContext("2d");
var gamewrapper = document.getElementById("gamewrapper");
gamewrapper.appendChild(canvas);
//document.body.appendChild(canvas);//원래는 바디안에있는건데 게임래퍼안에있는걸로 바꿨음..
setInterval(function(){
  update();
  draw();
},10);
function draw(){
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x-enemy.width/2,enemy.y-enemy.height/2,enemy.width,player.height);
  ctx.fillStyle = "black";
  ctx.fillRect(player.x-player.width/2,player.y-player.height/2,player.width,player.height);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: "+score,0,20);
  ctx.restore();
}
function update(){
  if(player.x >= enemy.x-range && player.x <= enemy.x+range && player.y >= enemy.y-range && player.y <= enemy.y+range ){
    enemy.y = 0;
    score++;
  }
  if(enemy.y > height || enemy.y === 0){//원래 ==였는데..하 문법공부하자..
    enemy.x = Math.ceil(Math.random()*width);
    enemy.y = 0;
    enemy.val = 1;
  }
  if(key[37]&&player.x-player.width/2>0) player.x -= player.val;
  if(key[38]&&player.y-player.height/2>0) player.y -= player.val;
  if(key[39]&&player.x+player.width/2<width) player.x += player.val;
  if(key[40]&&player.y+player.height/2<height) player.y += player.val;
  enemy.y += enemy.val;
  enemy.val += 0.02;
}
window.addEventListener("keydown", function(e){
  key[e.keyCode] = true;
});
window.addEventListener("keyup", function(e){
  key[e.keyCode] = false;
});
