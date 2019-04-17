import pointerLock from 'src/assets/js/pointerLock';
import createStats from 'src/assets/js/createStats';
import Ball from './Ball';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  // you can use exampleConfig like this
  // p.props.exampleConfig

  let ready = false;
  let startGame = false;
  let ball;

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.createCanvas(p.displayWidth, p.displayHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.onSetAppState({ startNewGame });

    // force end game
    p.wrapper.onfullscreenchange = (event) => {
      if (!document.fullscreenElement) {
        p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
        // change your variables to start game state
        ready = false;
        startGame = false;
      }
    };

    ball = new Ball(p, p.width/2, p.height/2, 50);

    // ball.moveCallback – PointerLock callback function
    pointerLock(p, ball.moveCallback, false); // remove it if you don't use pointer lock
  };

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    p.cursor(p.ARROW);

    // new game event
    if (p.props.newGame) {
      if (ready) {
        if (startGame) {
          ball.display();
        }
      }
      if (!ready) { drawFilter(); }
    }

    drawLabel();
  };

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (!p.pointerLockIsLocked()) { p.wrapper.requestPointerLock(); } // remove it if you don't use pointer lock
    startGame = true;
    ball.x = p.width/2;
    ball.y = p.height/2;
  }

  // ======================================================= END GAME FUNCTION
  function endGame() {
    // your end game function
    startGame = false;
    // generate results (App.js – generateResult function)
    p.props.generateResult();
  }

  // ======================================================= MOUSE PRESSED FUNCTION
  p.mousePressed = function () {
    if (p.props.newGame && !ready) {
      ready = true;
      startNewGame();
    }
    // your other mousePressed callbacks
    if (p.props.newGame && ready && startGame) {
      endGame();
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

  // ======================================================= DRAW LABEL
  function drawLabel() {
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
  }
}
