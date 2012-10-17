function PenetrationSolver(bounds, ball, paddle) {
  this._GFW_Entity_Initialize();
  this.set__Bounds(bounds);
  this.set__Ball(ball);
  this.set__Paddle(paddle);
}

PenetrationSolver.prototype = {

  update: function (updateParams) {
    // TODO: ignores paddle pinching ball against bounds
    if (this.__ballIntersectsPaddle()) {
      this.__separateBallFromPaddle();
    }
  },
  
  __separateBallFromPaddle: function () {
    var bounds = this.get__Bounds();
    var paddle = this.get__Paddle();
    var ball = this.get__Ball();
    
    // paddle centre to ball centre unit vector
    var bpx = ball.getX() - paddle.getX() - paddle.getWidth() / 2.0;
    var bpy = ball.getY() - paddle.getY() - paddle.getHeight() / 2.0;
    var n = Math.sqrt(bpx*bpx + bpy*bpy);
    bpx = bpx / n;
    bpy = bpy / n;
    
    var min_x = ball.getX();
    var min_y = ball.getY();
    // initial guess
    var m = ball.getRadius() * 2;
    var max_x = min_x + m * bpx;
    var max_y = min_y + m * bpy;
    
    // narrow down the point of contact
    for (var i = 0; i < m; ++i) {
      var mid_x = (max_x + min_x) / 2.0;
      var mid_y = (max_y + min_y) / 2.0;
      ball.setX(mid_x);
      ball.setY(mid_y);
      
      if (this.__ballIntersectsPaddle()) {
        min_x = mid_x;
        min_y = min_y;
      }
      else {
        max_x = mid_x;
        max_y = mid_y;
      }
    }
  },
  
  __ballIntersectsPaddle: function() {
    var paddle = this.get__Paddle();
    var ball = this.get__Ball();
    return Geometry.isCircleIntersectingRect(
      ball.getX(),
      ball.getY(),
      ball.getRadius(),
      paddle.getRect()
    );
  }

}

GFW_Property(PenetrationSolver, "__Ball");
GFW_Property(PenetrationSolver, "__Bounds");
GFW_Property(PenetrationSolver, "__Paddle");

GFW_mixin(PenetrationSolver, GFW_Entity, ["update"]);