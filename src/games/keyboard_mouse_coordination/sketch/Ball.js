export default function Ball(p, x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.fill = color;
  this.stroke = 3;
  this.xspeed = p.random(0, 1);
  this.yspeed = 1 - this.xspeed;
  this.xdirection = p.random(0, 1) > 0.5 ? -1 : 1;
  this.ydirection = p.random(0, 1) > 0.5 ? -1 : 1;

  this.move = () => {
    this.x += this.xspeed * this.xdirection * p.props.speed;
    this.y += this.yspeed * this.ydirection * p.props.speed;
    if (this.x > this.maxX || this.x < this.minX) { this.xdirection *= -1; }
    if (this.y > p.maxY || this.y < p.minY) { this.ydirection *= -1; }
  };

  this.display = () => {
    p.push();
    p.fill(this.fill);
    p.strokeWeight(this.stroke);
    p.ellipse(this.x, this.y, this.radius);
    p.pop();
  };
}
