function AwesomeCircle(color) {
  this._GFW_Entity_Initialize();
  this.setColor(color);
}

AwesomeCircle.prototype = {

  update: function (updateParams) {
  },

  draw: function (ctx, assets) {
    var x = ctx.canvas.width / 2;
    var y = ctx.canvas.height / 2;
    var radius = 100;
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    var clockwise = true;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, clockwise);
    ctx.fillStyle = this.getColor();
    ctx.fill();
  }

}

GFW_Property(AwesomeCircle, "Color");

GFW_mixin(AwesomeCircle, GFW_Entity, ["update", "draw"]);