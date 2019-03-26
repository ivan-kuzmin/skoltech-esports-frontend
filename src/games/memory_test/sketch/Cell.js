export default function Cell(p, x, y, i, j) {
  this.x = x;
  this.y = y;
  this.i = i;
  this.j = j;

  // ======================================================= CLICK FUNCTION
  this.click = () => {
    const half = p.props.cellSize/2;
    const minX = this.x - half;
    const maxX = this.x + half;
    const minY = this.y - half;
    const maxY = this.y + half;
    if (p.mouseX > minX && p.mouseX < maxX && p.mouseY > minY && p.mouseY < maxY) {
      this.clicked = !this.clicked;
      if (this.clicked) {
        p.clicked.push(this);
      } else {
        const index = p.clicked.indexOf(this);
        if (index > -1) {
          p.clicked.splice(index, 1);
        }
      }
    }
  };

  // ======================================================= DISPLAY FUNCTION
  this.display = () => {
    p.push();
    p.rectMode(p.CENTER);
    (this.isTarget && !p.ready) || this.clicked ? p.fill('blue') : p.noFill();
    p.strokeWeight(1);
    p.rect(this.x, this.y, p.props.cellSize, p.props.cellSize);
    p.pop();
  };
}
