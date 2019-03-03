import Ball from './Ball'

export default function sketch(p) {
  p.props = {}
  p.fps = 0

 // ======================================================= SETUP FUNCTION
  p.setup = function() {
    p.createCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight)
    p.frameRate(60)
    p.ellipseMode(p.RADIUS)
    p.textFont('Courier New')
    p.textStyle(p.BOLD)
    p.textSize(15)

    console.log(p.millis())
  }

  // ======================================================= CREATE BALL FUNCTION
  function createBall(color) {
    // p.ball = null
    void p.ball
    p.ball = new Ball(
      p,
      p.props.radius,
      p.width/2,
      p.height/2,
      color
    )
  }

  // ======================================================= DRAW FUNCTION
  p.draw = function() {
    p.background(230)
    p.cursor(p.ARROW)

    if (p.props.newGame) {
      if (p.props.startGame) {
        p.ball.display()
        p.reactionFrames++
      }

      // p.drawLoadingLine()
      // p.drawLevel()
    }

    if (p.frameCount%20 === 0) { p.fps = p.frameRate() }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 30)
  }

  // ======================================================= MY PRESS FUNCTION
  p.startNewGame = function() {
    if (p.playedGames >= p.countOfGames) {
      p.playedGames = 0
      window.endGame()
    } else {
      p.playedGames++
      // newGameButton.attribute('disabled', 'true')
      // p.newGame = true
      p.startGame = false
      p.loadingWidth = 0
      p.reactionFrames = 0
      // p.toggleSwitchButtons()
      // filter.hide()
      p.createBall(p.color("red"))
      p.myTimeOut = setTimeout(() => {
        p.startGame = true
      }, p.random(p.startTime*1000, p.gameTime*1000))
    }
  }

  // ======================================================= MY PRESS FUNCTION
  p.press = function() {
    // p.results.level = 1
    // p.results.radius = p.rad
    // p.results.mode = p.leftMouseMode ? "Left Mouse" : "Space"
    // if (p.startGame) {
    //   p.results.success = true
    // } else {
    //   clearTimeout(p.myTimeOut)
    //   p.results.success = false
    // }
    // p.results.time_reaction = (p.reactionFrames/60).toFixed(3)
    p.saveResults(p.url, p.results)
    p.startNewGame()
  }

  p.endGame = function() {
    p.newGame = false
    p.startGame = false
    // p.toggleSwitchButtons()
    // filter.style('display', 'flex')
    // newGameButton.removeAttribute('disabled')
  }

  p.drawLoadingLine = function() {
    if (p.props.newGame) {
      if (p.loadingWidth <= p.width) {
        p.loadingWidth += p.width/(60*(p.gameTime+p.startTime))
      }
      p.push()
      p.fill("blue")
      p.noStroke()
      p.rect(0,0,p.loadingWidth,2)
      p.pop()
    }
  }

  p.drawLevel = function() {
    p.push()
    p.textAlign(p.LEFT, p.CENTER)
    p.textFont('Courier New')
    p.textSize(15)
    p.fill(0,0,0)
    p.text(`Level: ${p.current_level.level}`, 30, 30)
    p.text(`Trials: ${p.playedGames}/${p.countOfGames}`, 30, 50)
    if (p.frameCount%10 === 0) { p.fps = p.frameRate() }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 70)
    p.pop()
  }

  // ======================================================= ON MOUSE AND KEYBOARD PRESS
  p.mousePressed = function() {
    if (p.props.newGame && p.leftMouseMode && 0 <= p.mouseX && p.mouseX <= p.width && 0 <= p.mouseY && p.mouseY <= p.height) {
      p.press()
    }
  }
  p.keyPressed = function() {
    if (p.props.newGame && p.keyCode === 32 && !p.leftMouseMode) {
      p.press()
    }
    return false;
  }

  // ======================================================= ON WINDOW RESIZE FUNCTION
  p.windowResized = function() {
    // p.remove()
    p.resizeCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight)
    // new game
  }
}












// window.saveResults = function(results) {
//   console.log('save: ' + results)
  // $.ajax({
  //   type: "POST",
  //   url: globalState.url,
  //   headers: { Authorization: `Token ${token}` },
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   data: JSON.stringify(results),
  //   success: response => {
  //     globalState.current_level = response.current_level// || current_level
  //     if (globalState.playedGames !== 0) {
  //       if (globalState.playedGames === globalState.countOfGames) {
  //         globalState.playedGames = 0
  //         window.startDemoFunction()
  //         window.appComponent.getUser()
  //         window.filterComponent.setState({ visible: true })
  //       } else {
  //         window.createBalls(globalState.current_level.speed)
  //         window.startGameFunction()
  //       }
  //     }
  //   },
  //   error: response => {
  //     console.log(response)
  //   },
  // })
// }
