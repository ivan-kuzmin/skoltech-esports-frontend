// import Ball from './Ball'

export default function sketch(p) {
  p.props = {};
  p.fps = 0;

  // ======================================================= SETUP FUNCTION
  p.setup = function () {
    p.createCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight);
    p.frameRate(60);
    p.ellipseMode(p.RADIUS);
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textSize(15);

    p.ball = new Ball(p);
  };

  // ======================================================= DRAW FUNCTION
  p.draw = function () {
    p.background(230);
    p.cursor(p.ARROW);

    p.ball.move();
    p.ball.display();

    if (p.frameCount%20 === 0) { p.fps = p.frameRate(); }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 30);
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
    p.text('CLICK TO START GAME', p.width / 2, p.height / 2 - 20);
    p.text('(ESC TO EXIT)', p.width / 2, p.height / 2 + 20);
    p.pop();
  }

  // ======================================================= ON WINDOW RESIZE FUNCTION
  p.windowResized = function () { p.resizeCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight); };
}


function Ball(p) {
  this.location = p.createVector(150, 150);
  this.velocity = p.createVector(5, 5);
  this.step = 5;

  this.move = () => {
    if (p.keyIsDown(87)) { // W
      this.location.sub(this.velocity.y);
    }
    if (p.keyIsDown(83)) { // S
      this.location.add(this.velocity.y);
    }
    if (p.keyIsDown(65)) { // A
      this.location.sub(this.velocity.x);
    }
    if (p.keyIsDown(68)) { // D
      this.location.add(this.velocity.x);
    }
  };

  this.display = () => {
    p.push();
    p.fill('red');
    p.ellipse(this.location.x, this.location.y, 20);
    p.pop();
  };
}
