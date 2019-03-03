// ======================================================== TURNS
export function BottomRight(p, parent) {
  this.mask = () => {
    const w = p.side/4 + 5
    p.rect(parent.x, parent.y, p.side, w)
    p.rect(parent.x, parent.y + w, w, p.side - w)
    p.rect(parent.maxX - w, parent.maxY - w, w, w)
  }

  this.into = (x, y) => {
    this.minX = parent.startX - p.out
    this.minY = parent.endY - p.out
    this.maxX = (y > parent.centerY + p.out) ? (parent.startX + p.out) : x // (parent.endX + p.out)
    this.maxY = (x > parent.centerX + p.out) ? (parent.endY + p.out) : y // (parent.startY + p.out)
    return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
  }

  this.nextCard = (x, y) => (x >= parent.endX)
  this.prevCard = (x, y) => (y >= parent.startY)

  this.display = () => {
    const { startX, startY, endX, endY, centerX, centerY } = parent
    const w = p.routeHalfWidth
    p.line(startX - w, startY, centerX - w, centerY - w) // LEFT OUTSIDE WALL
    p.line(startX + w, startY, centerX + w, centerY + w) // RIGHT INSIDE WALL
    p.line(centerX - w, centerY - w, endX, endY - w)     // TOP OUTSIDE WALL
    p.line(centerX + w, centerY + w, endX, endY + w)     // BOTTOM INSIDE WALL
  }
}

export function LeftBottom(p, parent) {
  this.mask = () => {
    const w = p.side/4 + 5
    p.rect(parent.x, parent.y, p.side, w)
    p.rect(parent.maxX, parent.y + w, -w, p.side - w)
    p.rect(parent.x, parent.maxY, w, -w)
  }

  this.into = (x, y) => {
    this.minY = parent.startY - p.out
    this.maxX = parent.endX + p.out
    this.maxY = (x < parent.centerX - p.out) ? (parent.startY + p.out) : y // (parent.endY + p.out)
    this.minX = (y > parent.centerY + p.out) ? (parent.endX - p.out) : x // (parent.startX - p.out)
    return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
  }

  this.nextCard = (x, y) => (y >= parent.endY)
  this.prevCard = (x, y) => (x <= parent.startX)

  this.display = () => {
    const { startX, startY, endX, endY, centerX, centerY } = parent
    const w = p.routeHalfWidth
    p.line(startX, startY - w, centerX + w, centerY - w) // TOP OUTSIDE WALL
    p.line(centerX + w, centerY - w, endX + w, endY)     // RIGHT OUTSIDE WALL
    p.line(startX, startY + w, centerX - w, centerY + w) // BOTTOM INSIDE WALL
    p.line(centerX - w, centerY + w, endX - w, endY)     // LEFT INSIDE WALL
  }
}

export function TopRight(p, parent) {
  this.mask = () => {
    const w = p.side/4 + 5
    p.rect(parent.x, parent.y, w, p.side)
    p.rect(parent.maxX, parent.maxY - w, -p.side + w, w)
    p.rect(parent.maxX, parent.y, -w, w)
  }

  this.into = (x, y) => {
    this.minX = parent.startX - p.out
    this.maxY = parent.endY + p.out
    this.maxX = (y < parent.centerY - p.out) ? (parent.startX + p.out) : x // (parent.endX + p.out)
    this.minY = (x > parent.centerX + p.out) ? (parent.endY - p.out) : y // (parent.startY - p.out)
    return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
  }

  this.nextCard = (x, y) => (x >= parent.endX)
  this.prevCard = (x, y) => (y <= parent.startY)

  this.display = () => {
    const { startX, startY, endX, endY, centerX, centerY } = parent
    const w = p.routeHalfWidth
    p.line(startX - w, startY, centerX - w, centerY + w) // LEFT OUTSIDE WALL
    p.line(startX + w, startY, centerX + w, centerY - w) // RIGHT INSIDE WALL
    p.line(centerX + w, centerY - w, endX, endY - w)     // TOP INSIDE WALL
    p.line(centerX - w, centerY + w, endX, endY + w)     // BOTTOM OUTSIDE WALL
  }
}

export function LeftTop(p, parent) {
  this.mask = () => {
    const w = p.side/4 + 5
    p.rect(parent.x, parent.maxY, p.side, -w)
    p.rect(parent.maxX, parent.y, -w, p.side - w)
    p.rect(parent.x, parent.y, w, w)
  }

  this.into = (x, y) => {
    this.maxX = parent.endX + p.out
    this.maxY = parent.startY + p.out
    this.minY = (x < parent.centerX - p.out) ? (parent.startY - p.out) : y // (parent.endY - p.out)
    this.minX = (y < parent.centerY - p.out) ? (parent.endX - p.out) : x // (parent.startX - p.out)
    return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
  }

  this.nextCard = (x, y) => (y <= parent.endY)
  this.prevCard = (x, y) => (x <= parent.startX)

  this.display = () => {
    const { startX, startY, endX, endY, centerX, centerY } = parent
    const w = p.routeHalfWidth
    p.line(centerX + w, centerY + w, endX + w, endY)     // RIGHT OUTSIDE WALL
    p.line(startX, startY + w, centerX + w, centerY + w) // BOTTOM OUTSIDE WALL
    p.line(startX, startY - w, centerX - w, centerY - w) // TOP INSIDE WALL
    p.line(centerX - w, centerY - w, endX - w, endY)     // LEFT INSIDE WALL
  }
}
