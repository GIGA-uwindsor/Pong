/*  
  PaddleSideCollider Design:
    - Hit tests paddle and sides (paddle Y/Bottom with PlayingField Y/Bottom
    - Paddle-side collision resolution
    
    Refs: Paddle, PlayingField
*/
function BallSideCollider(paddleRef,playingFieldRef) {
  this._GFW_Entity_Initialize();
  this.__paddleRef  = paddleRef;
  this.__fieldRef   = playingFieldRef;
}

BallSideCollider.prototype = {
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
  
}

GFW_mixin(BallSideCollider, GFW_Entity, ["update"]);
