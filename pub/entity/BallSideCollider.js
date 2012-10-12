/*  
  BallSideCollider Design:
    - Hit tests ball and the side (Tests against bounding box [0,0,width,height], where width and height are provided on object creation)
    - Ball-side collision resolution (Correctly sets ball's velocity when side is hit)
    
    Refs: Ball, PlayingField
*/
function BallSideCollider(ballRef,width,height) {
  this._GFW_Entity_Initialize();
  this.setFieldSize(width,height);
  this.__ballRef = ballRef;
}

BallSideCollider.prototype = {
  __ballRef: undefined,
  
/* CONVENIENCE */
  /** 
    * Sets the size of the field that the ball will be bounded to.
    */
  setFieldSize: function(width,height) {
    this.setFieldWidth(width);
    this.setFieldHeight(height);
  },

/* CALLBACKS */
  /** UPDATE */
  update: function (updateParams) {
    if ( this.__ballRef == undefined ) // Ignore if there is no ball
      return;
    
    // Localize variables
    var ball = this.__ballRef;
    var x = ball.getX();
    var y = ball.getY();
    var r = ball.getRadius();
    
    // Localize the ball's bounds
    var left    = x - r;
    var top     = y - r;
    var right   = x + r;
    var bottom  = y + r;

    // Bounce off of the walls
    if ( left <= 0 || right >= this.getFieldWidth() ) // left/right
      ball.mulVelocityX( (left <= 0 ? 1 : -1) );

    if ( top <= 0 || bottom >= this.getFieldHeight() ) // top/bottom
      ball.mulVelocityY( (top <= 0 ? 1 : -1) );
  },
  
}

// Field size
GFW_Property(BallSideCollider, "FieldWidth");
GFW_Property(BallSideCollider, "FieldHeight");

GFW_mixin(BallSideCollider, GFW_Entity, ["update"]);
