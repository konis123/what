
/*
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
gamewrapper.appendChild(canvas);*/
//document.body.appendChild(canvas);//원래는 바디안에있는건데 게임래퍼안에있는걸로 바꿨음..

var GAME_SETTINGS = null;
//var game = document.getElementByClass('game');
var canvas = document.createElement('canvas');
//game.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.style.display = "block";
canvas.style.border = "black 1px solid";
canvas.style.margin = "0 auto";
//$(canvas).css("display", "block");
//$(canvas).css("border", "black 1px solid");
//$(canvas).css("margin", "0 auto");
var socket = io();
/*$('body').on('keydown', function(e){
  socket.emit('keydown', e.keyCode);
});*/
document.body.addEventListener('keydown',function(e){
  socket.emit('keydown', e.keyCode);
});
/*$('body').on('keyup', function(e){
  socket.emit('keyup', e.keyCode);
});*/
document.body.addEventListener('keyup',function(e){
  socket.emit('keyup', e.keyCode);
});
socket.on('connected', function(SERVER_GAME_SETTINGS){
  GAME_SETTINGS = SERVER_GAME_SETTINGS;
  //$(canvas).attr("width", GAME_SETTINGS.WIDTH);
  //$(canvas).attr("height", GAME_SETTINGS.HEIGHT);
  canvas.width = GAME_SETTINGS.WIDTH;
  canvas.height = GAME_SETTINGS.HEIGHT;
  document.body.appendChild(canvas);
});
//var users={};//
socket.on('update', function(idArray, statusArray){
  if(GAME_SETTINGS === null) return;
  ctx.save();
  drawBackground(idArray, statusArray);
  ctx.restore();
  idArray.forEach(function(id,i,a){
    /*나중에 translate 써서 하는걸로 바꿔보자;;;;;;;
    users[id] = document.createElement("div");
    users[id].style[background-color] = statusArray[id].color;
    users[id].style.width = '32px';
    users[id].style.height = '32px';*/
    ctx.fillStyle = statusArray[id].color;
    ctx.fillRect(statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);
  });
});
function drawBackground(idArray, statusArray){
  ctx.fillStyle = GAME_SETTINGS.BACKGROUND_COLOR;
  ctx.fillRect(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);

  ctx.fillStyle = "red";
  ctx.fillRect(GAME_SETTINGS.WIDTH*0.8,0,GAME_SETTINGS.WIDTH*0.2,GAME_SETTINGS.HEIGHT*0.2);
  idArray.forEach(function(id,i,a){
    if(statusArray[id].x>(GAME_SETTINGS.WIDTH*0.8) && statusArray[id].y<(GAME_SETTINGS.HEIGHT*0.2)){
      ctx.fillStyle = "orange";
      ctx.fillRect(GAME_SETTINGS.WIDTH*0.8,0,GAME_SETTINGS.WIDTH*0.2,GAME_SETTINGS.HEIGHT*0.2);
    }
  });

  ctx.fillStyle = "black";
  //ctx.fillText("Score: "+score,0,20);
  ctx.font = "20px Arial";
  ctx.fillText("Link1",GAME_SETTINGS.WIDTH*0.85,50);

}
