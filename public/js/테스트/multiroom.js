
//이미지들
var img0 = new Image();
img0.src = "images/mario.jpg";
var img1 = new Image();
img1.src = "images/pichi.jpg";
var img2 = new Image();
img2.src = "images/ruigi.jpg";


var GAME_SETTINGS = null;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
canvas.style.display = "block";
canvas.style.border = "black 1px solid";
canvas.style.margin = "0 auto";
var socket = io();


document.body.addEventListener('keydown',function(e){
  socket.emit('keydown', e.keyCode);
});
document.body.addEventListener('keyup',function(e){
  socket.emit('keyup', e.keyCode);
});
socket.on('connected', function(SERVER_GAME_SETTINGS){
  GAME_SETTINGS = SERVER_GAME_SETTINGS;
  canvas.width = GAME_SETTINGS.WIDTH;
  canvas.height = GAME_SETTINGS.HEIGHT;
  document.body.appendChild(canvas);
});
socket.on('update', function(idArray, statusArray){
  if(GAME_SETTINGS === null) return;
  ctx.save();
  drawBackground(idArray, statusArray);
  //chat.js부분,..
  //userKeyUpdate();
  //drawchat();

  ctx.restore();
  idArray.forEach(function(id,i,a){
    if(statusArray[id].imageType === 0)
      ctx.drawImage(img0,statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);
    else if(statusArray[id].imageType === 1)
      ctx.drawImage(img1,statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);
    else if(statusArray[id].imageType === 2)
      ctx.drawImage(img2,statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);

  });
});
function drawBackground(idArray, statusArray){
  ctx.fillStyle = GAME_SETTINGS.BACKGROUND_COLOR;
  ctx.fillRect(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);
  //방들어가면 방색이 바뀜 일단...
  ctx.fillStyle = "red";
  ctx.fillRect(GAME_SETTINGS.WIDTH*0.8,0,GAME_SETTINGS.WIDTH*0.2,GAME_SETTINGS.HEIGHT*0.2);
  idArray.forEach(function(id,i,a){
    if(statusArray[id].x>(GAME_SETTINGS.WIDTH*0.8) && statusArray[id].y<(GAME_SETTINGS.HEIGHT*0.2)){
      ctx.fillStyle = "orange";
      ctx.fillRect(GAME_SETTINGS.WIDTH*0.8,0,GAME_SETTINGS.WIDTH*0.2,GAME_SETTINGS.HEIGHT*0.2);
    }
  });

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Link1",GAME_SETTINGS.WIDTH*0.85,50);

}
