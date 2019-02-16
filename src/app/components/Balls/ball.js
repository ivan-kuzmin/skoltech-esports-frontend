export default function Ball(p, i, speed, numBalls, levelRedBalls, selectedBalls) {
  this.id = i
  this.rad = 60
  this.strokeWeight = 1
  this.xpos = p.random(this.rad + this.strokeWeight, p.width - this.rad - this.strokeWeight)
  this.ypos = p.random(this.rad + this.strokeWeight, p.height - this.rad - this.strokeWeight)
  this.xspeed = p.random(0, 1)
  this.yspeed = 1 - this.xspeed
  this.xdirection = p.random(0, 1) > 0.5 ? -1 : 1
  this.ydirection = p.random(0, 1) > 0.5 ? -1 : 1
  this.startedCol = this.id >= numBalls - levelRedBalls ? p.color(255,0,0) : p.color(0,0,255)
  this.selected = false
  this.selectedCol = p.color(0,255,0)
  this.col = this.startedCol

  this.display = function() {
    p.fill(this.col)
    p.stroke('black')
    p.strokeWeight(this.strokeWeight)
    p.ellipse(this.xpos, this.ypos, this.rad, this.rad);
  }

  this.move = function() {
    // this.col = p.color('blue')
    this.xpos += this.xspeed * this.xdirection * speed
    this.ypos += this.yspeed * this.ydirection * speed
    if (this.xpos > p.width - this.rad || this.xpos < this.rad) {
      this.xdirection *= -1;
    }
    if (this.ypos > p.height - this.rad || this.ypos < this.rad) {
      this.ydirection *= -1;
    }
  }

  this.hover = function() {
    this.d = p.dist(p.mouseX, p.mouseY, this.xpos, this.ypos);
    if (this.d < this.rad) {
      p.cursor(p.HAND)
    }
  }

  this.clicked = function() {
    if (this.d < this.rad) {
      this.selected = !this.selected
    }
    this.col = this.selected ? this.selectedCol : this.startedCol
    let timerId = setInterval(() => {
      this.rad += this.selected ? 0.2 : -0.2
    })
    setTimeout(() => {
      clearInterval(timerId)
    }, 100)
    if (this.selected) {
      selectedBalls.push(this.id)
    } else {
      let index = selectedBalls.indexOf(this.id)
      if (index > -1) {
        selectedBalls.splice(index, 1);
      }
    }
  }
}
