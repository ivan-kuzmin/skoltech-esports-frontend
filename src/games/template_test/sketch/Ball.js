export default function Ball(p, xpos, ypos, radius) {
  this.x = xpos;
  this.y = ypos;
  this.radius = radius;

  this.moveCallback = (x, y) => {
    // your moveCallback
    // x, y – read about PointerLock returns (move values you locked mouse)
    this.x += x;
    this.y += y;
  };

  this.display = () => {
    p.push();
    p.fill('red');
    p.ellipse(this.x, this.y, this.radius);
    p.pop();
  };
}
