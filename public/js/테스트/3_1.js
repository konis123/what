var Game = new Object();
Game.CELL_W = 32;
Game.CELL_H = 32;

$(document).ready(function(){
  $('body').on("mouseomve",function(event){
    var x = event.pageX - $("#game_board").offset().left;
    var y = event.pageY - $("#game_board").offset().top;

    var ix = Math.floor(x/Game.CELL_W) * Game.CELL_W;
    var iy = Math.floor(y/Game.CELL_H) * Game.CELL_H;

    if(x>0 && y>0 && x<640 && y<480)
      $("#cell_h1").css({"left":ix + "px","top" : iy + "px"});

  });
});

function dim_lights(){
  //fade arrows
  $("#arrow_up div,#arrow_dn div").fadeOut(200);
  //links
  $("a").css("color","#178b5b");
  //fade body
  $("body").animate({"background-color" : "#000000","color" : "#653d36"}, 500, function(){
    //now that the lights are dimmed, fade out game info box and start the game
    $("#game_info").fadeOut(300);
  });
}
