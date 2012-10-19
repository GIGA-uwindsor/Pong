/*
  ScoreView design:
*/
function ScoreView(gameMasterRef, playingFieldRef) {
  this._GFW_Entity_Initialize();

  this.__gameMasterRef = gameMasterRef;
  this.__playingFieldRef = playingFieldRef;
}

ScoreView.prototype = {
  __gameMasterRef: undefined,
  __playingFieldRef: undefined,

  draw: function (ctx, assets) 
  {
    if ( this.__gameMasterRef == undefined || this.__playingFieldRef == undefined )
      return;
      
    var gameMaster = this.__gameMasterRef;
    var playingField = this.__playingFieldRef;
    
    ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "40pt Arial";
    ctx.fillText(gameMaster.getHumanScore(), 74, 50);
    ctx.fillText(gameMaster.getAiScore(), playingField.getWidth() - 100, 50);
  }

}

GFW_mixin(ScoreView, GFW_Entity, ["draw"]);
