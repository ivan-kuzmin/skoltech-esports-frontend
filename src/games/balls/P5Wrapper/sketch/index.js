import createStats from 'src/assets/js/createStats';
import Ball from './Ball';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.selectedBalls = [];
  p.moveBalls = true;
  p.startTime = 1;
  p.gameTime = 1;
  p.defaultColor = p.color('blue');
  p.targetColor = p.color('red');
  p.selectedColor = p.color(0, 255, 0);

  p.setup = function () {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.onSetAppState({ startNewGame });
    p.wrapper.onfullscreenchange = (event) => { if (!document.fullscreenElement) endGame(); };
  };

  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    p.cursor(p.ARROW);
    if (p.props.newGame) {
      if (p.ready) {
        if (p.selectedBalls.length !== p.props.targetBallsCount) {
          p.balls.forEach((ball) => {
            ball.display();
            if (p.moveBalls) { ball.move(); }
            if (p.startGame) { ball.hover(); }
          });
        } else {
          const targetBalls = {};
          for (const ball of p.reversedBalls.slice(0, p.props.targetBallsCount)) {
            targetBalls[ball.id] = { x: (ball.x).toFixed(3), y: (ball.y).toFixed(3) };
          }
          p.props.generateResult(targetBalls, p.selectedBalls);
          p.reversedBalls = [];
          p.selectedBalls = [];
        }
      }
      if (!p.ready) { drawFilter(); }
    }

    drawLabel();
  };

  p.mousePressed = function () {
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      startTimer();
    }
    if (p.startGame) {
      p.reversedBalls = [...p.balls].reverse();
      for (const ball of p.reversedBalls) {
        if (ball.d < ball.rad) {
          ball.clicked();
          break;
        }
      }
    }
  };

  function createBalls(speed) {
    p.minTargetId = p.props.ballsCount - p.props.targetBallsCount;
    p.balls = [];
    for (let i=0; i<p.props.ballsCount; i++) { p.balls[i] = new Ball(p, i, i>=p.minTargetId ? p.targetColor : p.defaultColor, speed); }
  }

  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    p.balls = [];
    createBalls(p.props.speed);
    p.reversedBalls = [];
    p.selectedBalls = [];
    p.moveBalls = true;
    p.startGame = false;
    if (p.ready) { startTimer(); }
  }

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.moveBalls = false;
    p.timeOut1 = setTimeout(() => {
      p.moveBalls = true;
      for (let i=p.minTargetId; i<p.props.ballsCount; i++) {
        p.balls[i].color = p.defaultColor;
      }
      p.timeOut2 = setTimeout(() => {
        p.moveBalls = false;
        p.startGame = true;
      }, p.gameTime*1000);
    }, p.startTime*1000);
  }

  // ======================================================= DRAW LABEL FUNCTION
  function drawLabel() {
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
  }

  // ======================================================= END GAME FUNCTION
  function endGame() {
    p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
    p.startGame = false;
    p.ready = false;
    clearTimeout(p.timeOut1);
    clearTimeout(p.timeOut2);
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
}
