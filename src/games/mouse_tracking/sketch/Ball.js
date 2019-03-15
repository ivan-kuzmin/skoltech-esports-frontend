export default function Ball(p, x, y, radius, color, timeOnChangeSpeed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.fill = color;
  this.stroke = 3;
  const generateSpeed = () => {
    this.speed = p.random(1, 7);
    this.xspeed = p.random(0, 1);
    this.yspeed = 1 - this.xspeed;
    this.xdirection = p.random(0, 1) > 0.5 ? -1 : 1;
    this.ydirection = p.random(0, 1) > 0.5 ? -1 : 1;
  };
  generateSpeed();

  this.move = () => {
    if (p.frameCount%(60*timeOnChangeSpeed) === 0) { generateSpeed(); }
    this.x += this.xspeed * this.xdirection * this.speed;
    this.y += this.yspeed * this.ydirection * this.speed;
    if (this.x >= p.width-this.radius || this.x <= this.radius) { this.xdirection *= -1; }
    if (this.y >= p.height-this.radius || this.y <= this.radius) { this.ydirection *= -1; }
  };

  this.display = () => {
    p.push();
    p.ellipseMode(p.RADIUS);
    p.fill(this.fill);
    p.strokeWeight(this.stroke);
    p.ellipse(this.x, this.y, this.radius);
    p.pop();
  };
}
