/*  
  BallPaddleCollider Design:
    - Hit tests ball and the Paddle (Tests against the rectangle of each paddle)
    - Ball-Paddle collision resolution (Correctly sets ball's velocity when Paddle is hit)
    
    Refs: Ball, PaddleA, PaddleB
*/
function BallPaddleCollider(ballRef, paddleARef, paddleBRef) {
  this._GFW_Entity_Initialize();

  this.__ballRef = ballRef;
  this.__paddleARef = paddleARef;
  this.__paddleBRef = paddleBRef;
}

BallPaddleCollider.prototype = {
  __ballRef: undefined,
  __paddleARef: undefined,
  __paddleBRef: undefined,
  
/* CALLBACKS */
  /** UPDATE */
  update: function (updateParams) {

 	// Ignore if there is no ball
    if ( this.__ballRef == undefined || 
		 this.__paddleARef == undefined ||
		 this.__paddleBRef == undefined )
      return;
    
    // Localize variables
    var ball = this.__ballRef;
	var paddleA = this.__paddleARef;
	var paddleB = this.__paddleBRef;
    
	if ( Geometry.isCircleIntersectingRect() ) {
		// Figure out which side of the paddle it hit

		// Then
      	//ball.mulVelocityX( (left <= 0 ? 1 : -1) );
	}
  },
  
}

// Field size

GFW_mixin(BallPaddleCollider, GFW_Entity, ["update"]);
