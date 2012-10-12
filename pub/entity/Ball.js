function Ball(x,y) {
  this._GFW_Entity_Initialize();
  this.setPosition(x,y);
  this.setVelocity(3,3);
  this.setBounds(640,480);
  this.setRadius(10);
}

Ball.prototype = {
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

    // Bounce off of the walls
    if ( left <= 0 || right >= boundX ) // left/right
      this.setVX( (left <= 0 ? 1 : -1) * Math.abs(this.getVX()) );

    if ( top <= 0 || bottom >= boundY ) // top/bottom
      this.setVY( (top <= 0 ? 1 : -1) * Math.abs(this.getVY()) );

    // Update the ball's position
    this.setPosition( x + this.getVX(), y + this.getVY() );
    
    // Randomize the ball's X velocity if there is none
    if ( this.getVX() == 0 )
      this.setVX( (Math.random() < 0.5 ? 1 : -1) * // either -1 or 1, multiplied by...
                    Math.floor(Math.random()*3 + 1) );  // a number from 1 to 3?
  },

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