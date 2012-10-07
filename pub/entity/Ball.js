/*  
  Ball Design:
    + position (X/Y property, setPosition)
    + bounding circle (currently treated as bounding box in update)
    + velocity (VX/VY property, setVelocity, setVelocityMultiplier, implemented in update)
    + graphic (currently using a circle with Radius property)
    - if veloc.x is zero, correct to non-zero (done)
*/
function Ball(x,y) {
  this._GFW_Entity_Initialize();
  this.setPosition(x,y);
  this.setVelocity( (Math.random() < 0.5 ? 1 : -1), (Math.random() < 0.5 ? 1 : -1));
  this.setBounds(640,480);
  this.setRadius(200);
}

Ball.prototype = {
/* FUNCTIONALITY */
  /** 
    * Tells the ball that it was hit by a paddle.
    * @param paddle
    *   0: hit left paddle, moves ball right
    *   1: hit right paddle, moves ball left
    *
    * @param direction
    *  -1: paddle was moving up
    *   0: paddle was not moving
    *   1: paddle was moving down
    */
  hitPaddle: function (paddle,direction) {
    // @TODO
    // - Change the Y velocity based on the direction the paddle was moving.
  },
  
  /**
    * Tells the ball to move either left or right at the given multiple of its current velocity.
    *
    * @param multiplier
    *   The multiplier to apply to the ball's current X velocity.
    *
    * @param absolute
    *   Boolean value specifying the behaviour of this function.
    *     true  = Multiplier is absolute. A negative multiplier moves the ball left,
    *             and a positive multiplier moves it right.
    *     false = Multiplier is relative. A negative multiplier moves the ball in the
    *             opposite direction it is currently moving.
    */
  setVelocityMultiplier: function(multiplier, absolute) {
    var vx = absolute ? Math.abs(this.getVX()) : this.getVX();
    this.setVX(vx * multiplier);    
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
  
  /**
    * Sets the virtual bounding box of the ball to (0,0,x,y).
    */
  setBounds: function (x,y) {
    this.setBoundX(x);
    this.setBoundY(y);
  },

/* CALLBACKS */  
  /** UPDATE */
  update: function (updateParams) {
    
    // Get the delta time since last update
    var delta = updateParams.getTime().getDelta();
    if ( Math.abs(delta) > 10000 ) // Return if delta is bugged
      return;
      
    // Localize variables
    var x = this.getX();
    var y = this.getY();
    
    var boundX = this.getBoundX();
    var boundY = this.getBoundY();
    
    var r = this.getRadius();
    
    // Localize the ball's bounds
    var left    = x - r;
    var top     = y - r;
    var right   = x + r;
    var bottom  = y + r;
    
    //console.log("delta: %d", delta);

    /** @TODO: Collision handled by BallSideCollider */
    // Bounce off of the walls
    if ( left <= 0 || right >= boundX ) // left/right
      this.setVX( (left <= 0 ? 1 : -1) * Math.abs(this.getVX()) );

    if ( top <= 0 || bottom >= boundY ) // top/bottom
      this.setVY( (top <= 0 ? 1 : -1) * Math.abs(this.getVY()) );
    
    
    // Update the ball's position
    this.setPosition( x + this.getVX()*delta/10, y + this.getVY()*delta/10 );
    
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
  draw: function (ctx, assets) {
    // localize some variables
    var bx = this.getBoundX();
    var by = this.getBoundY();
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    
    // Project the ball onto the drawing canvas
    var x = (this.getX() / bx) * w;
    var y = (this.getY() / by) * h;
    var r = (this.getRadius() / Math.min(bx,by)) * Math.min(w,h);
    
    // Code copied/modified from AwesomeCircle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    
    var grd = ctx.createRadialGradient(x,y,0, x,y,r);
    grd.addColorStop(0,"blue");
    grd.addColorStop(1,"black");
    
    ctx.fillStyle=grd;
    ctx.fill();
  }

}

// Position
GFW_Property(Ball, "X");
GFW_Property(Ball, "Y");

// Velocity
GFW_Property(Ball, "VX");
GFW_Property(Ball, "VY");

// Scale
GFW_Property(Ball, "BoundX");
GFW_Property(Ball, "BoundY");

// Radius
GFW_Property(Ball, "Radius");

GFW_mixin(Ball, GFW_Entity, ["update", "draw"]);
