import { Vertical, Horizontal } from './RouteCards/StraightLines'
import { BottomRight, LeftBottom, TopRight, LeftTop } from './RouteCards/Turns'
// import { BottomRightArc } from './RouteCards/Arcs'

export default function Cell(p, i, j) {
  this.i = i
  this.j = j
  this.x = this.i*p.side
  this.y = this.j*p.side
  this.maxX = this.x + p.side
  this.maxY = this.y + p.side
  this.centerX = this.x + p.side/2
  this.centerY = this.y + p.side/2
  this.startX = this.centerX
  this.startY = this.centerY
  this.endX = this.centerX
  this.endY = this.centerY

  // ====================================================== CHECK NEIGHBORS FUNCTION
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

  // ====================================================== DETECT START AND END OF CELL
  this.startCell = (previous) => {
    if (previous) {
      this.startX = this.x + p.linePositions[this.i - previous.i + 1]
      this.startY = this.y + p.linePositions[this.j - previous.j + 1]
    }
  }
  this.endCell = (next) => {
    if (next) {
      this.endX = this.x + p.linePositions[this.i - next.i + 1]
      this.endY = this.y + p.linePositions[this.j - next.j + 1]
    }
  }

  // ====================================================== DETECT CARD TYPE
  this.detectCadr = (i) => {
    const { x, y, maxX, maxY, startX, startY, endX, endY, centerX, centerY } = this
    this.num = i

    if (startX === endX) {
      this.card = new Vertical(p, this, startY < endY)
    }
    if (startY === endY) {
      this.card = new Horizontal(p, this)
    }
    if (startX === centerX && startY === maxY && endX === maxX && endY === centerY) {
      this.card = new BottomRight(p, this)
    }
    if (startX === x && startY === centerY && endX === centerX && endY === maxY) {
      this.card = new LeftBottom(p, this)
    }
    if (startX === centerX && startY === y && endX === maxX && endY === centerY) {
      this.card = new TopRight(p, this)
    }
    if (startX === x && startY === centerY && endX === centerX && endY === y) {
      this.card = new LeftTop(p, this)
    }
  }

  // ====================================================== DISPLAY CELL
  this.display = () => {
    p.push()
    p.stroke(0)
    p.strokeWeight(1)
    p.noFill()
    // this.visited ? p.fill("blue") : p.noFill()
    // p.rect(this.x, this.y, p.side, p.side)
    p.strokeWeight(5)
    if (this.card) { this.card.display() }
    // p.stroke(200, 200, 200, 150)
    // p.strokeWeight(1)
    // p.line(this.centerX, this.y, this.centerX, this.maxY)
    // p.line(this.x, this.centerY, this.maxX, this.centerY)
    p.pop()
    // p.push()
    // p.text(this.num, this.x + 10, this.y + 20)
    // p.pop()
  }
}
