/*
  PaddleView design:
    + colour
*/
function PaddleView(left,top,right,bottom,color) {
  this._GFW_Entity_Initialize();
  this.setRect(left,top,right,bottom);
  this.setColor(color);
}

PaddleView.prototype = {

  /** Sets the rectangle for which the view should be drawn.
  */
  setRect: function(left,top,right,bottom)
  {
    this.setLeft(left);
    this.setTop(top);
    this.setRight(right);
    this.setBottom(bottom);
  }

  draw: function (ctx, assets) 
  {
    ctx.fillStyle = this.getColor();
    ctx.fillRect( this.getLeft(),
                  this.getTop(),
                  this.getRight(),
                  this.getBottom() );
  }

}

// Drawing bounds
GFW_Property(PaddleView, "Left");
GFW_Property(PaddleView, "Top");
GFW_Property(PaddleView, "Right");
GFW_Property(PaddleView, "Bottom");

// Colour
GFW_Property(PaddleView, "Color");

GFW_mixin(PaddleView, GFW_Entity, ["draw"]);
