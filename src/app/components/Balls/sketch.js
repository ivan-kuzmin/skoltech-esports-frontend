import Ball from "./ball"
import "p5/lib/addons/p5.dom.min"

export default function sketch(p) {
  let started, startGame, newGame
  let numBalls = 12
  let balls = []
  let selectedBalls = []
  let trueBalls = 0
  let falseBalls = 0
  let speed = 5
  let levelRedBalls = 4
  let startTime = 1
  let gameTime = 20
  let startTimeTimer = startTime
  let results = []
  let saveResults

  p.setup = function() {
    let canvasDiv = document.getElementById('Balls_div');
    let width = canvasDiv.offsetWidth;
    let height = canvasDiv.offsetHeight;
    p.createCanvas(width, height);
    p.ellipseMode(p.RADIUS);
    p.frameRate(60)

    p.createBalls()

    let newGameButton = p.select('#Balls_newGameButton')

    newGameButton.mousePressed(() => {
      p.createBalls()
      p.startGame()
    })
  }

  p.createBalls = () => {
    balls = []
    for (let i = 0; i < numBalls; i++) {
      balls[i] = new Ball(p, i, speed, numBalls, levelRedBalls, selectedBalls)
    }
  }

  p.startGame = () => {
    newGame = true
    setTimeout(() => {
      started = true
      startGame = true
      setTimeout(() => {
        started = false
      }, gameTime*1000)
    }, startTime*1000)
  }

  p.newGame = () => {
    trueBalls = 0
    falseBalls = 0
    selectedBalls = []
    balls = []
    startGame = false
    newGame = false
    startTimeTimer = startTime
    p.createBalls()
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    saveResults = props.saveResults
    // started = props.started
    // if (props.numBalls) {
      // numBalls = props.numBalls
      // p.createBalls()
    // }
  }

  p.mousePressed = () => {
    if (!started && startGame) {
      for (let i = numBalls-1; i >= 0; i--) {
        if (balls[i].d < balls[i].rad) {
          balls[i].clicked()
          break
        }
      }
    }
  }

  p.draw = function() {
    p.background(230);
    p.cursor(p.ARROW);

    if (p.frameCount%10 === 0) {
      console.log(p.frameRate())
    }

    balls.forEach(ball => {
      ball.display()
      if (started) {
        ball.move()
        if (startGame) {
          ball.startedCol = p.color(0,0,255)
          ball.col = p.color(0,0,255)
        }
      } else {
        if (startGame) {
          ball.hover()
        }
      }
    })

    if (selectedBalls.length === levelRedBalls) {
      console.log(selectedBalls)
      selectedBalls.forEach(id => {
        if (id >= numBalls - levelRedBalls) {
          trueBalls++
        } else {
          falseBalls++
        }
      })
      results.push({
        trueBalls: trueBalls,
        falseBalls: falseBalls,
      })
      if (results.length === 1) {
        console.log(results)
        saveResults(results)
        results = []
        p.newGame()
      } else {
        p.newGame()
        p.startGame()
      }
    }

    if (newGame) {
      p.push()
      p.strokeWeight(0)
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(30)
      p.rectMode(p.CENTER)
      if (!startGame) {
        if (startTimeTimer > 0) {
          p.fill(0,0,0,100)
          p.rect(p.width/2+4, p.height/2+4, 200, 80)
          p.fill(255,220,0,255)
          p.rect(p.width/2, p.height/2, 200, 80)
          p.fill(0,0,0)
          p.text("READY", p.width/2, p.height/2)
        }
      }
      if (p.frameCount % 60 === 0 && startTimeTimer > 0) {
        startTimeTimer --
      }
      p.pop()
    } else {
      p.fill(255,255,255,150)
      p.rect(-1, -1, p.width+1, p.height+1)
    }
  }
}
