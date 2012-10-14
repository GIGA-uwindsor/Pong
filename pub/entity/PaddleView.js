/*
  PaddleView design:
    + colour
*/
function PaddleView(paddleRef,color) {
  this._GFW_Entity_Initialize();
  this.__paddleRef = paddleRef;
  this.setColor(color);
}

PaddleView.prototype = {
  __paddleRef: undefined,

  draw: function (ctx, assets) 
  {
    if ( this.__paddleRef == undefined )
      return;
      
    var paddle = this.__paddleRef;
    
    ctx.fillStyle = this.getColor();
    ctx.fillRect( paddle.getX(),
                  paddle.getY(),
                  paddle.getWidth(),
                  paddle.getHeight() );
  }

}

// Colour
GFW_Property(PaddleView, "Color");

GFW_mixin(PaddleView, GFW_Entity, ["draw"]);
