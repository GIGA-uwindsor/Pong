function Ball(x,y) {
  this._GFW_Entity_Initialize();
  this.setPosition(x,y);
  this.setVelocity(.5,1);
  this.setBounds(640,480);
  this.setRadius(10);
}

Ball.prototype = {
/* FUNCTIONALITY */
  // Tells the ball that it was hit by a paddle.
  // paddle:
  //    0: hit left paddle, move ball right
  //    1: hit right paddle, move ball left
  // direction:
  //   -1: paddle was moving up
  //    0: paddle was not moving
  //    1: paddle was moving down
  hitPaddle: function (paddle,direction) {
    // @TODO
    // - Invert the X velocity
    // - Change the Y velocity based on the direction the paddle was moving.
  },
  
  // Tells the ball to move either left or right at the given multiple of its current velocity.
  //
  // multiplier: The multiplier to apply to the ball's current X velocity.
  //
  // absolute: Boolean specifying the behaviour of this function.
  //      true = Multiplier is absolute. A negative multiplier moves the ball left,
  //              and a positive multiplier moves it right.
  //      false = Multiplier is relative. A negative multiplier moves the ball in the
  //              opposite direction it is currently moving.
  setVelocityMultiplier: function(multiplier, absolute) {
    var vx = absolute ? Math.abs(this.getVX()) : this.getVX();
    this.setVX(vx * multiplier);    
  },
  
/* CONVENIENCE */
  // Sets the position of the Ball
  setPosition: function (x,y) {
    this.setX(x);
    this.setY(y);
  },
  // Sets the velocity of the Ball, negative value goes left/up
  setVelocity: function (x,y) {
    this.setVX(x);
    this.setVY(y);
  },
  // Sets the bounds of the ball, this is stretched over the canvas
  setBounds: function (x,y) {
    this.setBoundX(x);
    this.setBoundY(y);
  },

/* CALLBACKS */  
  // UPDATE
  update: function (updateParams) {
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
    
    // Get the delta time since last update
    var delta = updateParams.getTime().getDelta();
    if ( Math.abs(delta) > 10000 )
      return;
    
    //console.log("delta: %d", delta);

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

  // DRAW
  draw: function (ctx, assets) {
    // Project the ball onto the drawing canvas
    var x = (this.getX() / this.getBoundX()) * ctx.canvas.width;
    var y = (this.getY() / this.getBoundY()) * ctx.canvas.height;
    
    // Code copied/modified from AwesomeCircle
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    ctx.beginPath();
    ctx.arc(x, y, this.getRadius(), startAngle, endAngle, true);
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
