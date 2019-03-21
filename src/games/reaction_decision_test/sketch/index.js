import createStats from 'src/assets/js/createStats';
import Ball from './Ball';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.onSetAppState({ startNewGame });
    p.wrapper.onfullscreenchange = (event) => {
      if (!document.fullscreenElement) {
        p.ready = false;
        p.startGame = false;
        clearTimeout(p.myTimeOut);
        p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
      }
    };
  };

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    p.cursor(p.ARROW);

    if (p.props.newGame) {
      if (p.ready) {
        drawLoadingLine();
        if (p.startGame) {
          p.ball.display();
        }
      }
      if (!p.ready) { drawFilter(); }
    }

    drawLabel();
  };

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (p.ready) {
      p.startGame = false;
      p.loadingWidth = 0;
      p.timeOfStart = p.millis();
      p.timeOfEnd = p.millis();
      createBall();
      clearTimeout(p.myTimeOut);
      p.myTimeOut = setTimeout(() => {
        p.startGame = true;
        p.randomTime = p.millis() - p.timeOfStart;
      }, p.random(p.props.startTime * 1000, p.props.gameTime * 1000));
    }
  }

  // ======================================================= CREATE BALL FUNCTION
  function createBall() {
    p.ball = null;
    p.randomColor = p.random(0, 1);
    p.ball = new Ball(
      p,
      p.props.radius,
      p.randomColor < 0.5 ? p.color('blue') : p.color('red'),
    );
  }

  function drawLabel() {
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
  }

  // ======================================================= ON MOUSE AND KEYBOARD PRESS
  p.mousePressed = function () {
    if (p.props.newGame && p.ready) {
      clearTimeout(p.myTimeOut);
      const correct_result = p.randomColor < 0.5 ? 'Right Click' : 'Left Click';
      const color = p.randomColor < 0.5 ? 'Blue' : 'Red';
      const x = (p.ball.xpos).toFixed(3);
      const y = (p.ball.ypos).toFixed(3);
      p.timeOfEnd = p.millis();
      if (p.startGame) {
        const guessColor = ((p.mouseButton === p.LEFT && p.randomColor >= 0.5) || (p.mouseButton === p.RIGHT && p.randomColor < 0.5));
        const time = ((p.timeOfEnd - p.timeOfStart - p.randomTime)/1000).toFixed(3);
        p.props.generateResult(time, guessColor, correct_result, color, x, y);
      } else {
        p.props.generateResult((0).toFixed(3), false, correct_result, color, x, y);
      }
    }
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      startNewGame();
    }
  };

  // ======================================================= DRAW FILTER
  function drawFilter() {
    p.push();
    p.fill(p.color(0, 0, 0, 150));
    p.rect(0, 0, p.width, p.height);
    p.fill('white');
    p.textSize(30);
    p.textStyle(p.NORMAL);
    p.textAlign(p.CENTER, p.TOP);
    p.text('CLICK TO START GAME', p.width / 2, p.height / 2 - 20);
    p.text('(ESC TO EXIT)', p.width / 2, p.height / 2 + 20);
    p.pop();
  }

  // ======================================================= DRAW LOADING LINE
  function drawLoadingLine() {
    const value = p.millis() - p.timeOfStart;
    p.loadingWidth = p.map(value, 0, (p.props.gameTime + p.props.startTime) * 1000, 0, p.width, true);
    p.push();
    p.fill('blue');
    p.noStroke();
    p.rect(0, 0, p.loadingWidth, 2);
    p.pop();
  }
}
