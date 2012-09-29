window.onload = function () {
  var canvasID = "game";
  var director = new GFW_Director(canvasID, new GameScene(new State(), new GFW_AssetManager()));
  director.run();
}