//스프라이트
var Sprite = function(filename, is_pattern){
  this.image = null;
  this.pattern = null;
  this.TO_RADIANS = Math.PI/180;

//!== 안되면 != 로 바꿔보자
  if(filename !== undefined && filename !== "" && filename !== null){
    this.image = new Image();
    this.image.src = filename;

    if(is_pattern){
      this.pattern = Context.context.createPattern(this.image, 'repeat');
    }
  }else{
    console.log("unable to load sprite.");
  }

  this.draw = function(x,y,w,h){
    //pattern
    if(this.pattern !== null){
      Context.context.fillStyle = this.pattern;
      Context.context.fillRect(x,y,w,h);
    }else{
      //image
      if(w !== undefined || h !== undefined){
        Context.context.drawImage(this.image,x,y,this.image.width,this.image.height);
      }else{
        //stretched
        Context.context.drawImage(this.image,x,y,w,h);
      }

    }
  };

  this.rotate = function(x,y,angle){
    Context.context.save();

    Context.context.translate(x,y);
    Context.context.rotate(angle*this.TO_RADIANS);

    Context.context.drawImage(this.image,-(this.image.width/2),-(this.image.height/2));

    Context.context.restroe();
  };


};
