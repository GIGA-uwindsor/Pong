function HumanPaddleController(paddle) {
  this._GFW_Entity_Initialize();
  this.set__paddle(paddle);
}

HumanPaddleController.prototype = {
  
  update: function (updateParams) {
    var keyboard = updateParams.getKeyboard();
    var goUp = keyboard.isKeyDown(GFW_Key.w) || keyboard.isKeyDown(GFW_Key.upArrow);
    var goDown = keyboard.isKeyDown(GFW_Key.s) || keyboard.isKeyDown(GFW_Key.downArrow);
		
    if ((!goUp && goDown) || (goUp && !goDown)) {
      if (goUp) {
				this.get__paddle().setY(this.get__paddle().getY()-2);
      }
      else {
				this.get__paddle().setY(this.get__paddle().getY()+2);
      }
    }
    else {
		
    }
  }
  
}

GFW_Property(HumanPaddleController, "__paddle");
GFW_mixin(HumanPaddleController, GFW_Entity, ["update"]);