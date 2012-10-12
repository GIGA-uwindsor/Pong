/*  
  BallSideCollider Design:
    - Hit tests ball and the side (Tests against bounding box [0,0,width,height], where width and height are provided on object creation)
    - Ball-side collision resolution (Correctly sets ball's velocity when side is hit)
    
    Refs: Ball, PlayingField
*/
function BallSideCollider(ballRef,playingFieldRef) {
  this._GFW_Entity_Initialize();
  this.__ballRef = ballRef;
  this.__fieldRef   = playingFieldRef;
}

BallSideCollider.prototype = {
  __ballRef: undefined,
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
    if ( left < 0 || right > field.getWidth() ) // left/right
      ball.mulVelocityX( (left < 0 ? 1 : -1) );

    if ( top < 0 || bottom > field.getHeight() ) // top/bottom
      ball.mulVelocityY( (top < 0 ? 1 : -1) );
  },
  
}

GFW_mixin(BallSideCollider, GFW_Entity, ["update"]);
