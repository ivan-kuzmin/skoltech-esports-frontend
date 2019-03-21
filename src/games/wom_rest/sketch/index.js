import createStats from 'src/assets/js/createStats';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  let start_gm = false;
  const re_draw = true;
  const cv_width = p.displayWidth;
  const cv_height = p.displayHeight;
  // let ts_width = 7*cv_width/8;
  const ts_width = cv_width;
  const ts_height = 7 * cv_height / 8;
  // let x_base = cv_width-ts_width;
  const x_base = 0;
  const y_base = cv_height - ts_height;
  const shape = [];
  let hover = false;
  let contest = [];
  let timer = [];
  let score = [];
  let bar = [];

  p.setup = function () {
    p.createCanvas(cv_width, cv_height);
    // construct_obj();													// Function of starting game
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
    p.cursor();
    if (p.props.newGame) {
      if (start_gm) {
        if (timer.finished) {
          // p.noLoop();
          start_gm = false;
          if (contest.contest_type == 1) {
            contest.result.push([0, p.millis() - contest.st_time, contest.cr_ans, -1]);
          }
          // p.fill(0, 0, 0, 150);
          // p.rect(0, 0, cv_width, cv_height);
          // p.fill(244, 244, 66);
          // p.textSize(cv_width / 20);
          // p.textAlign(p.CENTER, p.CENTER);
          // p.text('Finished . . . ', cv_width / 2, cv_height / 2);
          console.log(contest.result);														// The results is here
          p.props.generateResult(contest.result, score.score, score.total);
        } else {
          score.display();
          bar.display(timer.ratio, p.floor((timer.total_t - p.millis() + timer.start_t) / 1000));
          if (contest.contest_type == 1) {
            hover = false;
            for (var i = 0; i < 4; i++) {
              shape[i].display();
              hover |= shape[i].hover_b;
            }
            if (hover) {
              p.cursor(p.HAND);
            } else {
              p.cursor();
            }
          } else {
            if (contest.changed) {
              if (contest.sc_chan) {
                score.dec();
                contest.sc_chan = false;
              }
              contest.changed = false;
              contest.nxt_round();
              for (var i = 0; i < 4; i++) {
                shape[i].sh = contest.shape[i];
              }
              shape[4].sh = contest.shape[contest.cr_ans];
              // console.log(contest.cr_ans)
            }
            shape[4].display();
          }
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
      for (let i = 0; i < 4; i++) {
        if (shape[i].hover_b) {
          if (i == contest.cr_ans) {
            score.inc();
          } else {
            score.dec();
          }
          contest.hit(i);
        }
      }
    }
  };

  function construct_obj() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (p.ready) {
      contest = new Contest(60000, 2000);
      bar = new Bar(cv_width / 2 - 200, 10, 400, 25);
      contest.nxt_round();
      shape.push(new Col_shape(contest.shape[0], x_base + ts_width / 4, y_base + ts_height / 4, 50));
      shape.push(new Col_shape(contest.shape[1], x_base + ts_width / 4, y_base + 3 * ts_height / 4, 50));
      shape.push(new Col_shape(contest.shape[2], x_base + 3 * ts_width / 4, y_base + ts_height / 4, 50));
      shape.push(new Col_shape(contest.shape[3], x_base + 3 * ts_width / 4, y_base + 3 * ts_height / 4, 50));
      shape.push(new Col_shape(contest.shape[contest.cr_ans], x_base + ts_width / 2, y_base + ts_height / 2, 150, false));
      score = new Score(20, p.wrapper.offsetHeight - 40);
      start_gm = true;
      timer = new Timer(20000);
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

  class Timer {
    constructor(total_t) {
      this.total_t = total_t;
      this.start_t = p.millis();
    }

    get finished() {
      const tmp = p.millis() - this.start_t;
      if (tmp > this.total_t) {
        return true;
      }
      return false;
    }

    get ratio() {
      return (p.millis() - this.start_t) / this.total_t;
    }
  }

  class Contest {
    constructor(wait_time, show_time) {
      this.w_time = wait_time;
      this.s_time = show_time;
      this.result = [];
      this.cr_ans = [];
      this.st_time = p.millis();
      this.tests = [];
      this.type = 0;
      this.shape = [];
      this.changed = true;
      this.sc_chan = false;
    }

    get contest_type() {
      const tmp = p.millis() - this.st_time;
      if (tmp > this.w_time & this.type == 1) {
        this.type = 0;
        this.result.push([0, this.w_time, this.cr_ans, -1]);
        this.changed = true;
        this.sc_chan = true;
        this.st_time = p.millis();
      } else if (tmp > this.s_time & this.type == 0) {
        this.type = 1;
        this.changed = true;
        this.st_time = p.millis();
      }
      return this.type;
    }

    nxt_round() {
      const order = p.shuffle([0, 1, 2]);
      const tmp = [];
      this.cr_ans = p.floor(p.random(4));
      tmp.push([this.get_col(order[0]), this.get_col(order[1]), this.get_col(order[2])]);
      for (let i = 1; i < 4; i++) {
        tmp.push([this.get_col(order[0]), this.get_col(order[1]), this.get_col(order[2])]);
        const h_i = this.get_hash(tmp[i]);
        for (var j = i - 1; j > -1; j--) {
          let h_j = this.get_hash(tmp[j]);
          while (h_j[0] == h_i[0] & h_j[1] == h_i[1] & h_j[2] == h_i[2]) {
            tmp[i] = [this.get_col(order[0]), this.get_col(order[1]), this.get_col(order[2])];
            h_j = this.get_hash(tmp[j]);
          }
        }
        for (var j = 0; j < 3; j++) {
          const change_dim = p.floor(p.random(16)) < 10 ? 0 : 1;
          if (change_dim == 0) {
            tmp[i][j][1] = tmp[i - 1][j][1];
          }
        }
        const shuf = p.floor(p.random(100)) < 20 ? 1 : 0;
        if (shuf == 1) {
          tmp[i] = p.shuffle(tmp[i]);
        }
      }
      this.shape = tmp;
    }

    get_hash(tmp) {
      return [(tmp[0][1] * 100) + (tmp[0][2]), (tmp[1][1] * 100) + (tmp[1][2]), (tmp[2][1] * 100) + (tmp[2][2])];
    }

    get_col(shape) {
      return [shape, p.floor(p.random(5, 10)), p.floor(p.random(5))];
    }

    hit(num = 0) {
      if (this.type == 1) {
        if (num == this.cr_ans) {
          this.result.push([1, p.millis() - this.st_time, this.cr_ans, num]);
        } else {
          this.result.push([0, p.millis() - this.st_time, this.cr_ans, num]);
        }
        this.st_time = p.millis();
        this.type = 0;
        this.changed = true;
      }
    }
  }

  class Col_shape {
    constructor(sh, x, y, di, hable = true) {
      this.sh = sh;
      this.x = x;
      this.y = y;
      this.di = di;
      this.width = this.di * 7;
      this.height = this.di * 3;
      this.x_rect = this.x - this.di * 3.5;
      this.y_rect = this.y - this.di * 1.5;
      this.hover_b = false;
      this.hable = hable;
    }

    get hover() {
      if (p.mouseX > this.x_rect & p.mouseX < this.x_rect + this.width) {
        if (p.mouseY > this.y_rect & p.mouseY < this.y_rect + this.height) {
          return true;
        }
        return false;
      }
      return false;
    }

    display() {
      for (let i = -1; i < 2; i++) {
        if (this.sh[i + 1][0] == 0) {
          draw_star(this.sh[i + 1][1], this.x + i * 2.3 * (this.di), this.y, this.di, this.sh[i + 1][2]);
        } else if (this.sh[i + 1][0] == 1) {
          draw_star2(this.sh[i + 1][1], this.x + i * 2.3 * (this.di), this.y, this.di, this.sh[i + 1][2]);
        } else if (this.sh[i + 1][0] == 2) {
          draw_poly(this.sh[i + 1][1], this.x + i * 2.3 * (this.di), this.y, this.di, this.sh[i + 1][2]);
        }
      }
      if (this.hover & this.hable) {
        p.fill(0, 0, 0, 50);
        this.hover_b = true;
      } else {
        p.noFill();
        this.hover_b = false;
      }
      p.rect(this.x_rect, this.y_rect, this.width, this.height);
    }
  }

  class Score {
    constructor(x, y, xal = p.LEFT, yal = p.BOTTOM) {
      this.score = 0;
      this.total = 0;
      this.x = x;
      this.y = y;
      this.xalign = xal;
      this.yalign = yal;
    }

    inc() {
      this.score++;
      this.total++;
    }

    dec() {
      this.score--;
      this.total++;
    }

    display() {
      // p.fill(0);
      // p.textSize(cv_height / 30);
      // p.textAlign(this.xalign, this.yalign);
      p.push();
      p.textFont('Courier New');
      p.textStyle(p.BOLD);
      p.textAlign(p.LEFT);
      p.textSize(15);
      p.fill('black');
      p.noStroke();
      p.text(`Score: ${this.score }/${ this.total}`, this.x, this.y);
      p.pop();
    }
  }

  class Bar {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    display(ratio, text = '') {
      p.noStroke();
      p.fill(66, 244, 146);
      p.rect(this.x, this.y, this.width * ratio, this.height);
      p.noFill();
      p.stroke(0);
      p.rect(this.x, this.y, this.width, this.height);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`${text } s`, this.x + this.width / 2, this.y + this.height / 2);
    }
  }

  function draw_star(n, x, y, diam, type = 0, iner_diam = 0.5, in_shape_diam = 0.3, bias_rot = 90) {
    const deg = 180 / n;
    p.stroke(0);
    p.fill(200);
    p.angleMode(p.DEGREES);
    p.beginShape();
    for (let i = 0; i < n; i++) {
      p.vertex(x + (p.cos(bias_rot - (2 * i * deg)) * diam), y - (p.sin(bias_rot - (2 * i * deg)) * diam));
      p.vertex(x + (p.cos(bias_rot - ((2 * i + 1) * deg)) * diam * iner_diam), y - (p.sin(bias_rot - ((2 * i + 1) * deg)) * diam * iner_diam));
    }
    p.endShape(p.CLOSE);
    draw_basic_sh(type, x, y, in_shape_diam * diam);
  }
  function draw_star2(n, x, y, diam, type = 0, iner_diam = 0.8, in_shape_diam = 0.3, bias_rot = 90) {
    const deg = 180 / n;
    p.stroke(0);
    p.fill(200);
    p.angleMode(p.DEGREES);
    p.beginShape();
    for (let i = 0; i < n; i++) {
      p.vertex(x + (p.cos(bias_rot - (2 * i * deg)) * diam), y - (p.sin(bias_rot - (2 * i * deg)) * diam));
      p.vertex(x + (p.cos(bias_rot - (2 * i * deg)) * diam * iner_diam), y - (p.sin(bias_rot - (2 * i * deg)) * diam * iner_diam));
      p.vertex(x + (p.cos(bias_rot - ((2 * i + 1) * deg)) * diam * iner_diam), y - (p.sin(bias_rot - ((2 * i + 1) * deg)) * diam * iner_diam));
      p.vertex(x + (p.cos(bias_rot - ((2 * i + 1) * deg)) * diam), y - (p.sin(bias_rot - ((2 * i + 1) * deg)) * diam));
    }
    p.endShape(p.CLOSE);
    draw_basic_sh(type, x, y, in_shape_diam * diam);
  }

  function draw_poly(n, x, y, diam, type = 0, in_shape_diam = 0.3, bias_rot = 90) {
    const deg = 360 / n;
    p.stroke(0);
    p.fill(200);
    p.angleMode(p.DEGREES);
    p.beginShape();
    for (let i = 0; i < n; i++) {
      p.vertex(x + (p.cos(bias_rot - (i * deg)) * diam), y - (p.sin(bias_rot - (i * deg)) * diam));
    }
    p.endShape(p.CLOSE);
    draw_basic_sh(type, x, y, in_shape_diam * diam);
  }

  function draw_basic_sh(type, x, y, diam) {
    p.fill(230);
    p.stroke(0);
    if (type == 1) {
      p.ellipse(x, y, diam, diam);
    } else if (type == 2) {
      const tmp = p.sin(45) * diam;
      p.rect(x - tmp, y - tmp, 2 * tmp, 2 * tmp);
    } else if (type == 3) {
      const tmp1 = p.sin(60) * diam;
      const tmp2 = p.cos(60) * diam;
      p.triangle(x, y - diam, x - tmp1, y + tmp2, x + tmp1, y + tmp2);
    } else if (type == 4) {
      p.quad(x, y - diam, x + diam, y, x, y + diam, x - diam, y);
    }
  }
}
