export default function Letter(p, x, y, symbol) {
  this.x = x;
  this.y = y;
  this.symbol = symbol;

  // ======================================================= DISPLAY FUNCTION
  this.display = () => {
    p.push();
    p.textAlign(p.CENTER);
    p.textSize(p.props.letterSize);
    p.text(this.symbol, this.x, this.y);
    p.pop();
  };
}
