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
  ctx.fillRect(width*0.8,0,width*0.2,height*0.2);
  ctx.fillStyle = "black";
  ctx.fillRect(player.x-player.width/2,player.y-player.height/2,player.width,player.height);
  if(player.x>(width*0.8) && player.y<(height*0.2)){
    ctx.fillStyle = "orange";
    ctx.fillRect(width*0.8,0,width*0.2,height*0.2);
  }

  ctx.fillStyle = "black";
  ctx.fillText("Score: "+score,0,20);
  ctx.font = "20px Arial";
  ctx.fillText("Link1",width*0.85,50);
  ctx.restore();
}
function update(){
  if(key[37]&&player.x-player.width/2>0) player.x -= player.val;
  if(key[38]&&player.y-player.height/2>0) player.y -= player.val;
  if(key[39]&&player.x+player.width/2<width) player.x += player.val;
  if(key[40]&&player.y+player.height/2<height) player.y += player.val;
  if(key[37]&&key[32]&&player.x-player.width/2>0) player.x -= 5;
  if(key[38]&&key[32]&&player.y-player.height/2>0) player.y -= 5;
  if(key[39]&&key[32]&&player.x+player.width/2<width) player.x += 5;
  if(key[40]&&key[32]&&player.y+player.height/2<height) player.y += 5;
  if(player.x<0)
    player.x = 0;
  if(player.y<0)
    player.y = 0;
  if(player.x>width)
    player.x = width;
  if(player.y>height)
    player.y = height;
}
window.addEventListener("keydown", function(e){
  key[e.keyCode] = true;
});
window.addEventListener("keyup", function(e){
  key[e.keyCode] = false;
});
