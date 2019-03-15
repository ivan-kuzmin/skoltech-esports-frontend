import createStats from 'src/assets/js/createStats';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.allKeys = [
    { key: 87, value: 'W' },
    { key: 65, value: 'A' },
    { key: 83, value: 'S' },
    { key: 68, value: 'D' },
    { key: 16, value: 'SHIFT' },
    { key: 17, value: 'CTRL' },
    { key: 32, value: 'SPACE' },
  ];
  p.targetString = [];

  // ======================================================= START NEW GAME FUNCTION
  function startNewGame() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    p.loadingWidth = 0;
    p.ready = false;
    p.targetString = [];
    p.currentInput = [];
    p.index = 0;
    p.timeOfStart = 0;
    p.timeOfEnd = 0;
    p.characterWidth = p.width/p.props.targetStringLength;
    for (let i=0; i<p.props.targetStringLength; i++) {
      const r = p.floor(p.random(0, p.allKeys.length));
      p.targetString.push(p.allKeys[r]);
    }
    if (p.startGame) { startTimer(); }
  }

  // ======================================================= END GAME FUNCTION
  function endGame() {
    p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
    p.startGame = false;
    p.targetString = [];
    clearTimeout(p.timeOut1);
    clearTimeout(p.timeOut2);
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

    // DRAW TARGET STRING
    p.push();
    const textSize = p.characterWidth/5; // "SHIFT" – MAX LENGTH WORD HAS 5 CHARACTERS
    p.textSize(textSize);
    p.textAlign(p.CENTER);
    p.rectMode(p.CENTER);
    p.noStroke();
    for (let i=0; i<p.targetString.length; i++) {
      const char = p.targetString[i];
      const centerX = p.width/2 - p.characterWidth*(p.props.targetStringLength/2 - i - 0.5);
      const startY = p.height/2-40;
      const px = 20;

      p.currentInput[i] === char ? p.fill('blue') : p.fill('black');
      p.text(char.value, centerX, startY);
      p.rect(centerX, startY+20, p.characterWidth-px, 10);
    }
    p.pop();

    if (p.props.newGame) {
      if (p.startGame) {
        if (p.ready) {
          drawLoadingLine();
        }
      }
      if (!p.startGame) { drawFilter(); }
    }

    drawLabel();
  };

  // ======================================================= KEYPRESSED FUNCTION
  p.keyPressed = () => {
    if (p.ready) {
      if (p.keyCode === p.targetString[p.index].key) {
        p.currentInput.push(p.targetString[p.index]);
        p.index += 1;
      }
      if (p.currentInput.length === p.targetString.length) {
        p.timeOfEnd = p.millis();
      }
    }
  };

  // ======================================================= MOUSEPRESSED FUNCTION
  p.mousePressed = () => {
    if (p.props.newGame && !p.startGame) {
      p.startGame = true;
      startTimer();
    }
  };

  // ======================================================= START TIMER FUNCTION
  function startTimer() {
    p.timeOut1 = setTimeout(() => {
      p.ready = true;
      p.timeOfStart = p.millis();
      p.timeOut2 = setTimeout(() => {
        // p.ready = false;
        if (!p.timeOfEnd) { p.timeOfEnd = p.millis(); }
        const time = (p.timeOfEnd - p.timeOfStart)/1000;
        const success = time < p.props.gameTime;
        p.props.generateResult(time.toFixed(3), success, p.targetString, p.currentInput);
      }, p.props.gameTime*1000);
    }, p.props.startTime*1000);
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
    p.text('CLICK TO START GAME', p.width/2, p.height/2-20);
    p.text('(ESC TO EXIT)', p.width/2, p.height/2+20);
    p.pop();
  }

  // ======================================================= DRAW LOADING LINE FUNCTION
  function drawLoadingLine() {
    if (p.loadingWidth <= p.width) { p.loadingWidth += p.width/(p.frameRate()*(p.props.gameTime)); }
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
