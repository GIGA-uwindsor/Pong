function GameScene(state, assets) {
  this._GFW_Scene_Initialize(state, assets);
}

GameScene.prototype = {
  _onBegin: function (director) {
    this.getState().addEntity(new Ball(100,100));
  },
}

GFW_mixin(GameScene, GFW_Scene, ["_onBegin"]);