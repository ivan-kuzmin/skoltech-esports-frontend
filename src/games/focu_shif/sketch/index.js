import createStats from 'src/assets/js/createStats';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  const yl_color = 'rgb(221, 229, 0)';
  const rd_color = 'rgb(229, 26, 0)';
  const wh_color = 'rgb(255,255,255)';
  let gl_startGame = [];
  let gl_timer = [];
  let time_bar = [];
  const start_time = [];
  const circles = [];
  let test = [];
  const gl_result = [];
  let hovered = false;
  const cv_width = p.displayWidth;
  const cv_height = p.displayHeight;
  const cv_mid = [cv_width/2, cv_height/2];
  let gl_score;

  p.setup = function () {
    p.createCanvas(cv_width, cv_height);

    gl_startGame = false;

    // start_game();											// Call this line when you need to start the game ############ START #############
    p.onSetAppState({ startNewGame: start_game });
    p.wrapper.onfullscreenchange = (event) => {
      if (!document.fullscreenElement) {
        p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
        p.ready = false;
        gl_startGame = false;
      }
    };
    gl_score = new Score(p.width-20, p.height-20);
  };

  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    if (p.props.newGame) {
      if (gl_startGame) {
        gl_timer.dec();
        gl_score.display();
        time_bar.display(gl_timer.ratio, gl_timer.mm);
        hovered = false;
        for (const circle of circles) {
          circle.display();
          circle.color = wh_color;
          hovered = circle.hovered | hovered;
        }
        change_cl();
        if (hovered) {
          p.cursor(p.HAND);
        } else {
          p.cursor();
        }

        if (gl_timer.mm == 0) {
          gl_startGame=false;
          // p.noLoop();
          // p.fill(104, 104, 104, 200);
          // p.noStroke();
          // p.rect(0, 0, cv_width, cv_height);
          // p.cursor();
          // p.fill(255);
          // p.textAlign(p.CENTER, p.CENTER);
          // p.text('Finished...', cv_width/2, cv_height/2);	// Here the test will finished                     ############# END ##############
          console.log(gl_result);
          p.props.generateResult(gl_result, gl_score.score, gl_score.total);
        }
      }
      if (!p.ready) { drawFilter(); }
    }

    drawLabel();
  };

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

  function start_game() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (p.ready) {
      time_bar = new TimeBar(200, 0, cv_width-250, 20);
      gl_score = new Score(p.width - 20, p.height - 20);
      gl_startGame = true;
      create_circles();
      test = new Test(4, 1000);
      change_cl();
      gl_timer = new Timer(9000, p.millis());
    }
  }

  function create_circles() {
    circles[0] = new Ball(cv_mid[0]-105, cv_mid[1]-105, 90, '');
    circles[1] = new Ball(cv_mid[0]+105, cv_mid[1]-105, 90, '');
    circles[2] = new Ball(cv_mid[0]-105, cv_mid[1]+105, 90, '');
    circles[3] = new Ball(cv_mid[0]+105, cv_mid[1]+105, 90, '');
  }

  function change_cl() {
    if (test.reach_max) {
      if (test.ans_type==1 | test.ans_type==2) {
        gl_result.push([1, test.max_t, test.ans_type, -1]);
        gl_score.inc();
      } else {
        gl_result.push([0, test.max_t, test.ans_type, -1]);
        gl_score.dec();
      }
      test.next_test();
    }
    if (test.ans_type == 1) {
      circles[test.red_ball].set_color(rd_color);
      circles[test.yel_ball].set_color(yl_color);
    } else if (test.ans_type == 0) {
      circles[test.yel_ball].set_color(yl_color);
    }
  }


  p.mousePressed = function () {
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      start_game();
    }
    if (p.props.newGame) {
      if (gl_startGame) {
        for (const j in circles) {
          const i = Number(j);
          if (circles[i].hit) {
            console.log([i, test.yel_ball, test.red_ball, test.ans_type]);
            if (test.ans_type!=0) {
              gl_score.dec();
              gl_result.push([0, test.resp_time, test.ans_type, i]);
            } else if (i==test.yel_ball) {
              gl_score.inc();
              gl_result.push([1, test.resp_time, test.ans_type, i]);
            } else {
              gl_score.dec();
              gl_result.push([0, test.resp_time, test.ans_type, i]);
            }
            test.next_test();
          }
        }
      }
    }
  };

  class Timer {
    constructor(mm, st_time) {
      this.total = mm;
      this.mm = mm;
      this.start_time = st_time;
    }

    dec() {
      if (this.mm> 0) {
        this.mm = this.total - p.millis() + this.start_time;
      } else {
        this.mm = 0;
      }
    }

    inc(mm) {
      this.total += mm;
    }

    get ratio() {
      return this.mm/this.total;
    }
  }


  class TimeBar {
    constructor(x, y, width, height) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }

    display(perc, txt) {
      p.fill(39, 183, 36);
      p.noStroke();
      p.rect(this.x, this.y, this.width*perc, this.height);
      p.stroke(0);
      p.noFill();
      p.rect(this.x, this.y, this.width, this.height);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(20);
      p.fill(0);
      p.text(`${p.ceil(txt/1000) }s`, this.x+this.width+24, this.height/2);
    }
  }

  class Test {
    constructor(ball_num, max_t) {
      this.n = ball_num;
      this.ans_type = p.floor(p.random(0, (this.n*3)+2));
      this.ans_type = this.ans_type%3;
      this.yel_ball = p.floor(p.random(0, this.n));
      this.red_ball = p.floor(p.random(1, this.n-1));
      this.red_ball = (this.red_ball+this.yel_ball) % (this.n-1);
      this.start_t = p.millis();
      this.max_t = max_t;
    }

    next_test() {
      this.ans_type = p.floor(p.random(0, (this.n*3)+2));
      this.ans_type = this.ans_type%3;
      this.yel_ball = p.floor(p.random(0, this.n));
      this.red_ball = p.floor(p.random(1, this.n-1));
      this.red_ball = (this.red_ball+this.yel_ball) % (this.n-1);
      this.start_t = p.millis();
    }

    get reach_max() {
      if (this.max_t<p.millis()-this.start_t) {
        return true;
      }
      return false;
    }

    get resp_time() {
      const tmp = p.millis()-this.start_t;
      this.start_t = p.millis();
      return tmp;
    }
  }

  class Ball {
    constructor(width, height, radius, num) {
      this.height = height;
      this.width = width;
      this.radius = radius;
      this.num = num;
      this.hovered = false;
      this.color = 'rgb(255,255,255)';
    }

    hover() {
      if (p.dist(p.mouseX, p.mouseY, this.width, this.height)<this.radius/2) {
        this.hovered = true;
        p.stroke(220);
      } else {
        this.hovered = false;
        p.stroke(0);
      }
    }

    get hit() {
      if (p.dist(p.mouseX, p.mouseY, this.width, this.height)<this.radius/2) {
        return true;
      }
      return false;
    }

    set_color(color) {
      this.color = color;
    }

    display() {
      p.fill(this.color);
      this.hover();
      p.ellipse(this.width, this.height, this.radius, this.radius);
    }
  }


  class Score {
    constructor(x, y) {
      this.score = 0;
      this.total = 0;
      this.x_pos = x;
      this.y_pos = y;
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
      p.push();
      p.textFont('Courier New');
      p.textAlign(p.LEFT);
      p.textStyle(p.BOLD);
      p.textSize(15);
      p.noStroke();
      p.fill(0);
      p.text(`Score: ${this.score}/${this.total}`, 20, p.wrapper.offsetHeight - 40);
      p.pop();
    }
  }
}
