var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set("view engine",'ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
  //res.render('main');
  res.render('firstejs');
});
/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

//var port = process.env.PORT || 3000;
http.listen(3000, function(){
  console.log("server on!: http://localhost:3000/");
});

var objects = {};

io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  objects[socket.id] = new UserObject();
  io.to(socket.id).emit('connected', GAME_SETTINGS);

  socket.on('disconnect', function(){
    delete objects[socket.id];
    console.log('user disconnected: ', socket.id);
  });
  socket.on('keydown', function(keyCode){
    objects[socket.id].keypress[keyCode] = true;
  });
  socket.on('keyup', function(keyCode){
    objects[socket.id].keypress[keyCode] = false;
    //delete objects[socket.id].keypress[keyCode];//원래는 이거해야하는데 음...일단 해보자
  });
});

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40, SPACE = 32;
var KEY_W = 87, KEY_S = 83, KEY_A = 65, KEY_D = 68;
var DIR_E = 1, DIR_NE = 2, DIR_N = 4, DIR_NW = 8, DIR_W = 16, DIR_SW = 32, DIR_S = 64, DIR_SE = 128;

var GAME_SETTINGS = {
  WIDTH : 640, HEIGHT : 480, BACKGROUND_COLOR : "#FFFFFF"
};

var update = setInterval(function(){
  var idArray=[];
  var statusArray={};
  for(var id in io.sockets.clients().connected){

    if(objects[id].keypress[LEFT]){
      objects[id].status.x -= 2;
      objects[id].status.direction |= DIR_W;
      objects[id].status.user_is_moving = true;
    }
    else if(objects[id].keypress[UP]){
      objects[id].status.y -= 2;
      objects[id].status.direction |= DIR_N;
      objects[id].status.user_is_moving = true;
    }
    else if(objects[id].keypress[RIGHT]){
      objects[id].status.x += 2;
      objects[id].status.direction |= DIR_E;
      objects[id].status.user_is_moving = true;
    }
    else if(objects[id].keypress[DOWN]){
      objects[id].status.y += 2;
      objects[id].status.direction |= DIR_S;
      objects[id].status.user_is_moving = true;
    }else{
      objects[id].status.direction = 0;
      objects[id].status.user_is_moving = false;
    }



    if(objects[id].keypress[LEFT] && objects[id].keypress[SPACE]){
      objects[id].status.x -= 5;
    }
    if(objects[id].keypress[UP] && objects[id].keypress[SPACE]){
      objects[id].status.y -= 5;
    }
    if(objects[id].keypress[RIGHT] && objects[id].keypress[SPACE]){
      objects[id].status.x += 5;
    }
    if(objects[id].keypress[DOWN] && objects[id].keypress[SPACE]){
      objects[id].status.y += 5;
    }

    if(objects[id].status.x + objects[id].status.width < 0)
      objects[id].status.x = 0;
    if(objects[id].status.y + objects[id].status.height < 0)
      objects[id].status.y = 0;
    if(objects[id].status.x > GAME_SETTINGS.WIDTH)
      objects[id].status.x = GAME_SETTINGS.WIDTH - objects[id].status.width;
    if(objects[id].status.y > GAME_SETTINGS.HEIGHT)
      objects[id].status.y = GAME_SETTINGS.HEIGHT - objects[id].status.height;



    idArray.push(id);
    statusArray[id]=objects[id].status;
  }
  io.emit('update',idArray, statusArray);
},10);

function UserObject() {

  this.status = {};
  this.status.x = 64;
  this.status.y = 32;
  this.status.direction = 0;
  this.status.user_is_moving = false;
  this.status.characterImage = 0;
  this.status.height = 32;//이둘은 나중에 상황봐서 지울수있을듯 캐릭터 크기나타냄
  this.status.width = 32;//
  this.keypress = [];
}
