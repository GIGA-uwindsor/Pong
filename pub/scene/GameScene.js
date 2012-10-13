function GameScene(state, assets) {
  this._GFW_Scene_Initialize(state, assets);
}

GameScene.prototype = {
  _onBegin: function (director) {
    this.set__GameMaster(new GameMaster(this.getState()));
    this.getState().addEntity(this.get__GameMaster());
  },
}

GFW_Property(GameScene, "__GameMaster");
GFW_mixin(GameScene, GFW_Scene, ["_onBegin"]);
