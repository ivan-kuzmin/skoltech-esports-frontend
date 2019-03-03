import pointerLock from './pointerLock'
import Cell from './Cell'

export default function sketch(p) {
  p.props = {}
  p.fps = 0
  p.side = 300
  p.searchRoute = true
  p.minRouteLength = 1         // change!!!
  p.linePositions = [p.side, p.side/2, 0]
  p.variance = ["turn", "straight", "arc"]
  p.keyboardStep = 2
  p.shiftAcc = 3
  p.routeLineWidth = 100
  p.radius = p.routeLineWidth*0.6/2
  p.out = p.routeLineWidth/2-p.radius

  p.setup = function() {
    pointerLock(p)
    p.cols = p.floor(p.wrapper.offsetWidth/p.side)
    p.rows = p.floor(p.wrapper.offsetHeight/p.side)
    p.createCanvas(p.cols*p.side, p.rows*p.side)
    p.frameRate(60)
    p.ellipseMode(p.RADIUS)
    p.textFont('Courier New')
    p.textStyle(p.BOLD)
    p.textSize(15)

    createGrid()
  }

  function createGrid() {
    p.grid = []
    p.route = []
    for (let j=0; j<p.rows; j++) {
      for (let i=0; i<p.cols; i++) {
        let cell = new Cell(p, i, j)
        p.grid.push(cell)
      }
    }
    p.current = p.grid[p.index(0, p.rows-1)]
  }

  p.draw = function() {
    p.background(230)
    p.cursor(p.ARROW)

    for (let i=0; i<p.grid.length; i++) { p.grid[i].display() }
    if (p.searchRoute) {
      p.current.visited = true
      p.route.push(p.current)
      let next = p.current.checkNeighbors()
      if (next) {
        next.visited = true
        next.detectStartLine(p.current)
        p.current.detectEndLine(next)
        p.current.detectLineType()
        p.current = next
      } else if (p.route.length <= p.minRouteLength) {
        createGrid()
      } else {
        p.searchRoute = false
        p.ball = new Ball(p)
        p.ball2 = new Ball2(p)
      }
    }

    if (p.props.newGame) {
      if (p.pointerLockActive) {
        // p.ball.move()
        p.ball.move1()
        p.ball.display()
        p.ball2.display()
      }
    }

    if (p.frameCount%20 === 0) { p.fps = p.frameRate() }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 30)
    p.text(`route: ${p.route.length}`, 30, 50)
  }

  p.index = function(i, j) { return (i<0 || j<0 || i>p.cols-1 || j>p.rows-1) ? -1 : (i+j*p.cols) }

  p.moveCallback = function(x, y) {
    // p.ball.nextY = p.ball.y + y
    // p.ball.detectDists(p.ball.x, p.ball.nextY) ? p.ball.fill = "red" : p.ball.fill = p.color(100,200,100)
    p.ball.x += x
    // p.ball2.x += x
    if (p.dist(p.ball.x, p.ball.y + y, p.ball2.x, p.ball2.y) <= p.out) {
        p.ball.y += y
    } else {
      p.ball.y = p.ball.cur.centerY + p.out * (y>0 ? 1 : -1)
    }
  }

  p.windowResized = function() {
    // p.remove()
    p.resizeCanvas(p.cols*p.side, p.rows*p.side)
    // new game
  }
}


function Ball2(p) {
  this.route = 0
  this.cur = p.route[this.route]
  this.x = this.cur.centerX
  this.y = this.cur.centerY

  this.display = () => {
    p.push()
    p.fill("white")
    p.noStroke()
    // p.ellipse(this.x, this.y, p.radius, p.radius)
    // -------------- test
    if (typeof this.cur !== "undefined") {
      let cur = this.cur
      p.ellipse(this.x, cur.y + p.side/2, 2, 2)
    }
    p.pop()
  }
}


function Ball(p) {
  this.route = 0
  this.cur = p.route[this.route]
  this.x = this.cur.centerX
  this.y = this.cur.centerY
  // this.lenH = 0
  this.d1 = 0
  this.d2 = 0
  this.maxD = p.side/2+p.out
  this.fill = "red"

  this.detectDists = (x, y) => {
    this.cur = p.route[this.route]
    let center = {x: this.cur.x+p.side/2, y: this.cur.y+p.side/2}
    let currentStartLine = this.cur.startLine ? this.cur.startLine : center
    let currentEndLine = this.cur.endLine ? this.cur.endLine : center
    this.d1 = p.dist(x, y, currentStartLine.x, currentStartLine.y)
    this.d2 = p.dist(x, y, currentEndLine.x, currentEndLine.y)

    const sideH = (this.cur.startLine && this.cur.endLine) ? p.side : p.side/2
    const sumD = this.d1 + this.d2
    const per = 0.5*(sumD+sideH)
    const lenH = 2*p.sqrt(per*(per-sideH)*(per-this.d1)*(per-this.d2))/sideH
    return !(lenH >= p.out || (sumD >= sideH+2*p.out))
  }

  this.move = () => {
    if (p.keyIsDown(65)) {      // A
      // this.nextX = this.x - p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      // this.detectDists(this.nextX, this.y) ? this.fill = "red" : this.fill = p.color(100,200,100)
      if (this.cur.centerX - this.x < p.out) {
        this.x -= p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      }
    }
    if (p.keyIsDown(68)) {      // D
      // this.nextX = this.x + p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      // this.detectDists(this.nextX, this.y) ? this.fill = "red" : this.fill = p.color(100,200,100)
    }

  }

  this.move1 = () => {
    if (p.keyIsDown(65)) {      // A
      let step = p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      p.ball2.x -= step
      if (p.dist(this.x - step, this.y, p.ball2.x, p.ball2.y) <= p.out) {
          this.x -= step
      } else {
        this.x = this.cur.centerX - p.out
      }
    }
    if (p.keyIsDown(68)) {      // D
      let step = p.keyboardStep*(p.keyIsDown(16) ? p.shiftAcc : 1)
      p.ball2.x += step
      if (p.dist(this.x + step, this.y, p.ball2.x, p.ball2.y) <= p.out) {
          this.x += step
      } else {
        this.x = this.cur.centerX + p.out
      }
    }
    if (this.x >= this.cur.endLine.x) {
      this.route++
      this.cur = p.route[this.route]
      console.log(this.cur)
    }
  }

  this.display = () => {
    p.push()
    p.fill(this.fill)
    p.noStroke()
    p.ellipse(this.x, this.y, p.radius, p.radius)
    // -------------- test
    if (typeof this.cur !== "undefined") {
      let cur = this.cur
      p.fill("white")
      p.noFill()
      p.stroke("white")
      p.strokeWeight(2)
      p.ellipse(cur.x + p.side/2, cur.y + p.side/2, p.routeLineWidth/2, p.routeLineWidth/2)
      p.ellipse(cur.endLine.x, cur.endLine.y, p.routeLineWidth/2, p.routeLineWidth/2)
      p.line(cur.x + p.side/2, cur.y + p.side/2, this.x, this.y)
      p.line(cur.x + p.side/2, cur.y + p.side/2, this.x, this.y)
      p.line(cur.endLine.x, cur.endLine.y, this.x, this.y)
      p.line(cur.endLine.x, cur.endLine.y, this.x, this.y)
    }
    p.pop()
  }
}
