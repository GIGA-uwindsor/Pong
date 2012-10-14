function Paddle(x, y, width, height) {
  this._GFW_Entity_Initialize();
  this.setRect(new GFW_Rect(x, y, width, height));
  this.setStartX(x);
  this.setStartY(y);
  this.setVelocX(0);
  this.setVelocY(0);
}

Paddle.prototype = {

  reset: function() {
    this.setX( this.getStartX() );
    this.setY( this.getStartY() );
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
  }
}

GFW_Property(Paddle, "VelocX");
GFW_Property(Paddle, "VelocY");
GFW_Property(Paddle, "Rect");
GFW_Property(Paddle, "StartX");
GFW_Property(Paddle, "StartY");
GFW_mixin(Paddle, GFW_Entity);