$(document).ready(function(){

  Context.create("canvas");

  var WALL = "../images/mario.jpg";
  var WALL2 = "../images/pichi.jpg";

  var image = new Sprite(WALL, false);
  var image2 = new Sprite(WALL, false);
  var image3 = new Sprite(WALL2, true);
  var angle = 0;

/*
  setInterval(function(){
    Context.context.fillStyle = "#000000";
    Context.context.fillRect(0,0,800,800);

    image.draw(0,0,64,64);
    image.draw(0,74,256,32);
    image3.draw(160,160,256,180);

    image.rotate(115,160,angle += 4.0);
    image2.rotate(115,260,-angle/2);
  },25);
*/

});
