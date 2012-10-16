/*  
  BallPaddleCollider Design:
    - Hit tests ball and the Paddle (Tests against the rectangle of each paddle)
    - Ball-Paddle collision resolution (Correctly sets ball's velocity when Paddle is hit)
    
    Refs: Ball, PaddleA, PaddleB
*/
function BallPaddleCollider(ballRef, paddleRef) {
  this._GFW_Entity_Initialize();

  this.__ballRef = ballRef;
  this.__paddleRef = paddleRef;
}

BallPaddleCollider.prototype = {
  __ballRef: undefined,
  __paddleRef: undefined,
  
/* CALLBACKS */
  /** UPDATE */
  update: function (updateParams) {

 	// Ignore if there is no ball
    if ( this.__ballRef == undefined || this.__paddleRef == undefined )
      return;
    
    // Localize variables
    var ball = this.__ballRef;
	var paddle = this.__paddleRef;
    
	var intersecting = Geometry.isCircleIntersectingRect(
		ball.getX(), ball.getY(), ball.getRadius(),
		paddle.getRect()
	);

	if (intersecting) {
  
    // If the ball hits a corner
    if (
      (ball.getY() <= paddle.getY() || ball.getY() >= paddle.getBottom())
      &&
      (ball.getX() <= paddle.getX() || ball.getX() >= paddle.getRight())
      ) {
        ball.mulVelocityX(-1, false);
        ball.mulVelocityY(-1, false);
      }
  
		// If the ball hits the paddle from the left or right
		else if (ball.getY() >= paddle.getY() && ball.getY() <= paddle.getBottom())
      		ball.mulVelocityX(-1, false);

		// If the ball hits the paddle from the top or bottom
		else if (ball.getX() >= paddle.getX() && ball.getX() <= paddle.getRight())
      		ball.mulVelocityY(-1, false);

		// Add half of the paddles velocity to the ball
		ball.setVY( ball.getVY() + paddle.getVelocY() * 0.5);
	}
  },
  
}

// Field size

GFW_mixin(BallPaddleCollider, GFW_Entity, ["update"]);
