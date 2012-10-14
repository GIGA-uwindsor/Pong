function PlayingField(x, y, width, height) {
  this._GFW_Entity_Initialize();
  this.setRect(new GFW_Rect(x, y, width, height));
}

PlayingField.prototype = {

  getX: function () {
    return this.getRect().getX();
  },
  
  getY: function () {
    return this.getRect().getY();
  },
  
  getWidth: function () {
    return this.getRect().getWidth();
  },
  
  getHeight: function () {
    return this.getRect().getHeight();
  },
  
  getRight: function () {
    return this.getRect().getRight();
  },
  
  getBottom: function () {
    return this.getRect().getBottom();
  },

  draw: function (ctx, assets) {
    ctx.strokeRect( this.getX(), this.getY(), this.getWidth(), this.getHeight() );
  },
}

GFW_Property(PlayingField, "Rect");
GFW_mixin(PlayingField, GFW_Entity, ["draw"]);