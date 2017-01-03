var dog_angle = 0;

var Context = null;
var BLOCK_W = 32;
var BLOCK_H = 32;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40, SPACE = 32;
var KEY_W = 87, KEY_S = 83, KEY_A = 65, KEY_D = 68;
var DIR_E = 1, DIR_NE = 2, DIR_N = 4, DIR_NW = 8, DIR_W = 16, DIR_SW = 32, DIR_S = 64, DIR_SE = 128;

var user_rotate = 0;//이거 필요없을거같음;

var GAME_SETTINGS = null;
var socket = io();


var wall = new Sprite("../images/wall.png");
var water = new Sprite("../images/water.png");

var spritesheet = new Spritesheet("../images/characters.png");
//var chars = new Sprite(spritesheet);
var chars = new Sprite("../images/characters.png");

//var user_is_moving = false;
//var user_direction = 0;

var map = [ 0,0,0,0,0,0,0,0,0,0,
            0,0,1,1,1,0,1,0,0,0,
            0,0,1,1,1,0,0,0,0,0,
            0,0,1,1,1,1,0,0,0,0,
            0,0,0,0,1,1,1,0,0,0,
            0,0,0,0,1,1,1,1,1,0,
            0,0,0,0,0,0,1,1,1,1,
            0,0,1,1,0,0,0,0,1,1,
            0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0 ];

var mapIndex = 0;

$(document).ready(function() {

    Context = new HTML("game", 640, 480);

    //InitializeKeyboard();

    DisableScrollbars();

    InitializeAnimationCounters();

});

$(window).load(function() {

});


document.body.addEventListener('keydown',function(e){
  socket.emit('keydown', e.keyCode);
});
document.body.addEventListener('keyup',function(e){
  socket.emit('keyup', e.keyCode);
});

socket.on('connected', function(SERVER_GAME_SETTINGS){
  GAME_SETTINGS = SERVER_GAME_SETTINGS;
  //canvas.width = GAME_SETTINGS.WIDTH;
  //canvas.height = GAME_SETTINGS.HEIGHT;
  //document.body.appendChild(canvas);
});

socket.on('update', function(idArray, statusArray){
  ResetAnimationCounter();

  DrawMap();

  //if(GAME_SETTINGS === null) return;

  idArray.forEach(function(id,i,a){
    /*
    if(statusArray[id].characterImage === 0)
      chars.draw(statusArray[id].x, statusArray[id].y);
      //ctx.drawImage(img0,statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);

    else if(statusArray[id].characterImage === 1)
      ctx.drawImage(img1,statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);
    else if(statusArray[id].characterImage === 2)
      ctx.drawImage(img2,statusArray[id].x,statusArray[id].y,statusArray[id].width,statusArray[id].height);
      */

    // Animated characters
    var users_seq = 0;

    if (statusArray[id].user_is_moving)
    {
        if (statusArray[id].direction & DIR_W) users_seq = [12,13,14];
        else if (statusArray[id].direction & DIR_E) users_seq = [24,25,26];
        else if (statusArray[id].direction & DIR_N) users_seq = [36,37,38];
        else if (statusArray[id].direction & DIR_S) users_seq = [0,1,2];
        //console.log(statusArray[id].direction +' '+DIR_W+' '+users_seq);
        // Finally, animate the dog.
        chars.draw(statusArray[id].x, statusArray[id].y, users_seq);
    }
    else
    {
      chars.draw(statusArray[id].x, statusArray[id].y, 0);
    }


  });
});
