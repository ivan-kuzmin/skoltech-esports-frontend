import createStats from 'src/assets/js/createStats';
import Ball from './Ball';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    p.loadingWidth = 0;
    p.ready = false;
    p.timeOfStart = 0;
    clearInterval(p.timeOut1);

    createBall();
    if (p.startGame) { startTimer(); }
  }

  // ======================================================= CREATE MATRIX FUNCTION
  function createBall() {
    p.ball = new Ball(p, p.width/2, p.height/2);
  }

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.minBall = 0.3 * p.height; // MIN RADIUS OF BALL RELATIVE TO THE HEIGHT
    p.maxBall = 0.5 * p.height; // MAX RADIUS OF BALL RELATIVE TO THE HEIGHT
    p.minDeviation = 0.2 * p.height; // MIN DEVIATION FROM THE BALL RADIUS
    p.maxDeviation = 0.4 * p.height; // MAX DEVIATION FROM THE BALL RADIUS
    p.maxContour = 0.9 * p.height; // MAX RADIUS OF CONTOUR RELATIVE TO THE HEIGHT
    p.minSpeed = 5;
    p.maxSpeed = 10;

    p.onSetAppState({ startNewGame });
    p.wrapper.onfullscreenchange = (event) => { if (!document.fullscreenElement) endGame(); };
  };

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    for (const stat of stats) { stat.update(); }
    p.background(230);
    p.cursor(p.ARROW);

    if (p.props.newGame) {
      if (p.startGame) {
        drawLoadingLine();
        p.ball.display();
        if (p.ready) {
          p.ball.move();
          if (p.ball.radius >= p.ball.contour + 100) {
            p.ready = false;
            const success = false;
            p.props.generateResult(success, p.ball);
          }
        }
      }
      if (!p.startGame) { drawFilter(); }
    }

    drawLabel();
  };

  // ======================================================= MOUSEPRESSED FUNCTION
  p.mousePressed = () => {
    if (p.props.newGame && !p.startGame) {
      p.startGame = true;
      startTimer();
    }
    if (p.props.newGame && p.ready) {
      const success = true;
      p.props.generateResult(success, p.ball);
    }
  };

  // ======================================================= END GAME FUNCTION
  function endGame() {
    p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
    p.startGame = false;
    clearTimeout(p.timeOut1);
  }

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.timeOfStart = p.millis();
    p.timeOut1 = setTimeout(() => {
      p.ready = true;
    }, p.props.startTime * 1000);
  }

  // ======================================================= DRAW POINTERLOCK FILTER
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

  // ======================================================= DRAW LOADING LINE FUNCTION
  function drawLoadingLine() {
    const value = p.millis() - p.timeOfStart;
    p.loadingWidth = p.map(value, 0, p.props.startTime*1000, 0, p.width, true);
    p.push();
    p.fill('blue');
    p.noStroke();
    p.rect(0, 0, p.loadingWidth, 2);
    p.pop();
  }

  // ======================================================= DRAW LABEL FUNCTION
  function drawLabel() {
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
  }
}
