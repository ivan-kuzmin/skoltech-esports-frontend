export default function Cell(p, i, j) {
  this.i = i
  this.j = j
  this.x = this.i*p.side
  this.y = this.j*p.side
  this.centerX = this.x+p.side/2
  this.centerY = this.y+p.side/2

  this.checkNeighbors = () => {
    let neighbors = []

    let top    = p.grid[p.index(i, j-1)]
    let right  = p.grid[p.index(i+1, j)]
    let bottom = p.grid[p.index(i, j+1)]
    // let left   = p.grid[index(i-1, j)]

    for (let neighbor of [top, right, bottom]) {
      if (neighbor && !neighbor.visited) { neighbors.push(neighbor) }
    }
    if (neighbors.length > 0) {
      let r = p.floor(p.random(0, neighbors.length))
      return neighbors[r]
    }
  }

  this.detectStartLine = (previous) => {
    if (previous) {
      let x = this.x + p.linePositions[this.i - previous.i + 1]
      let y = this.y + p.linePositions[this.j - previous.j + 1]
      this.startLine = {x, y}
    }
  }

  this.detectEndLine = (next) => {
    if (next) {
      let x = this.x + p.linePositions[this.i - next.i + 1]
      let y = this.y + p.linePositions[this.j - next.j + 1]
      this.endLine = {x, y}
    }
  }

  this.detectLineType = () => {
    const { x, y, centerX, centerY, startLine, endLine } = this

    if (startLine && endLine) {
      // ================================================================= IF TURN
      if ((startLine.x !== endLine.x) && (startLine.y !== endLine.y)) {
        this.lineType = p.variance[p.floor(p.random(0, p.variance.length))]
      }

      // ================================================================= ONLY FOR ARC TYPE
      if (startLine.x===x && startLine.y===centerY) { // left startLine
        if (endLine.y===y) {                         // top endLine
          this.arcCenter = { x, y }
          this.arcRotate = { start: 0, stop: p.HALF_PI }
        } else {                                     // bottom endLine
          this.arcCenter = { x, y: y+p.side }
          this.arcRotate = { start: p.PI+p.HALF_PI, stop: 0 }
        }
      }
      if (startLine.x===centerX && startLine.y===y) { // top startLine
        if (endLine.x===x) {                         // left endLine
          this.arcCenter = { x, y }
          this.arcRotate = { start: 0, stop: p.HALF_PI }
        } else {                                     // right endLine
          this.arcCenter = { x: x+p.side, y }
          this.arcRotate = { start: p.HALF_PI, stop: p.PI }
        }
      }
      if (startLine.x===x+p.side && startLine.y===centerY) { // right startLine
        if (endLine.y===y) {                                // top endLine
          this.arcCenter = { x: x+p.side, y }
          this.arcRotate = { start: p.HALF_PI, stop: p.PI }
        } else {                                            // bottom endLine
          this.arcCenter = { x: x+p.side, y: y+p.side }
          this.arcRotate = { start: p.PI, stop: p.PI+p.HALF_PI }
        }
      }
      if (startLine.x===centerX && startLine.y===y+p.side) { // bottom startLine
        if (endLine.x===x) {                                // left endLine
          this.arcCenter = { x, y: y+p.side }
          this.arcRotate = { start: p.PI+p.HALF_PI, stop: 0 }
        } else {                                            // right endLine
          this.arcCenter = { x: x+p.side, y: y+p.side }
          this.arcRotate = { start: p.PI, stop: p.PI+p.HALF_PI }
        }
      }
    }
  }

  this.drawLines = () => {
    const { centerX, centerY, startLine, endLine, arcCenter, arcRotate } = this
    p.strokeWeight(p.routeLineWidth)
    p.noFill()
    // p.strokeCap(p.PROJECT)
    switch (this.lineType) {
      case "straight":
        p.line(startLine.x, startLine.y, endLine.x, endLine.y)
        break;
      case "arc":
        p.arc(arcCenter.x, arcCenter.y, p.side/2, p.side/2, arcRotate.start, arcRotate.stop)
        break;
      default: // "turn"
        // this.lineType = "turn"
        if (startLine) { p.line(startLine.x, startLine.y, centerX, centerY) }
        if (endLine) { p.line(centerX, centerY, endLine.x, endLine.y) }
        break;
    }
  }

  this.display = () => {
    p.push()
    p.stroke(0)
    p.strokeWeight(1)
    p.noFill()
    // this.visited ? p.fill("blue") : p.noFill()
    p.rect(this.x, this.y, p.side, p.side)
    this.drawLines()
    p.pop()
  }
}
