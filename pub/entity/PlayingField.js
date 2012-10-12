function PlayingField(x, y, width, height) {
  this.setRect(new GFW_Rect(x, y, width height));
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
  }

}

GFW_Property(PlayingField, "Rect");
GFW_mixin(PlayingField, GFW_Entity);