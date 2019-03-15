export default function Ball(p, radius, color) {
  this.x = p.random(radius, p.width-radius);
  this.y = p.random(radius, p.height-radius);
  this.radius = radius;
  this.fill = color;
  this.stroke = 3;

  this.display = () => {
    p.push();
    p.ellipseMode(p.RADIUS);
    p.fill(this.fill);
    p.strokeWeight(this.stroke);
    p.ellipse(this.x, this.y, this.radius);
    p.pop();
  };
}
