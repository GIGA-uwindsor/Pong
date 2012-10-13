function GameScene(state, assets) {
  this._GFW_Scene_Initialize(state, assets);
}

GameScene.prototype = {
  _onBegin: function (director) {
    var ball = new Ball(300,200);
    var field = new PlayingField(0,0,600,400);
    this.getState().addEntity(field);
    this.getState().addEntity( new BallSideCollider(ball, field) );
    this.getState().addEntity(ball);
  },
}

GFW_mixin(GameScene, GFW_Scene, ["_onBegin"]);
