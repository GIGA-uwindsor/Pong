/*  
  PaddleSideCollider Design:
    - Hit tests paddle and sides (paddle Y/Bottom with PlayingField Y/Bottom
    - Paddle-side collision resolution
    
    Refs: Paddle, PlayingField
*/
function PaddleSideCollider(paddleRef,playingFieldRef) {
  this._GFW_Entity_Initialize();
  this.__paddleRef  = paddleRef;
  this.__fieldRef   = playingFieldRef;
}

PaddleSideCollider.prototype = {
  __paddleRef: undefined,
  __fieldRef:  undefined,
  
/* CALLBACKS */
  /** UPDATE */
  update: function (updateParams) {
    if ( this.__paddleRef == undefined || this.__fieldRef == undefined )
      return;
    
    // Localize variables
    var paddle  = this.__paddleRef;
    var field   = this.__fieldRef;
    
    // Limit the top
    if ( paddle.getY() < field.getY() )
      paddle.setY( field.getY() );
    
    // Limit the bottom
    if ( paddle.getBottom() > field.getBottom() )
      paddle.setY( field.getBottom() - paddle.getHeight() );
  },
  
  /** DEPENDENCIES */
  getDependencies: function(state, outList) {
    outList.push(this.__paddleRef);
  }
}

GFW_mixin(PaddleSideCollider, GFW_Entity, ["update", "getDependencies"]);
