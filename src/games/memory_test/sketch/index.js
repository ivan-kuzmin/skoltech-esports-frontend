import createStats from 'src/assets/js/createStats';
import Cell from './Cell';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.matrix = [];
  p.targets = [];
  p.clicked = [];

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    p.loadingWidth = 0;
    p.matrix = [];
    p.targets = [];
    p.clicked = [];
    p.ready = false;
    p.timeOfStart = 0;
    p.timeOfEnd = 0;
    clearTimeout(p.timeOut1);

    createMatrix();
    if (p.startGame) { startTimer(); }
  }

  // ======================================================= CREATE MATRIX FUNCTION
  function createMatrix() {
    for (let i=0; i<p.props.matrixSize; i++) {
      for (let j=0; j<p.props.matrixSize; j++) {
        const x = p.width/2 - p.props.cellSize*(p.props.matrixSize/2 - 0.5 - i);
        const y = p.height/2 - p.props.cellSize*(p.props.matrixSize/2 - 0.5 - j);
        const cell = new Cell(p, x, y, i, j);
        p.matrix.push(cell);
      }
    }
    while (p.targets.length < p.props.countOfTargets) {
      const r = p.floor(p.random(0, p.matrix.length));
      if (!p.matrix[r].isTarget) {
        p.matrix[r].isTarget = true;
        p.targets.push(p.matrix[r]);
      }
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
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    p.cursor(p.ARROW);

    if (p.props.newGame) {
      if (p.startGame) {
        if (!p.ready) {
          drawLoadingLine();
        }
        for (const cell of p.matrix) {
          cell.display();
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
      for (const cell of p.matrix) {
        cell.click();
      }
      if (p.clicked.length === p.targets.length) {
        let success = true;
        for (const cell of p.clicked) {
          if (!p.targets.includes(cell)) { success = false; }
        }
        const clicked = [];
        const targets = [];
        for (let i=0; i < p.clicked.length; i++) {
          clicked.push({ i: p.clicked[i].i, j: p.clicked[i].j });
          targets.push({ i: p.targets[i].i, j: p.targets[i].j });
        }
        p.props.generateResult(success, clicked, targets);
      }
    }
  };

  // ======================================================= END GAME FUNCTION
  function endGame() {
    p.onSetAppState({ newGame: false, playedGames: 0 });
    p.startGame = false;
    clearTimeout(p.timeOut1);
  }

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.ready = false;
    p.timeOfStart = p.millis();
    p.timeOut1 = setTimeout(() => {
      p.ready = true;
    }, p.props.startTime * 1000);
  }

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

  // ======================================================= DRAW LOADING LINE FUNCTION
  function drawLoadingLine() {
    const value = p.millis() - p.timeOfStart;
    p.loadingWidth = p.map(value, 0, p.props.startTime*1000, 0, p.width, true);
    p.push();
    p.fill('blue');
    p.noStroke();
    p.rect(0, 0, p.loadingWidth, 4);
    p.pop();
  }

  // ======================================================= DRAW LABEL FUNCTION
  function drawLabel() {
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight-20);
  }
}
