/*
  AIPaddleController design
    - Matches Paddle y position with ball y position.
*/
function AIPaddleController(ball, paddle) {
  this._GFW_Entity_Initialize();
  this.set__Ball(ball);
  this.set__Paddle(paddle);
  this.setThreshold(10);
}

AIPaddleController.prototype = {
/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    var t = this.getThreshold();
    if ( t < 1 ) // correction
      t = 1;
    
    var currentY = this.get__Paddle().getY();
    var ballY = this.get__Ball().getY();
    
    var diff = ballY/t - currentY/t;
    
    if ( diff != 0 )
      this.get__Paddle().setY(ballY); //__paddleRef.move(diff);
  },

}

GFW_Property(AIPaddleController, "__Ball");
GFW_Property(AIPaddleController, "__Paddle");
GFW_Property(AIPaddleController, "Threshold");

GFW_mixin(AIPaddleController, GFW_Entity, ["update"]);
