import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/assets/css/spinner.css'
import 'src/assets/css/style.css'
import globalState from './globalState'
import { token } from 'src/assets/js/script'


ReactDOM.render(<CookiesProvider><App ref={ref => {window.appComponent = ref}} /></CookiesProvider>, document.getElementById('app'));

let fps = 0

window.setup = function() {
  let container = document.getElementById('canvas')
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight).parent('canvas')
  frameRate(60)
  ellipseMode(RADIUS)

  newGameButton = select('#newGameButton')
  // filter = select('#filter')

  newGameButton.mouseClicked(function() {
    window.createBalls(globalState.current_level.speed)
    newGameButton.attribute('disabled', 'true')
    // select('#app').style('z-index', 0)
    // filter.hide()
    window.filterComponent.setState({ visible: false })
    window.startGameFunction()
  })

  window.startDemoFunction()
}


window.createBalls = function(customSpeed) {
  globalState.balls = []
  for (var i = 0; i < globalState.current_level.balls; i++) {
    globalState.balls[i] = new Ball(
      globalState.rad,
      random(3*globalState.rad, width-3*globalState.rad),
      random(3*globalState.rad, height-3*globalState.rad),
      customSpeed,
      i,
      globalState.balls,
    );
  }
}


window.newGameFunction = function() {
  console.log('new game')
  globalState.trueBalls = 0
  globalState.falseBalls = 0
  globalState.selectedBalls = []
  globalState.balls = []
  globalState.startGame = false
  globalState.newGame = false
  globalState.startTimeTimer = globalState.startTime
}


window.startDemoFunction = function() {
  globalState.moveBalls = true
  newGameButton.removeAttribute('disabled')
  // filter.style('display', 'flex')
  // select('#app').style('z-index', 2)
  window.createBalls(globalState.demoSpeed)
}


window.startGameFunction = function() {
  console.log('start game')
  globalState.moveBalls = false
  globalState.newGame = true
  globalState.playedGames++
  setTimeout(() => {
    globalState.moveBalls = true
    globalState.startGame = true
    setTimeout(() => {
      globalState.moveBalls = false
      globalState.newGame = false
    }, globalState.gameTime*1000)
  }, globalState.startTime*1000)
}


window.mousePressed = function() {
  if (globalState.startGame && !globalState.moveBalls && !globalState.newGame) {
    for (let i = globalState.current_level.balls-1; i >= 0; i--) {
      if (globalState.balls[i].d < globalState.balls[i].rad) {
        globalState.balls[i].clicked()
        break
      }
    }
  }
}


window.draw = function() {
  background(230)
  cursor(ARROW)
  textStyle(BOLD)

  globalState.balls.forEach(ball => {
    if (globalState.moveBalls) {
      ball.move()
      if (globalState.startGame) {
        ball.startedCol = color(0,0,255)
        ball.col = color(0,0,255)
      }
    } else {
      if (globalState.startGame) {
        ball.hover()
      }
    }
    ball.display()
  })

  if (globalState.selectedBalls.length === globalState.current_level.red_balls) {
    globalState.selectedBalls.forEach(id => {
      if (id >= globalState.current_level.balls - globalState.current_level.red_balls) {
        globalState.trueBalls++
      } else {
        globalState.falseBalls++
      }
    })
    globalState.results = {}
    globalState.results = {
      success:     globalState.trueBalls === globalState.current_level.red_balls && globalState.falseBalls === 0,
      level:       globalState.current_level.level,
      true_balls:  globalState.trueBalls,
      false_balls: globalState.falseBalls,
      balls:       globalState.current_level.balls,
      red_balls:   globalState.current_level.red_balls,
      speed:       globalState.current_level.speed,
      radius:      globalState.rad,
    }
    window.saveResults(globalState.results)
    globalState.results = {}
    window.newGameFunction()
  }

  textAlign(LEFT, CENTER)
  textFont('Courier New')
  textSize(15)
  fill(0,0,0)
  text(`Level: ${globalState.current_level.level}`, 30, 30)
  text(`Trials: ${globalState.playedGames}/${globalState.countOfGames}`, 30, 50)
  if (frameCount%10 === 0) { fps = frameRate() }
  text(`FPS: ${fps.toFixed(1)}`, 30, 70)
}


window.windowResized = function() {
  let container = document.getElementById('canvas')
  resizeCanvas(container.offsetWidth, container.offsetHeight)
  window.newGameFunction()
  window.startDemoFunction()
  window.filterComponent.setState({ visible: true })
}


function Ball(rad, xpos, ypos, speed, id, others) {
  this.rad = rad
  this.xpos = xpos
  this.ypos = ypos
  this.speed = speed
  this.xspeed = random(0, 1)
  this.yspeed = 1 - this.xspeed
  this.xdirection = random(0, 1) > 0.5 ? -1 : 1
  this.ydirection = random(0, 1) > 0.5 ? -1 : 1
  this.id = id
  this.others = others
  this.hovered = false
  this.selected = false
  this.startedCol = this.id >= globalState.current_level.balls - globalState.current_level.red_balls ? color(255,0,0) : color(0,0,255)
  this.hoveredCol = color(0,0,0)
  this.selectedCol = color(0,255,0)
  this.col = this.startedCol
  this.stroke = 3

  this.move = function() {
    this.xpos += this.xspeed * this.xdirection * this.speed
    this.ypos += this.yspeed * this.ydirection * this.speed
    if (this.xpos > width - this.rad || this.xpos < this.rad) {
      this.xdirection *= -1;
    }
    if (this.ypos > height - this.rad || this.ypos < this.rad) {
      this.ydirection *= -1;
    }
  }

  this.hover = function() {
    this.d = dist(mouseX, mouseY, this.xpos, this.ypos)
    if (this.d < this.rad) {
      cursor(HAND)
    }
  }

  this.clicked = function() {
    if (this.d < this.rad) {
      this.selected = !this.selected
    }
    this.col = this.selected ? this.selectedCol : this.startedCol
    let timerId = setInterval(() => {
      this.rad += this.selected ? 0.1 : -0.1
    })
    setTimeout(() => {
      clearInterval(timerId)
    }, 100)
    if (this.selected) {
      globalState.selectedBalls.push(this.id)
    } else {
      let index = globalState.selectedBalls.indexOf(this.id)
      if (index > -1) {
        globalState.selectedBalls.splice(index, 1);
      }
    }
  }

  this.display = function() {
    fill(this.col)
    strokeWeight(this.stroke)
    ellipse(this.xpos, this.ypos, this.rad, this.rad);
  };
}


window.saveResults = function(results) {
  $.ajax({
    type: "POST",
    url: globalState.url,
    headers: { Authorization: `Token ${token}` },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(results),
    success: response => {
      globalState.current_level = response.current_level// || current_level
      if (globalState.playedGames !== 0) {
        if (globalState.playedGames === globalState.countOfGames) {
          globalState.playedGames = 0
          window.startDemoFunction()
          window.appComponent.getUser()
          window.filterComponent.setState({ visible: true })
        } else {
          window.createBalls(globalState.current_level.speed)
          window.startGameFunction()
        }
      }
    },
    error: response => {
      console.log(response)
    },
  })
}
