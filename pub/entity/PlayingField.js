function PlayingField(x, y, width, height) {
  this.setRect(new GFW_Rect(x, y, width height));
}

PlayingField.prototype = {

  

}

GFW_Property(PlayingField, "Rect");
GFW_mixin(PlayingField, GFW_Entity);