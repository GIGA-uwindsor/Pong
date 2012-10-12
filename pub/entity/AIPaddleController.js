/*
  AIPaddleController design
    - Matches Paddle y position with ball y position.
*/
function AIPaddleController(ballRef, paddleRef) {
  this._GFW_Entity_Initialize();
  this.__ballRef    = ballRef;
  this.__paddleRef  = paddleRef;
  this.setThreshold(10);
}

AIPaddleController.prototype = {
  __ballRef:    undefined,
  __paddleRef:  undefined,
  
/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    var t = this.getThreshold();
    if ( t < 1 ) // correction
      t = 1;
    
    var currentY = __paddleRef.getY();
    var ballY = __ballRef.getY();
    
    var diff = ballY/t - currentY/t;
    
    if ( diff != 0 )
      __paddleRef.setY(ballY); //__paddleRef.move(diff);
  },

}

GFW_Property(AIPaddleController, "Threshold");

GFW_mixin(AIPaddleController, GFW_Entity, ["update"]);
