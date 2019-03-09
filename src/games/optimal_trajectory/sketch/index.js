import pointerLock from 'src/assets/js/pointerLock';
import createStats from 'src/assets/js/createStats';
import Ball from './Ball';
import Aim from './Aim';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.cs_go_coefficient = 0.2745;
  p.aimTrajectory = [];

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (!p.pointerLockIsLocked()) { p.wrapper.requestPointerLock(); }
    p.loadingWidth = 0;
    p.ready = false;
    p.timeOfStart = 0;
    p.timeOfEnd = 0;
    p.balls = [];
    p.clicks = [];

    let i = 0;
    while (p.balls.length < p.props.ballsCount) {
      createBall();
      i += 1;
      if (i === 10000) { break; }
    }

    p.aim = new Aim(p, p.width/2, p.height/2);
    if (p.startGame) { startTimer(); }
  }

  // ======================================================= CREATE BALL FUNCTION
  function createBall() {
    const ball = new Ball(p, p.props.radius, 'red');
    for (let i=0; i<p.balls.length; i++) {
      const d = p.dist(ball.x, ball.y, p.balls[i].x, p.balls[i].y);
      if (d < ball.radius + p.balls[i].radius) { return; }
    }
    p.balls.push(ball);
  }

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
        p.onSetAppState({ newGame: false, playedGames: 0 });
        p.startGame = false;
        clearTimeout(p.timeOut1);
      }
    };

    pointerLock(p, moveCallback, false);
  };

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    for (const stat of stats) { stat.update(); }
    p.background(230);
    p.cursor(p.ARROW);

    if (p.props.newGame) {
      if (p.startGame) {
        drawLoadingLine();
        if (p.ready) {
          for (const ball of p.balls) { ball.display(); }
          p.aimTrajectory.push({ x: p.aim.x, y: p.aim.y });
        }
      }
      p.aim.display();
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
      if (p.clicks.length < p.props.ballsCount) {
        for (const ball of p.balls) {
          const d = p.dist(p.aim.x, p.aim.y, ball.x, ball.y);
          if (d <= p.props.radius && !ball.visited) {
            ball.fill = 'blue';
            ball.visited = true;
            const time = p.millis() - p.timeOfStart;
            p.clicks.push({ x: p.aim.x, y: p.aim.y, time });
          }
        }
      }
      if (p.clicks.length === p.props.ballsCount) {
        p.timeOfEnd = p.millis();
        p.ready = false;
        const balls = [];
        for (const ball of p.balls) {
          balls.push({
            x: ball.x,
            y: ball.y,
          });
        }
        p.props.generateResult(balls, p.clicks, p.aimTrajectory, p.timeOfStart, p.timeOfEnd);
      }
    }
  };

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.timeOut1 = setTimeout(() => {
      p.ready = true;
      p.timeOfStart = p.millis();
    }, p.props.startTime * 1000);
  }

  // ======================================================= MOUSE MOVE FUNCTION
  function moveCallback(x, y) {
    if (p.startGame) {
      let nextY = p.aim.y + y * p.props.sensitivity * p.cs_go_coefficient;
      if (nextY > p.height) {
        nextY = p.height;
      } else if (nextY < 0) {
        nextY = 0;
      }
      let nextX = p.aim.x + x * p.props.sensitivity * p.cs_go_coefficient;
      if (nextX > p.width) {
        nextX = p.width;
      } else if (nextX < 0) {
        nextX = 0;
      }
      p.aim.x = nextX;
      p.aim.y = nextY;
    }
  }

  // ======================================================= DRAW POINTERLOCK FILTER
  function drawFilter() {
    p.push();
    p.fill(p.color(0, 0, 0, 240));
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
    if (p.loadingWidth <= p.width) {
      p.loadingWidth += p.width / (60 * (p.props.startTime));
    }
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
