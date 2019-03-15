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
        p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
      }
    };
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

    drawLevel();
  };

  // ======================================================= MY PRESS FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    p.startGame = false;
    p.loadingWidth = 0;
    p.timeOfStart = 0;
    p.randomTime = 0;
    createBall(p.color('red'));
    if (p.ready) { startTimer(); }
  }

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.timeOfStart = p.millis();
    p.randomTime = p.random(p.props.startTime*1000, p.props.gameTime*1000);
    p.myTimeOut = setTimeout(() => {
      p.startGame = true;
    }, p.randomTime);
  }

  // ======================================================= MY PRESS FUNCTION
  p.press = function () {
    clearTimeout(p.myTimeOut);
    endGame();
  };

  function endGame() {
    p.timeOfEnd = p.millis();
    let time = (p.timeOfEnd - p.randomTime - p.timeOfStart)/1000;
    if (time <= 0) { time = 0; }
    p.newGame = false;
    p.startGame = false;
    p.props.generateResult(time);
  }

  function drawLoadingLine() {
    const value = p.millis() - p.timeOfStart;
    p.loadingWidth = p.map(value, 0, (p.props.gameTime+p.props.startTime)*1000, 0, p.width, true);
    p.push();
    p.fill('blue');
    p.noStroke();
    p.rect(0, 0, p.loadingWidth, 2);
    p.pop();
  }

  function drawLevel() {
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
  }

  // ======================================================= ON MOUSE AND KEYBOARD PRESS
  p.mousePressed = function () {
    if (p.props.newGame && p.ready && p.props.leftMouseMode) {
      p.press();
    }
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      startTimer();
    }
  };
  p.keyPressed = function () {
    if (p.props.newGame && p.ready && p.keyCode === 32 && !p.props.leftMouseMode) {
      p.press();
    }
    return false;
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
}
