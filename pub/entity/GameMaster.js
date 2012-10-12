function GameMaster(state) {
  this._GFW_Entity_Initialize();

  /*
   * Initialize game entities
   */

  // TODO: extract numbers into some JSON config
  var playingField = new PlayingField(0, 0, 600, 300);
  var ball = new Ball(300, 200);
  var humanPaddle = new Paddle(25, 100);
  var aiPaddle = new Paddle(500, 100);
  
  var ballSideCldr = new BallSideCollider(ball, playingField);
  
  var ballHumanPaddleCldr =
    new BallPaddleCollider(ball, humanPaddle);
  var humanPaddleSideCldr =
    new PaddleSideCollider(humanPaddle, playingField);
  var humanPaddleCtrl = new HumanPaddleController(humanPaddle);
  var humanPaddleView = new PaddleView(humanPaddle, "#FF0000");
  
  var ballAIPaddleCldr =
    new BallPaddleCollider(ball, aiPaddle);
  var aiPaddleSideCldr =
    new PaddleSideCollider(aiPaddle, playingField);
  var aiPaddleCtrl = new AIPaddleController(aiPaddle);
  var aiPaddleView = new PaddleView(aiPaddle, "#00FF00");
  
  state.addEntity(playingField);
  state.addEntity(ball);
  state.addEntity(humanPaddle);
  state.addEntity(aiPaddle);
  state.addEntity(ballSideCldr);
  state.addEntity(ballHumanPaddleCldr);
  state.addEntity(humanPaddleSideCldr);
  state.addEntity(humanPaddleCtrl);
  state.addEntity(humanPaddleView);
  state.addEntity(ballAIPaddleCldr);
  state.addEntity(aiPaddleSideCldr);
  state.addEntity(aiPaddleCtrl);
  state.addEntity(aiPaddleView);
  
  /*
   * 
   */
   
  this.set__Ball(ball);
  this.set__HumanPaddle(humanPaddle);
  this.set__AIPaddle(aiPaddle);
  this.set__humanScore(0);
  this.set__aiScore(0);
}

GameMaster.prototype = {
  
  update: function (updateParams) {
  
    /* Test if ball is in either end zone and
     * award points accordingly.
     */
    
    var ball = this.get__Ball();
    var ballLeft = ball.getX() - ball.getRadius();
    var ballRight = ball.getX() + ball.getRadius();
    var field = this.get__PlayingField();
    
    var pointScored = false;
    
    if (ballLeft <= field.getLeft()) {
      this.__pointToHuman();
      pointScored = true;
    }
    if (ballRight >= field.getRight()) {
      this.__pointToAI();
      pointScored = true;
    }
    
    if (pointScored) {
      this.__resetGame();
    }
  
  },
  
  __pointToHuman: function () {
    this.set__humanScore(this.get__humanScore() + 1);
  },
  
  __pointToAI: function () {
    this.set__aiScore(this.get__aiScore() + 1);
  },
  
  __resetGame: function () {
    // extract numbers to JSON config
    var ball = this.get__Ball();
    var humanPaddle = this.get__HumanPaddle();
    var aiPaddle = this.get__AIPaddle();
    
    ball.setX(300);
    ball.setY(200);
    
    humanPaddle.setX(25);
    humanPaddle.setY(100);
    
    aiPaddle.setX(550);
    aiPaddle.setY(100);
  },
  
  getDependencies: function (outList) {
    outList.push(this.get__Ball());
    outList.push(this.get__HumanPaddle());
    outList.push(this.get__AIPaddle());
  }
  
}

GFW_Property(GameMaster, "__Ball");
GFW_Property(GameMaster, "__HumanPaddle");
GFW_Property(GameMaster, "__AIPaddle");
GFW_Property(GameMaster, "__PlayingField");
GFW_Property(GameMaster, "__humanScore");
GFW_Property(GameMaster, "__aiScore");
GFW_mixin(GameMaster, GFW_Entity, ["update", "getDependencies"]);