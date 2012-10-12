/*  
  Ball Design:
    + position (X/Y property, setPosition)
    + bounding circle (Radius property can be used by colliders)
    + velocity (VX/VY property, setVelocity, mulVelocityX/Y, implemented in update)
    + graphic (currently using a circle with Radius property)
    - if veloc.x is zero, correct to non-zero (done, also checks if veloc.x is too slow, since 0.001 is still non-zero)
*/
function Ball(x,y) {
  this._GFW_Entity_Initialize();
  this.setPosition(x,y);
  this.setVelocity( (Math.random() < 0.5 ? 1 : -1), (Math.random() < 0.5 ? 1 : -1));
  this.setRadius(10);
}

Ball.prototype = {
/* FUNCTIONALITY */  
  /**
    * Tells the ball to move either left or right at the given multiple of its current X velocity.
    *
    * @param multiplier
    *   The multiplier to apply to the ball's current X velocity.
    *
    * @param isAbsolute
    *   Boolean value specifying the behaviour of this function. If ommitted, the
    *   default value is true.
    *     true  = Multiplier is absolute. A negative multiplier moves the ball left,
    *             and a positive multiplier moves it right.
    *     false = Multiplier is relative. A negative multiplier moves the ball in the
    *             opposite direction it is currently moving.
    */
  mulVelocityX: function(multiplier, isAbsolute) {
    if ( isAbsolute == undefined ) isAbsolute = true; // default parameter
    var vx = isAbsolute ? Math.abs(this.getVX()) : this.getVX();
    this.setVX(vx * multiplier);    
  },

  /**
    * Tells the ball to move either up or down at the given multiple of its current Y velocity.
    *
    * @param multiplier
    *   The multiplier to apply to the ball's current Y velocity.
    *
    * @param isAbsolute
    *   Boolean value specifying the behaviour of this function. If ommitted, the
    *   default value is true.
    *     true  = Multiplier is absolute. A negative multiplier moves the ball up,
    *             and a positive multiplier moves it down.
    *     false = Multiplier is relative. A negative multiplier moves the ball in the
    *             opposite direction it is currently moving.
    */
  mulVelocityY: function(multiplier, isAbsolute) {
    if ( isAbsolute == undefined ) isAbsolute = true; // default parameter
    var vy = isAbsolute ? Math.abs(this.getVY()) : this.getVY();
    this.setVY(vy * multiplier);    
  },

/* CONVENIENCE */
  /**
    * Sets the position of the ball.
    */
  setPosition: function (x,y) {
    this.setX(x);
    this.setY(y);
  },
  
  /**
    * Sets the velocity of the ball. Positive values indicate the ball is moving
    * (right,down) and negative values indicate the ball is moving (left,up).
    */
  setVelocity: function (x,y) {
    this.setVX(x);
    this.setVY(y);
  },
  
/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    
    // Get the delta time since last update
    var delta = updateParams.getTime().getDelta();
    if ( Math.abs(delta) > 10000 ) // Return if delta is bugged
    {
      console.error("Delta: ", delta);
      return;
    }
    console.log("Delta: ", delta);
    
    // Update the ball's position
    this.setPosition( this.getX() + this.getVX()*delta/10, this.getY() + this.getVY()*delta/10 );
    
    // Randomize the ball's X velocity if it's either not moving, or too slow
    if ( Math.abs(this.getVX()) < 0.5 )
    {
      var direction;
      if ( this.getVX() < 0 )
        direction = -1;
      else if ( this.getVX() > 0 )
        direction = 1;
      else // VX is 0
        direction = (Math.random() < 0.5 ? 1 : -1);
      
      this.setVX( direction * // either -1 or 1, multiplied by...
                  Math.random()+1 );  // a random number from 1 to 2
    }
  },

  /** DRAW */
  draw: function (ctx, assets)
  {
    // Localize some variables
    var x = this.getX();
    var y = this.getY();
    var r = this.getRadius();
    
    // Code copied/modified from AwesomeCircle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    
    var grd = ctx.createRadialGradient(x,y,0, x,y,r);
    grd.addColorStop(0,"blue");
    grd.addColorStop(1,"black");
    
    ctx.fillStyle=grd;
    ctx.fill();
  },

}

// Position
GFW_Property(Ball, "X");
GFW_Property(Ball, "Y");

// Velocity
GFW_Property(Ball, "VX");
GFW_Property(Ball, "VY");

// Radius
GFW_Property(Ball, "Radius");

GFW_mixin(Ball, GFW_Entity, ["update", "draw"]);
