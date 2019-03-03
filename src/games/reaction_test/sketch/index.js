import Ball from './Ball';

export default function sketch(p) {
  p.props = {};
  p.fps = 0;

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.createCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.onSetAppState({ startNewGame });
    startNewGame();
  };

  // ======================================================= CREATE BALL FUNCTION
  function createBall(color) {
    p.ball = new Ball(
      p,
      p.props.radius,
      p.width/2,
      p.height/2,
      color,
    );
  }

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    p.background(230);
    p.cursor(p.ARROW);

    if (p.props.newGame) {
      if (p.startGame) {
        p.ball.display();
      }

      p.drawLoadingLine();
    }
    p.drawLevel();
  };

  // ======================================================= MY PRESS FUNCTION
  function startNewGame() {
    p.startGame = false;
    p.loadingWidth = 0;
    p.timeOfStart = 0;
    createBall(p.color('red'));
    p.myTimeOut = setTimeout(() => {
      p.startGame = true;
      p.timeOfStart = p.millis();
    }, p.random(p.props.startTime*1000, p.props.gameTime*1000));
  }

  // ======================================================= MY PRESS FUNCTION
  p.press = function () {
    clearTimeout(p.myTimeOut);
    endGame();
    // startNewGame();
  };

  function endGame() {
    p.timeOfEnd = p.millis();
    const time = p.startGame ? (p.timeOfEnd - p.timeOfStart)/1000 : 0;
    p.newGame = false;
    p.startGame = false;
    p.props.generateResult(time);
  }

  p.drawLoadingLine = function () {
    if (p.props.newGame) {
      if (p.loadingWidth <= p.width) {
        p.loadingWidth += p.width/(60*(p.props.gameTime+p.props.startTime));
      }
      p.push();
      p.fill('blue');
      p.noStroke();
      p.rect(0, 0, p.loadingWidth, 2);
      p.pop();
    }
  };

  p.drawLevel = function () {
    p.push();
    p.textAlign(p.LEFT, p.CENTER);
    p.textFont('Courier New');
    p.textSize(15);
    p.fill(0, 0, 0);
    if (p.frameCount%10 === 0) { p.fps = p.frameRate(); }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 30);
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 30, 50);
    p.pop();
  };

  // ======================================================= ON MOUSE AND KEYBOARD PRESS
  p.mousePressed = function () {
    if (p.props.newGame && p.props.leftMouseMode
      && p.mouseX >= 0 && p.mouseX <= p.width
      && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.press();
    }
  };
  p.keyPressed = function () {
    if (p.props.newGame && p.keyCode === 32 && !p.props.leftMouseMode) {
      p.press();
    }
    return false;
  };

  // ======================================================= ON WINDOW RESIZE FUNCTION
  p.windowResized = function () { window.location.reload(); };
}
