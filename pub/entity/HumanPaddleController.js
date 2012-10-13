function HumanPaddleController(paddle) {
  this._GFW_Entity_Initialize();
  this.set__paddle(paddle);
}

HumanPaddleController.prototype = {
  
  update: function (updateParams) {
    var keyboard = updateParams.getKeyboard();
    var goUp = keyboard.isDown(GFW_Key.w) || keyboard.isDown(GFW_Key.upArrow);
    var goDown = keyboard.isDown(GFW_Key.s) || keyboard.isDown(GFW_Key.downArrow);
    
    if ((!goUp && goDown) || (goUp && !goDown)) {
      if (goUp) {
        this.get__paddle().setVelocY(-1);
      }
      else {
        this.get__paddle().setVelocY(1);
      }
    }
    else {
      this.get__paddle().setVelocY(0);
    }
  }
  
}

GFW_Property(HumanPaddleController, "__paddle");
GFW_mixin(HumanPaddleController, GFW_Entity, ["update"]);