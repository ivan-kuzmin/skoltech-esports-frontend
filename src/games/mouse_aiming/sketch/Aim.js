export default function Aim(p, x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
  this.length = 11;

  this.display = () => {
    const { radius, length } = this;
    p.push();
    p.stroke('black');
    p.strokeCap(p.SQUARE);
    p.strokeWeight(3);
    p.line(this.x+radius, this.y, this.x+radius+length, this.y);
    p.line(this.x-radius-1, this.y, this.x-radius-1-length, this.y);
    p.line(this.x, this.y+radius, this.x, this.y+radius+length);
    p.line(this.x, this.y-radius-1, this.x, this.y-radius-1-length);
    p.pop();
  };
}
