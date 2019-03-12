export default function Ball(p, x, y) {
  this.x = x;
  this.y = y;
  this.radius = p.floor(p.random(p.minBall, p.maxBall));
  this.startRadius = this.radius;
  this.contour = p.floor(p.random(this.radius+p.minDeviation, this.radius+p.maxDeviation));
  this.speed = p.floor(p.random(p.minSpeed, p.maxSpeed));

  // ======================================================= MOVE FUNCTION
  this.move = () => {
    this.radius += this.speed;
  };

  // ======================================================= DISPLAY FUNCTION
  this.display = () => {
    p.push();
    p.ellipseMode(p.CENTER);
    p.fill('blue');
    p.noStroke();
    p.ellipse(this.x, this.y, this.radius);
    p.noFill();
    p.stroke('black');
    p.strokeWeight(3);
    p.ellipse(this.x, this.y, this.contour);
    p.pop();
  };
}
