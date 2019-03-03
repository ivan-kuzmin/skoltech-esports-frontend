export default function Ball(p) {
  this.route = 0
  this.cur = p.route[this.route]
  this.x = this.cur.centerX
  this.y = this.cur.centerY
  this.fill = "blue"
  this.i = 0

  // ======================================================= COLLISION AND FILTER RESULTS
  this.collide = (x, y) => {
    let roundX = x.toFixed(1)
    let roundY = y.toFixed(1)
    if (!p.results.map(e => e.x).includes(roundX) &&
        !p.results.map(e => e.y).includes(roundY)) {
      p.results.push({ x: roundX, y: roundY, i: this.i })
    }
    this.i++
    return "red"
  }

  // ======================================================= ON KEYBOARD MOVE FUNCTION
  this.move = () => {
    this.cur = p.route[this.route]
    let nextX = this.x
    if (p.keyIsDown(65)) {      // A
      nextX = this.x - p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      this.x = this.cur.card.into(nextX, this.y) ? nextX : this.cur.card.minX
      this.fill = (this.cur.card.into(nextX, this.y)) ? "blue" : this.collide(this.cur.card.minX, this.y)
    }
    if (p.keyIsDown(68)) {      // D
      nextX = this.x + p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      this.x = this.cur.card.into(nextX, this.y) ? nextX : this.cur.card.maxX
      this.fill = (this.cur.card.into(nextX, this.y)) ? "blue" : this.collide(this.cur.card.maxX, this.y)
    }
  }

  // ======================================================= ON MOUSE MOVE FUNCTION
  this.moveCallback = (x, y) => {
    let nextY = this.y
    if (y > 0) {
      nextY = this.y + y*p.props.sensitivity*p.cs_go_coefficient
      this.y = this.cur.card.into(this.x, nextY) ? nextY : this.cur.card.maxY
      this.fill = (this.cur.card.into(this.x, nextY)) ? "blue" : this.collide(this.x, this.cur.card.maxY)
    }
    if (y < 0) {
      nextY = this.y + y*p.props.sensitivity*p.cs_go_coefficient
      this.y = this.cur.card.into(this.x, nextY) ? nextY : this.cur.card.minY
      this.fill = (this.cur.card.into(this.x, nextY)) ? "blue" : this.collide(this.x, this.cur.card.minY)
    }
  }

  // ======================================================= DISPLAY FUNCTION
  this.display = () => {
    p.push()
    p.fill(this.fill)
    this.fill = "blue"
    p.stroke("black")
    p.strokeWeight(1)
    p.rectMode(p.RADIUS)
    p.rect(this.x, this.y, p.radius, p.radius)
    p.pop()
  }
}
