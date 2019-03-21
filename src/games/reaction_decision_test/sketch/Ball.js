export default function Ball(p, rad, col) {
  this.rad = rad;
  this.xpos = p.random(rad, p.width - rad);
  this.ypos = p.random(rad, p.height - rad);
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
