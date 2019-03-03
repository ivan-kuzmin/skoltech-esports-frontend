export default function Ball(p, rad, xpos, ypos, col) {
  this.rad = rad;
  this.xpos = xpos;
  this.ypos = ypos;
  this.col = col;
  this.stroke = 3;

  this.display = function () {
    p.push();
    p.fill(this.col);
    p.strokeWeight(this.stroke);
    p.ellipse(this.xpos, this.ypos, this.rad, this.rad);
    p.pop();
  };
}
