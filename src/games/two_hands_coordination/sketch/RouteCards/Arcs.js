// ======================================================== ARCS
export function BottomRightArc(p, parent) {
  this.arcX = parent.maxX
  this.arcY = parent.maxY
  this.maxR = p.side/2 + 2*p.sqrt(p.out)
  this.minR = p.side/2 - 2*p.sqrt(p.out)

  // this.into = (x, y) => {
  //   // СДЕЛАЙ ЧЕРЕЗ DIST
  //   this.minX = p.sqrt(p.sq(this.maxR) - p.sq(y)) // parent.endX + p.out
  //   this.minY = p.sqrt(p.sq(this.maxR) - p.sq(x)) // parent.startY + p.out
  //   this.maxX = p.sqrt(p.sq(this.minR) - p.sq(y)) // parent.startX + p.out
  //   this.maxY = p.sqrt(p.sq(this.minR) - p.sq(x))
  //   if (parent.num === 3) {
  //     console.log(`minX: ${this.minX}, minY: ${this.minY}, maxX: ${this.maxX}, maxY: ${this.maxY}`)
  //   }
  //   return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
  // }
  // R^2 = (x - arcX)^2 + (y - arcY)^2
  // (x - arcX)^2 = R^2 - (y - arcY)^2
  // x - arcX = (R^2 - (y - arcY)^2)^0.5
  // x = (R^2 - (y - arcY)^2)^0.5 + arcX

  this.into = (x, y) => {
    let d = p.dist(this.arcX, this.arcY, x, y)
    this.maxX = p.sqrt(p.sq(this.minR) - p.sq(y - this.arcY)) + this.arcX
    this.maxY = p.sqrt(p.sq(this.minR) - p.sq(x - this.arcX)) + this.arcY
    this.minX = p.sqrt(p.sq(this.maxR) - p.sq(y - this.arcY)) + this.arcX
    this.minY = p.sqrt(p.sq(this.maxR) - p.sq(x - this.arcX)) + this.arcY
    if (parent.num === 3) console.log(`minX: ${this.minX}, minY: ${this.minY}, maxX: ${this.maxX}, maxY: ${this.maxY}`)
    return ((d >= this.minR) && (d <= this.maxR))
  }

  this.nextCard = (x, y) => (x >= parent.endX)
  this.prevCard = (x, y) => (y >= parent.startY)

  this.display = () => {
    const w = p.routeHalfWidth
    p.arc(this.arcX, this.arcY, p.side/2 + w, p.side/2 + w, p.PI, p.PI+p.HALF_PI)
    p.arc(this.arcX, this.arcY, p.side/2 - w, p.side/2 - w, p.PI, p.PI+p.HALF_PI)
  }
}

// export function LeftBottom(p, parent) {
//   this.into = (x, y) => {
//     this.minY = parent.startY - p.out
//     this.maxX = parent.endX + p.out
//     this.maxY = (x < parent.centerX - p.out) ? (parent.startY + p.out) : (parent.endY + p.out)
//     this.minX = (y > parent.centerY + p.out) ? (parent.endX - p.out) : (parent.startX - p.out)
//     return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
//   }
//
//   this.nextCard = (x, y) => (y >= parent.endY)
//   this.prevCard = (x, y) => (x <= parent.startX)
//
//   this.display = () => {
//     const { startX, startY, endX, endY, centerX, centerY } = parent
//     const w = p.routeHalfWidth
//     p.line(startX, startY - w, centerX + w, centerY - w) // TOP OUTSIDE WALL
//     p.line(centerX + w, centerY - w, endX + w, endY)     // RIGHT OUTSIDE WALL
//     p.line(startX, startY + w, centerX - w, centerY + w) // BOTTOM INSIDE WALL
//     p.line(centerX - w, centerY + w, endX - w, endY)     // LEFT INSIDE WALL
//   }
// }
//
// export function TopRight(p, parent) {
//   this.into = (x, y) => {
//     this.minX = parent.startX - p.out
//     this.maxY = parent.endY + p.out
//     this.maxX = (y < parent.centerY - p.out) ? (parent.startX + p.out) : (parent.endX + p.out)
//     this.minY = (x > parent.centerX + p.out) ? (parent.endY - p.out) : (parent.startY - p.out)
//     return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
//   }
//
//   this.nextCard = (x, y) => (x >= parent.endX)
//   this.prevCard = (x, y) => (y <= parent.startY)
//
//   this.display = () => {
//     const { startX, startY, endX, endY, centerX, centerY } = parent
//     const w = p.routeHalfWidth
//     p.line(startX - w, startY, centerX - w, centerY + w) // LEFT OUTSIDE WALL
//     p.line(startX + w, startY, centerX + w, centerY - w) // RIGHT INSIDE WALL
//     p.line(centerX + w, centerY - w, endX, endY - w)     // TOP INSIDE WALL
//     p.line(centerX - w, centerY + w, endX, endY + w)     // BOTTOM OUTSIDE WALL
//   }
// }
//
// export function LeftTop(p, parent) {
//   this.into = (x, y) => {
//     this.maxX = parent.endX + p.out
//     this.maxY = parent.startY + p.out
//     this.minY = (x < parent.centerX - p.out) ? (parent.startY - p.out) : (parent.endY - p.out)
//     this.minX = (y < parent.centerY - p.out) ? (parent.endX - p.out) : (parent.startX - p.out)
//     return ((x >= this.minX) && (x <= this.maxX) && (y >= this.minY) && (y <= this.maxY))
//   }
//
//   this.nextCard = (x, y) => (y <= parent.endY)
//   this.prevCard = (x, y) => (x <= parent.startX)
//
//   this.display = () => {
//     const { startX, startY, endX, endY, centerX, centerY } = parent
//     const w = p.routeHalfWidth
//     p.line(centerX + w, centerY + w, endX + w, endY)     // RIGHT OUTSIDE WALL
//     p.line(startX, startY + w, centerX + w, centerY + w) // BOTTOM OUTSIDE WALL
//     p.line(startX, startY - w, centerX - w, centerY - w) // TOP INSIDE WALL
//     p.line(centerX - w, centerY - w, endX - w, endY)     // LEFT INSIDE WALL
//   }
// }
