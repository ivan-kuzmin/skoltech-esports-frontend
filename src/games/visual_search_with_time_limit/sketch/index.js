import createStats from 'src/assets/js/createStats';
import Letter from './Letter';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.matrix = [];
  p.symbols = ['T', ' '];
  p.targetSymbol = 'L';

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    p.loadingWidth = 0;
    p.matrix = [];
    p.ready = false;
    p.timeOfStart = 0;
    p.timeOfEnd = 0;
    clearTimeout(p.timeOut1);
    clearTimeout(p.timeOut2);

    createMatrix();
    if (p.startGame) { startTimer(); }
  }

  // ======================================================= CREATE MATRIX FUNCTION
  function createMatrix() {
    for (let i=0; i<p.props.matrixSize; i++) {
      for (let j=0; j<p.props.matrixSize; j++) {
        const x = p.width/2 - p.props.letterSize*(p.props.matrixSize/2 - 0.5 - i);
        const y = p.height/2 - p.props.letterSize*(p.props.matrixSize/2 - 1 - j);
        const symbol = p.symbols[(p.random(0, 1) < 0.5) ? 0 : 1];
        const letter = new Letter(p, x, y, symbol);
        p.matrix.push(letter);
      }
    }
    p.presentL = p.random(0, 1) < 0.5;
    if (p.presentL) {
      const r = p.floor(p.random(0, p.matrix.length));
      p.matrix[r].symbol = p.targetSymbol;
    }
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
    p.wrapper.onfullscreenchange = (event) => { if (!document.fullscreenElement) endGame(); };
  };

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    for (const stat of stats) { stat.update(); }
    p.background(230);
    p.cursor(p.ARROW);

    if (p.props.newGame) {
      if (p.startGame) {
        if (p.ready) {
          drawLoadingLine();
          for (const letter of p.matrix) {
            letter.display();
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
      p.timeOfEnd = p.millis();
      const success = (p.mouseButton === p.LEFT && p.presentL) || (p.mouseButton === p.RIGHT && !p.presentL);
      const time = ((p.timeOfEnd - p.timeOfStart) / 1000).toFixed(3);
      p.props.generateResult(success, time);
    }
  };

  // ======================================================= END GAME FUNCTION
  function endGame() {
    p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
    p.startGame = false;
    clearTimeout(p.timeOut1);
    clearTimeout(p.timeOut2);
  }

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.timeOut1 = setTimeout(() => {
      p.ready = true;
      p.timeOfStart = p.millis();
      p.timeOut2 = setTimeout(() => {
        p.ready = false;
        p.timeOfEnd = p.millis();
        const success = false;
        const time = ((p.timeOfEnd - p.timeOfStart) / 1000).toFixed(3);
        p.props.generateResult(success, time);
      }, p.props.gameTime * 1000);
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
    p.loadingWidth = p.map(value, 0, p.props.gameTime*1000, 0, p.width, true);
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
