import createStats from 'src/assets/js/createStats';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  let start_gm = false;
  let circle = [];
  let timer = [];
  const gl_result = [];
  let box = [];
  let ld_bar = [];
  let ch_click = [];
  const cv_width = p.displayWidth;
  const cv_height = p.displayHeight;

  p.setup = function () {
    p.createCanvas(cv_width, cv_height);
    // construct_obj();
    p.onSetAppState({ startNewGame: construct_obj });
    p.wrapper.onfullscreenchange = (event) => {
      if (!document.fullscreenElement) {
        p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
        p.ready = false;
        start_gm = false;
      }
    };
  };

  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    if (p.props.newGame) {
      if (start_gm) {
        circle.display();
        box.display();
        ch_click.cal();
        ld_bar.set_state(ch_click.get_ratio);
        circle.set_radius((ld_bar.label)*1.2);
        ld_bar.display();
        if (timer.finished | ch_click.finished) {
          gl_result.push([p.millis() - timer.st_time, ch_click.get_ratio]);
          start_gm = false;
          // p.noLoop();
          // p.fill(104, 104, 104, 200);
          // p.noStroke();
          // p.rect(0, 0, cv_width, cv_height);
          // p.cursor();
          // p.fill(255);
          // p.textSize(45);
          // p.textAlign(p.CENTER, p.CENTER);
          // p.text('Finished . . .', cv_width/2, cv_height/2);	// Here the test will finished                     ############# END ##############
          console.log(gl_result);
          p.props.generateResult(gl_result);
        }
      }
      if (!p.ready) { drawFilter(); }
    }

    drawLabel();
  };

  p.mousePressed = function () {
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      construct_obj();
    }
    if (p.props.newGame) {
      if (start_gm) {
        if (box.hover) {
          gl_result.push([p.millis()-ch_click.time, ch_click.get_ratio]);
          ch_click.click();
        }
      }
    }
  };

  function construct_obj() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (p.ready) {
      circle = new Circle(cv_width/2, cv_height/2, 40);
      start_gm = true;
      box = new Rect(cv_width/2, cv_height-51, 300, 100);
      ld_bar = new LoadBar(cv_width/2, 20, 500, 40);
      ch_click = new CheckClick(0.005);
      timer = new Timer(10000);
    }
  }

  // ======================================================= DRAW POINTERLOCK FILTER
  function drawFilter() {
    p.push();
    p.fill(p.color(0, 0, 0, 150));
    p.rect(0, 0, p.width, p.height);
    p.fill('white');
    p.textFont('Courier New');
    p.textSize(30);
    p.textStyle(p.NORMAL);
    p.textAlign(p.CENTER, p.TOP);
    p.text('CLICK TO START GAME', p.width / 2, p.height / 2 - 20);
    p.text('(ESC TO EXIT)', p.width / 2, p.height / 2 + 20);
    p.pop();
  }

  // ======================================================= DRAW LABEL FUNCTION
  function drawLabel() {
    p.push();
    p.textFont('Courier New');
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT);
    p.textSize(15);
    p.fill('black');
    p.noStroke();
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 20, p.wrapper.offsetHeight - 20);
    p.pop();
  }

  class CheckClick {
    constructor(a=0.01, click_inc=0.04) {
      this.a = a;
      this.click_inc = click_inc;
      this.ratio = 0;
      this.time = p.millis();
    }

    click() {
      this.ratio = this.ratio + this.click_inc;
      this.time = p.millis();
    }

    get get_ratio() {
      return this.ratio;
    }

    get finished() {
      if (this.ratio>=1) {
        return true;
      }
      return false;
    }

    cal() {
      const tmp = this.ratio - 0.5*this.a;
      this.ratio = p.max(0, tmp);
    }
  }

  class Timer {
    constructor(t_time) {
      this.total_time = t_time;
      this.st_time = p.millis();
    }

    get ratio() {
      return (p.millis()-this.st_time)/this.total_time;
    }

    get finished() {
      if (p.millis()-this.st_time> this.total_time) {
        return true;
      }
      return false;
    }
  }
  class Circle {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.init_r = radius;
      this.radius = radius;
    }

    set_radius(coef) {
      this.radius = p.max(coef, 1) * this.init_r;
    }

    display() {
      p.stroke(0);
      p.fill(200);
      p.ellipse(this.x, this.y, this.radius, this.radius);
    }
  }
  class LoadBar {
    constructor(x, y, width, height, state=0) {
      this.x = x-width/2;
      this.y = y+2-height/2;
      this.width = width;
      this.height = height;
      this.state = state;
      this.labels = ['poor', 'keep going', 'good', 'excelent'];
      this.label = 0;
    }

    set_state(st) {
      this.state = p.min(st, 1);
    }

    display() {
      p.fill('rgb(132, 255, 169)');
      p.noStroke();
      p.rect(this.x, this.y, this.width*this.state, this.height);
      p.noFill();
      p.stroke(0);
      p.rect(this.x, this.y, this.width, this.height);
      if (this.state>0.9) {
        this.label = 3;
      } else if (this.state>0.5) {
        this.label = 2;
      } else if (this.state>0.1) {
        this.label = 1;
      } else {
        this.label = 0;
      }
      p.fill(0);
      p.text(this.labels[this.label], this.x, this.y, this.width, this.height);
    }
  }
  class Rect {
    constructor(x, y, width, height) {
      this.x = x - width/2;
      this.y = y - height/2;
      this.width = width;
      this.height = height;
      this.y_t = this.y + height/2;
    }

    get hover() {
      let tmp = p.mouseX - this.x;
      if (tmp<=this.width & tmp>=0) {
        tmp = p.mouseY - this.y;
        if (tmp<=this.height & tmp>=0) {
          return true;
        }
        return false;
      }
      return false;
    }

    display() {
      p.stroke(0);
      if (this.hover) {
        p.fill('rgb(247, 131, 131)');
        p.cursor(p.HAND);
      } else {
        p.fill('rgb(244, 66, 66)');
        p.cursor();
      }
      p.rect(this.x, this.y, this.width, this.height, 0);
      p.fill(255);
      p.textSize(this.width/12);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Click this box as fast as you can', this.x+2, this.y, this.width-2, this.height-2);
    }
  }
}
