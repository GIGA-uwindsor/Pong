/*
  AIPaddleController design
    - Matches Paddle y position with ball y position.
    
  NOTE: Purpose of threshold is to tell the AI when to move the paddle
  instead of moving directly to ball's y position, to make it more realistic.
  This is intended for when paddle movement is regulated.
*/
function AIPaddleController(ball, paddle) {
  this._GFW_Entity_Initialize();
  //this.set__Ball(ball);
  //this.set__Paddle(paddle);
  this.__ballRef = ball;
  this.__paddleRef = paddle;
  this.setThreshold(10);
}

AIPaddleController.prototype = {
  __ballRef : undefined,
  __paddleRef : undefined,
  
/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    if ( this.__ballRef == undefined || this.__paddleRef == undefined )
      return;
  
    var t = this.getThreshold();
    if ( t < 1 ) // correction
      t = 1;
      
    var paddle  = this.__paddleRef;
    var ball    = this.__ballRef;
    
    var ballDist = paddle.getX() - ball.getX();
    if ( ballDist < 20 || ballDist > 450 )
      return;
    
    var currentY  = paddle.getY() + paddle.getHeight()/2;
    var ballY     = ball.getY();
    
    var diff = ballY - currentY;
    if ( Math.round(diff/t) != 0 )
      paddle.setY(ballY - paddle.getHeight()/2 ); //__paddleRef.move(diff);
  },

}

GFW_Property(AIPaddleController, "Threshold");

GFW_mixin(AIPaddleController, GFW_Entity, ["update"]);
