function Paddle(x, y, width, height) {
  this._GFW_Entity_Initialize();
  this.setRect(new GFW_Rect(x, y, width, height));
  this.setStartX(x);
  this.setStartY(y);
  //this.setVX(0);
  this.setVelocY(0);
  //this.setMaxVX(0);
  this.setMaxVY(2);
}

Paddle.prototype = {

  reset: function() {
    this.setX( this.getStartX() );
    this.setY( this.getStartY() );
  },

  /** 
    * Adds a value to the paddle's vertical velocity so that it may move.
    *
    * @param vy
    *   The amount of vertical velocity to apply to the paddle.
    *   A negative value indicates it will move up, otherwise down.
    */
  move: function(vy) {
    this.setVelocY( this.getVelocY() + vy );
  },

  /* x position */
  getX: function () {
    return this.getRect().getX();
  },
  setX: function (value) {
    this.getRect().setX(value);
  },
  
  /* y position */
  getY: function () {
    return this.getRect().getY();
  },
  setY: function (value) {
    this.getRect().setY(value);
  },
  
  /* width */
  getWidth: function () {
    return this.getRect().getWidth();
  },
  setWidth: function (value) {
    this.getRect().setWidth(value);
  },
  
  /* height */
  getHeight: function () {
    return this.getRect().getHeight();
  },
  setHeight: function (value) {
    this.getRect().setHeight(value);
  },
  
  /* right */
  getRight: function () {
    return this.getRect().getRight();
  },
  
  /* left */
  getBottom: function () {
    return this.getRect().getBottom();
  },
  
/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    // localize variable
    var delta = updateParams.getTime().getDelta();
    if ( Math.abs(delta) > 10000 ) // Return if delta is bugged
      return;

    var vy = this.getVelocY();
    
    // Enforce velocity limits
    if ( Math.abs(vy) > this.getMaxVY() )
      vy = vy < 0 ? -this.getMaxVY() : this.getMaxVY();
      
    this.setY( this.getY() + vy * delta/10 );
    this.setVelocY( vy * 0.8 );
  },
}

// Velocity
//GFW_Property(Paddle, "VX");
//GFW_Property(Paddle, "MaxVX");
GFW_Property(Paddle, "VelocY");
GFW_Property(Paddle, "MaxVY");

GFW_Property(Paddle, "Rect");
GFW_Property(Paddle, "StartX");
GFW_Property(Paddle, "StartY");
GFW_mixin(Paddle, GFW_Entity, ["update"]);
