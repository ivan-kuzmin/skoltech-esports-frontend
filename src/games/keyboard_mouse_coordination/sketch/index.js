// import 'src/assets/js/p5.collide2d.min';
import pointerLock from 'src/assets/js/pointerLock';
import createStats from 'src/assets/js/createStats';
import { openFullscreen } from 'src/assets/js/fullScreen';
import Ball from './Ball';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.fps = 0;
  p.timeOfStart = 0;
  p.timeOfEnd = 0;
  p.cs_go_coefficient = 0.2745;

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.createCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.onSetAppState({ startNewGame });

    pointerLock(p, p.moveCallback, false);
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
      // if (document.fullscreen) { p.onSetAppState({ newGame: false }); }
      p.push();
      p.strokeWeight(3);
      p.stroke('red');
      p.line(p.width/2, 0, p.width/2, p.height);
      p.pop();

      p.lBall.display();
      p.rBall.display();
      if (p.moveBalls) { p.keyBoardMove(); }

      for (const ball of p.leftBalls) {
        ball.display();
        if (p.moveBalls) {
          ball.move();
          const d = p.dist(ball.x, ball.y, p.lBall.x, p.lBall.y);
          if (d <= ball.radius + p.lBall.radius) { endGame('Keyboard'); }
        }
      }
      for (const ball of p.rightBalls) {
        ball.display();
        if (p.moveBalls) {
          ball.move();
          const d = p.dist(ball.x, ball.y, p.rBall.x, p.rBall.y);
          if (d <= ball.radius + p.rBall.radius) { endGame('Mouse'); }
        }
      }

      if (!p.pointerLockIsLocked()) { drawFilter(); }
    }

    if (p.frameCount%20 === 0) { p.fps = p.frameRate(); }
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
    p.text(`Time: ${(((p.moveBalls ? p.millis() : p.timeOfEnd)-p.timeOfStart)/1000).toFixed(3)}`, 20, p.wrapper.offsetHeight-40);
  };

  // ======================================================= FORCE END GAME ON EXIT FULLSCREEN
  document.addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreenElement) {
      p.timeOfStart = 0;
      p.timeOfEnd = 0;
      p.startGame = false;
      p.moveBalls = false;
      p.leftBalls = [];
      p.rightBalls = [];
      clearInterval(p.timeOut1);
      p.onSetAppState({ newGame: false, playedGames: 0 });
    }
  });

  // ======================================================= MOUSE PRESSED FUNCTION
  p.mousePressed = function () {
    if (!p.pointerLockIsLocked() && p.props.newGame && !p.startGame
      && p.mouseX > 0 && p.mouseX < p.width
      && p.mouseY > 0 && p.mouseY < p.height) {
      startNewGame();
      startTimer();
    }
  };

  // ======================================================= MOUSE MOVE FUNCTION
  p.moveCallback = function (x, y) {
    if (p.moveBalls) {
      if (y < 0) { // MOUSE UP
        const nextY = p.rBall.y + y*p.props.sensitivity*p.cs_go_coefficient;
        p.rBall.y = (nextY > p.minY) ? nextY : p.minY;
      }
      if (y > 0) { // MOUSE DOWN
        const nextY = p.rBall.y + y*p.props.sensitivity*p.cs_go_coefficient;
        p.rBall.y = (nextY < p.maxY) ? nextY : p.maxY;
      }
      if (x < 0) { // MOUSE LEFT
        const nextX = p.rBall.x + x*p.props.sensitivity*p.cs_go_coefficient;
        p.rBall.x = (nextX > p.rminX) ? nextX : p.rminX;
        if (nextX < p.rminX) { endGame('Mouse'); }
      }
      if (x > 0) { // MOUSE RIGHT
        const nextX = p.rBall.x + x*p.props.sensitivity*p.cs_go_coefficient;
        p.rBall.x = (nextX < p.rmaxX) ? nextX : p.rmaxX;
      }
    }
  };

  // ======================================================= KEYBOARD MOVE FUNCTION
  p.keyBoardMove = function () {
    if (p.keyIsDown(87)) { // W
      const nextY = p.lBall.y - p.props.keyboardStep;
      p.lBall.y = (nextY > p.minY) ? nextY : p.minY;
    }
    if (p.keyIsDown(83)) { // S
      const nextY = p.lBall.y + p.props.keyboardStep;
      p.lBall.y = (nextY < p.maxY) ? nextY : p.maxY;
    }
    if (p.keyIsDown(65)) { // A
      const nextX = p.lBall.x - p.props.keyboardStep;
      p.lBall.x = (nextX > p.lminX) ? nextX : p.lminX;
    }
    if (p.keyIsDown(68)) { // D
      const nextX = p.lBall.x + p.props.keyboardStep;
      p.lBall.x = (nextX < p.lmaxX) ? nextX : p.lmaxX;
      if (nextX > p.lmaxX) { endGame('Keyboard'); }
    }
  };

  // ======================================================= DRAW POINTERLOCK FILTER
  function drawFilter() {
    p.push();
    p.fill(p.color(0, 0, 0, 150));
    p.rect(0, 0, p.width, p.height);
    p.fill('white');
    p.textSize(30);
    p.textStyle(p.NORMAL);
    p.textAlign(p.CENTER, p.TOP);
    p.text('CLICK HERE TO START GAME', p.width/2, p.height/2);
    p.pop();
  }

  // ======================================================= CREATE BALL FUNCTION
  function createBall(minX, maxX, centerBall, ballsArray) {
    const ball = new Ball(p, p.random(minX, maxX), p.random(p.minY, p.maxY), p.props.radius, 'red');
    const dCenter = p.dist(ball.x, ball.y, centerBall.x, centerBall.y);
    if (dCenter < ball.radius + 3*centerBall.radius) { return; }
    for (let j=0; j<ballsArray.length; j++) {
      const d = p.dist(ball.x, ball.y, ballsArray[j].x, ballsArray[j].y);
      if (d < ball.radius + ballsArray[j].radius) { return; }
    }
    ball.minX = minX;
    ball.maxX = maxX;
    ballsArray.push(ball);
  }

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    openFullscreen(p.wrapper);
    p.timeOfStart = 0;
    p.timeOfEnd = 0;
    p.startGame = false;
    p.moveBalls = false;
    p.leftBalls = [];
    p.rightBalls = [];
    p.minY = p.props.radius;
    p.maxY = p.height - p.props.radius;
    p.lminX = p.props.radius;
    p.lmaxX = p.width/2 - p.props.radius;
    p.rminX = p.width/2 + p.props.radius;
    p.rmaxX = p.width - p.props.radius;

    p.lBall = new Ball(p, p.width*0.25, p.height/2, p.props.radius, 'blue');
    p.rBall = new Ball(p, p.width*0.75, p.height/2, p.props.radius, 'blue');

    let i = 0;
    while (p.leftBalls.length < p.props.ballsCount) {
      createBall(p.lminX, p.lmaxX, p.lBall, p.leftBalls);
      i += 1;
      if (i === 10000) { break; }
    }
    i = 0;
    while (p.rightBalls.length < p.props.ballsCount) {
      createBall(p.rminX, p.rmaxX, p.rBall, p.rightBalls);
      i += 1;
      if (i === 10000) { break; }
    }
    if (p.pointerLockIsLocked()) { startTimer(); }
  }

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.startGame = true;
    p.timeOut1 = setTimeout(() => {
      p.moveBalls = true;
      p.timeOfStart = p.millis();
    }, 1000*p.props.startTime);
  }

  // ======================================================= END GAME FUNCTION
  function endGame(mode) {
    p.startGame = false;
    p.moveBalls = false;
    p.timeOfEnd = p.millis();
    p.props.generateResult(p.timeOfStart, p.timeOfEnd, mode);
  }

  // ======================================================= ON WINDOW RESIZE FUNCTION
  p.windowResized = function () {
    if (p.props.newGame) {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    } else {
      p.resizeCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight);
    }
    if (p.pointerLockIsLocked()) { startNewGame(); }
  };
}
