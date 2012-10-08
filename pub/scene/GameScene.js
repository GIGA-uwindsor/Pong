function GameScene(state, assets) {
  this._GFW_Scene_Initialize(state, assets);
}

GameScene.prototype = {
  _onBegin: function (director) {
    var ball = new Ball(300,200);
    this.getState().addEntity( new BallSideCollider(ball,600,400) );
    this.getState().addEntity(ball);
  },
}

GFW_mixin(GameScene, GFW_Scene, ["_onBegin"]);
