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
      
    var dTop = paddle.getY() - ball.getY();
    var dLeft = paddle.getX() - ball.getX();
    var dRight = ball.getX() - paddle.getRight();
    var dBot = ball.getY() - paddle.getBottom();
    
    var d = 0;
    if (dTop > 0) d += dTop;
    if (dLeft > 0) d += dLeft;
    if (dRight > 0) d += dRight;
    if (dBot > 0) d += dBot;
    
    var intersecting = d <= ball.getRadius();
    if (intersecting) {
      
      // ball is inside!
      if (dTop < 0 && dLeft < 0 && dRight < 0 && dBot < 0) {
        var phw = paddle.getWidth() / 2.0;
        var phh = paddle.getHeight() / 2.0;
        var cdTop = paddle.getY() + phh - ball.getY();
        var cdLeft = paddle.getX() + phw - ball.getX();
        var cdRight = ball.getX() - paddle.getX() - phw;
        var cdBot = ball.getY() - paddle.getY() - phh;
        this.__deflect(ball, paddle, cdTop, cdRight, cdBot, cdLeft);
      }
      else {
        this.__deflect(ball, paddle, dTop, dRight, dBot, dLeft);
      }
    }
  },
  
  __deflect: function (ball, paddle, dTop, dRight, dBot, dLeft) {
    // portion of the paddle's y-veloc increases ball speed
    var baseSpeedUp = Math.abs(paddle.getVelocY()*0.1);
  
    // if hit top & ball is moving down, deflect up
    if (dTop >= 0 && ball.getVY() > 0) {
      ball.mulVelocityY(-baseSpeedUp - 1, false);
    }
    // if hit bot & ball is moving up, deflect down
    if (dBot >= 0 && ball.getVY() < 0) {
      ball.mulVelocityY(-baseSpeedUp - 1, false);
    }
    // if hit left & ball is moving right, deflect left
    if (dLeft >= 0 && ball.getVX() > 0) {
      ball.mulVelocityX(-baseSpeedUp - 1, false);
      ball.setVY(ball.getVY()*(1 + baseSpeedUp*2));
    }
    // if hit right & ball is moving left, deflect right
    if (dRight >= 0 && ball.getVX() < 0) {
      ball.mulVelocityX(-baseSpeedUp - 1, false);
      ball.setVY(ball.getVY()*(1 + baseSpeedUp*2));
    }
  },
    
  __sign: function (x) {
    if (x < 0) return -1;
    if (x > 0) return 1;
    return 0;
  }
  
}

// Field size

GFW_mixin(BallPaddleCollider, GFW_Entity, ["update"]);
