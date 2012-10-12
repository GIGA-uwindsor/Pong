/*  
  BallSideCollider Design:
    - Hit tests ball and the side (Tests against field)
    - Ball-side collision resolution (Correctly sets ball's velocity when side is hit)
    
    Refs: Ball, PlayingField
*/
function BallSideCollider(ballRef,playingFieldRef) {
  this._GFW_Entity_Initialize();
  this.__ballRef  = ballRef;
  this.__fieldRef = playingFieldRef;
}

BallSideCollider.prototype = {
  __ballRef:  undefined,
  __fieldRef: undefined,

/* CALLBACKS */
  /** UPDATE */
  update: function (updateParams) {
    if ( this.__ballRef == undefined || this.__fieldRef == undefined ) // Ignore if there is no ball
      return;
    
    // Localize variables
    var ball  = this.__ballRef;
    var field = this.__fieldRef;
    
    var x = ball.getX();
    var y = ball.getY();
    var r = ball.getRadius();
    
    // Localize the ball's bounds
    var left    = x - r;
    var top     = y - r;
    var right   = x + r;
    var bottom  = y + r;

    // Bounce off of the walls
    if ( left < field.getX() || right > field.getWidth() ) // left/right
      ball.mulVelocityX( (left < field.getX() ? 1 : -1) );

    if ( top < field.getY() || bottom > field.getHeight() ) // top/bottom
      ball.mulVelocityY( (top < field.getY() ? 1 : -1) );
  },
  
}

GFW_mixin(BallSideCollider, GFW_Entity, ["update"]);
