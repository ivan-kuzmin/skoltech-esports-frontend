// ======================================================== STRAIGHT LINES
export function Vertical(p, parent, topStart) {
  this.mask = () => {
    const w = p.side/4 + 5
    p.rect(parent.x, parent.y, w, p.side)
    p.rect(parent.maxX, parent.y, -w, p.side)
  }

  this.into = (x, y) => {
    this.minX = parent.startX - p.out
    this.minY = y // topStart ? (parent.startY - p.out) : (parent.endY - p.out)
    this.maxX = parent.endX + p.out
    this.maxY = y // topStart ? (parent.endY + p.out) : (parent.startY + p.out)
    // return ((x >= this.minX) && (x <= this.maxX))
    return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
  }

  this.nextCard = (x, y) => {
    if (topStart) {
      return (y >= parent.endY)
    } else {
      return (y <= parent.endY)
    }
  }

  this.prevCard = (x, y) => {
    if (topStart) {
      return (y <= parent.startY)
    } else {
      return (y >= parent.startY)
    }
  }

  this.display = () => {
    const { startX, startY, endX, endY } = parent
    const w = p.routeHalfWidth
    p.line(startX - w, startY, endX - w, endY) // LEFT WALL
    p.line(startX + w, startY, endX + w, endY) // RIGHT WALL
  }
}

export function Horizontal(p, parent) {
  this.mask = () => {
    const w = p.side/4 + 5
    p.rect(parent.x, parent.y, p.side, w)
    p.rect(parent.x, parent.maxY, p.side, -w)
  }

  this.into = (x, y) => {
    this.minX = x //parent.startX - p.out
    this.minY = parent.startY - p.out
    this.maxX = x //parent.endX + p.out
    this.maxY = parent.endY + p.out
    return ((y >= this.minY) && (y <= this.maxY) && (y >= this.minY) && (y <= this.maxY))
  }

  this.nextCard = (x, y) => (x >= parent.endX)
  this.prevCard = (x, y) => (x <= parent.startX)

  this.display = () => {
    const { startX, startY, endX, endY } = parent
    const w = p.routeHalfWidth
    p.line(startX, startY - w, endX, endY - w) // TOP WALL
    p.line(startX, startY + w, endX, endY + w) // BOTTOM WALL
  }
}
