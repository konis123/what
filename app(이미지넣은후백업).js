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
    objects[socket.id].keypress[keyCode]=true;
  });
  socket.on('keyup', function(keyCode){
    delete objects[socket.id].keypress[keyCode];
  });
});

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40, SPACE = 32;
var GAME_SETTINGS = {
  WIDTH : 600, HEIGHT : 400, BACKGROUND_COLOR : "#FFFFFF"
};

var update = setInterval(function(){
  var idArray=[];
  var statusArray={};
  for(var id in io.sockets.clients().connected){
    if(objects[id].keypress[LEFT])  objects[id].status.x -= 2;
    if(objects[id].keypress[UP])    objects[id].status.y -= 2;
    if(objects[id].keypress[RIGHT]) objects[id].status.x += 2;
    if(objects[id].keypress[DOWN])  objects[id].status.y += 2;
    if(objects[id].keypress[LEFT] && objects[id].keypress[SPACE])  objects[id].status.x -= 5;
    if(objects[id].keypress[UP] && objects[id].keypress[SPACE])    objects[id].status.y -= 5;
    if(objects[id].keypress[RIGHT] && objects[id].keypress[SPACE]) objects[id].status.x += 5;
    if(objects[id].keypress[DOWN] && objects[id].keypress[SPACE])  objects[id].status.y += 5;

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
  /*
  var color="#";
  for(var i = 0; i < 6; i++ ){
    color += (Math.floor(Math.random()*16)).toString(16);
  }
  */
  var imageType = Math.floor(Math.random()*3);
  this.status = {};
  this.status.nickname = '';
  this.status.x = 300;
  this.status.y = 200;
  this.status.height = 40;
  this.status.width = 40;
  //this.status.color = color;
  this.status.imageType = imageType;
  this.keypress = [];
}
