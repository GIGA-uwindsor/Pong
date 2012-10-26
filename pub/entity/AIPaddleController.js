/*
  AIPaddleController design
    - Matches Paddle y position with ball y position.
    
  NOTE: Purpose of threshold is to tell the AI when to move the paddle
  instead of moving directly to ball's y position, to make it more realistic.
  This is intended for when paddle movement is regulated.
*/
function AIPaddleController(ball, paddle, field) {
  this._GFW_Entity_Initialize();
  this.__ballRef    = ball;
  this.__paddleRef  = paddle;
  this.__fieldRef   = field
  this.setThreshold(25);
}

AIPaddleController.prototype = {
  __ballRef   : undefined,
  __paddleRef : undefined,
  __fieldRef  : undefined,
  
/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    if ( this.__ballRef == undefined || this.__paddleRef == undefined || this.__fieldRef == undefined )
      return;
  
    var thresh = this.getThreshold();
    if ( thresh < 1 ) // correction
      thresh = 1;
      
    // Localize references
    var paddle  = this.__paddleRef;
    var ball    = this.__ballRef;
    var field   = this.__fieldRef;
    
    // Get the paddle's center Y position
    var currentY  = paddle.getY() + paddle.getHeight()/2;

    // Obtain a relative Y position
    var relY = ball.getY() - field.getY();
    
    // Get distance from ball to paddle
    var distance = paddle.getX() - ball.getX();
    var velocity = ball.getVX();
    var velY = ball.getVY();
    if ( velocity < 0 ) // If ball is moving left, make it virtually bounce off the opponent's paddle
    {
      // distance and time to get to left paddle
      var d = (field.getX() + 50) - ball.getX();
      var t = d / velocity;
      
      // Get the projected Y value of the ball to the left paddle
      var relY = Math.abs( relY + t * velY );
      while ( relY > field.getHeight() )  // Bounce off the top and bottom walls
        relY = Math.abs(field.getHeight()*2 - relY);
      
      // Stretch distance over entire field
      distance = paddle.getX() - (field.getX() + 50);
      velocity = -velocity; // assume velocity of ball changes after hitting left paddle
      velY *= 1.1;
    }
    // time for ball to reach right paddle
    var time = distance / velocity;
    
    // Get the projected Y value of the ball to the right paddle
    var relY = Math.abs( relY + time * velY );
    while ( relY > field.getHeight() )  // Bounce off the top and bottom walls
      relY = Math.abs(field.getHeight()*2 - relY);

    // Check if the paddle needs to move or not
    var diff = relY - currentY;
    if ( Math.round(diff/thresh) != 0 )
      paddle.move( diff < 0 ? -1 : 1 );
    
  },

}

GFW_Property(AIPaddleController, "Threshold");

GFW_mixin(AIPaddleController, GFW_Entity, ["update"]);
