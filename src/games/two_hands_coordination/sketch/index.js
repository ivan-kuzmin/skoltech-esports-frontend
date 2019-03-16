import pointerLock from 'src/assets/js/pointerLock';
import Cell from './Cell';
import Ball from './Ball';

export default function sketch(p) {
  p.props = {};
  p.fps = 0;
  p.side = 150;
  p.searchRoute = true;
  p.minRouteLength = 1; // change!!!
  p.linePositions = [p.side, p.side/2, 0];
  p.variance = ['turn', 'straight', 'arc'];
  p.keyboardStep = 2;
  p.shiftAcc = 3;
  p.routeHalfWidth = 35;
  p.radius = p.routeHalfWidth*0.5;
  p.out = p.routeHalfWidth - p.radius - 3;
  p.cs_go_coefficient = 0.2745;
  p.results = [];

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.cols = p.floor(p.wrapper.offsetWidth/p.side);
    p.rows = p.floor(p.wrapper.offsetHeight/p.side);
    p.createCanvas(p.cols*p.side, p.rows*p.side);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.minRouteLength = p.rows + p.cols;
    createGrid();
  };

  // ======================================================= CREATE GRID FUNCTION
  function createGrid() {
    p.grid = [];
    p.route = [];
    for (let j=0; j<p.rows; j++) { for (let i=0; i<p.cols; i++) { p.grid.push(new Cell(p, i, j)); } }
    p.startCell = p.grid[p.index(0, p.rows-1)];
    p.current = p.startCell;
  }

  // ======================================================= CREATE ROUTE FUNCTION
  function createRoute() {
    p.current.visited = true;
    p.route.push(p.current);
    const next = p.current.checkNeighbors();
    if (next) {
      p.current.next = { i: next.i, j: next.j };
      next.prev = { i: p.current.i, j: p.current.j };
      next.visited = true;
      next.startCell(p.current);
      p.current.endCell(next);
      p.current = next;
    } else if (p.route.length <= p.minRouteLength) {
      createGrid();
    } else {
      for (let i=0; i<p.route.length; i++) { p.route[i].detectCadr(i); }
      p.searchRoute = false;
      p.ball = new Ball(p);
      console.log(p.ball);
      pointerLock(p, p.ball.moveCallback, false);
    }
  }

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    p.background(230);
    p.cursor(p.ARROW);

    for (let i=0; i<p.grid.length; i++) { p.grid[i].display(); }

    if (p.props.newGame) {
      if (p.searchRoute) {
        p.drawFilter();
        createRoute();
      } else {
        p.ball.display();
        if (p.pointerLockIsLocked()) {
          p.ball.move();
          if (p.ball.cur.card.prevCard(p.ball.x, p.ball.y) && (p.ball.route !== 0)) { p.ball.route--; }
          if (p.ball.cur.card.nextCard(p.ball.x, p.ball.y)) {
            if (p.ball.route !== p.route.length-1) {
              p.ball.route++;
            } else {
              console.log('YOU WIN');
              console.log(p.results);
              p.results = [];
              p.onSetAppState({ newGame: false });
              document.exitPointerLock();
              p.searchRoute = true;
              createGrid();
            }
          }
        }
        p.drawMask();
        if (!p.pointerLockIsLocked()) { p.drawFilter(true); }
      }
    }

    p.fill('gray');
    if (p.frameCount%20 === 0) { p.fps = p.frameRate(); }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 30);
    p.text(`Route length: ${p.route.length}`, 30, 50);
    // if (p.ball) p.text(`Current route: ${p.ball.route}`, 30, 70)
  };

  // ======================================================= FIND CELL BY INDEXES (i, j)
  p.index = function (i, j) { return (i<0 || j<0 || i>p.cols-1 || j>p.rows-1) ? -1 : (i+j*p.cols); };

  //  ======================================================= ON WINDOW RESIZE FUNCTION
  p.windowResized = function () {
    // p.remove()
    p.resizeCanvas(p.cols*p.side, p.rows*p.side);
    // new game
  };

  // ======================================================= DRAW POINTERLOCK FILTER
  p.drawFilter = function () {
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
  };

  // ======================================================= DRAW MASK FOR EVERY CELL
  p.drawMask = function () {
    p.push();
    p.fill('black');
    for (const cell of p.grid) {
      if (cell.card && cell.card.mask) {
        cell.card.mask();
      } else {
        p.rect(cell.x, cell.y, p.side, p.side);
      }
    }
    p.pop();
  };
}
