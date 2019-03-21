import createStats from 'src/assets/js/createStats';

export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  const gl_balls = [];
  let gl_right_hit = 0;
  let gl_wrong_hit = 0;
  const gl_result = [];											// Results will store in this variable
  let gl_score = [];
  let gl_startGame = [];
  let gl_timer = [];
  let gl_level = [];
  let time_bar = [];
  const start_time = [];
  const gl_balls_choices = [];
  const cv_width = p.displayWidth;
  const cv_height = p.displayHeight;

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
  };

  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    if (p.props.newGame) {
      if (gl_startGame) {
        let hovered = false;
        gl_timer.dec();
        gl_level.display();
        gl_score.display();
        time_bar.display(gl_timer.ratio, gl_timer.mm);
        for (const ball of gl_balls) {
          ball.display();
          hovered |= ball.hovered;
        }
        if (hovered) {
          p.cursor(p.HAND);
        } else {
          p.cursor();
        }
        if (gl_timer.mm == 0) {
          // p.noLoop();
          // p.fill(104, 104, 104, 200);
          // p.noStroke();
          // p.rect(0, 0, cv_width, cv_height);
          // p.cursor();
          // p.fill(255);
          // p.textAlign(p.CENTER, p.CENTER);
          // p.text('Finished...', cv_width/2, cv_height/2);	// Here the test will finished                     ############# END ##############
          // console.log(gl_result);
          gl_startGame = false;
          p.props.generateResult(gl_result, gl_score.score, gl_score.total);
        }
      }
      if (!p.ready) { drawFilter(); }
    }

    drawLabel();
  };

  function start_game() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (p.ready) {
      time_bar = new TimeBar(200, 0, cv_width-250, 20);
      gl_level = new levelCounter(1, 10, 0, 20, 0, 20);
      gl_score = new Score(0, cv_height);
      gl_level.inc_lvl();
      gl_right_hit = 0;
      gl_wrong_hit = 0;
      gl_startGame = true;
      create_tests();
      create_balls();
      gl_timer = new Timer(10000, p.millis());
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

  function create_balls() {
    gl_balls[0] = new Ball((cv_width/2)-150, cv_height/2, gl_balls_choices[0][0], gl_balls_choices[0][1]);
    gl_balls[1] = new Ball((cv_width/2)+150, cv_height/2, gl_balls_choices[0][2], gl_balls_choices[0][3]);
  }

  p.mousePressed = function () {
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      start_game();
    }
    if (p.props.newGame) {
      if (gl_startGame) {
        for (const i in gl_balls) {
          if (gl_balls[i].hit) {
            const choice = (gl_level.total_subLevels*(gl_level.current_level-1))+(gl_level.sub_level-1);
            let tmp = gl_balls_choices[choice];
            if (tmp[4]==i) {
              gl_result.push([choice, p.millis() - gl_level.start_time, 1]);				// Here results will get update
              gl_score.inc();
            } else {
              gl_result.push([choice, p.millis() - gl_level.start_time, 0]);				// Here results will get update
              gl_score.dec();
            }
            gl_level.inc_lvl();
            tmp = gl_balls_choices[choice+1];
            gl_balls[0].radius = tmp[0];
            gl_balls[0].num = tmp[1];
            gl_balls[1].radius = tmp[2];
            gl_balls[1].num = tmp[3];
          }
        }
      }
    }
  };

  function create_tests() {
    const size_tmp = [];
    const num_tmp = [];
    const ord_tmp = [];
    let right_ch = 0;
    let min_val = 0;
    for (let i = 0; i < gl_level.total_levels; i++) {
      for (let j = 0; j < gl_level.total_subLevels; j++) {
        size_tmp[0] = p.floor(p.random(80, 120));
        size_tmp[1] = p.floor(p.random(180, 220));
        num_tmp[0] = p.floor(p.random(min_val, 10));
        num_tmp[1] = p.ceil(p.random(num_tmp[0], 10));
        ord_tmp[0] = p.random([0, 1]);
        ord_tmp[1] = p.random([0, 1]);
        if (j<11) {
          right_ch = (ord_tmp[0] + 1) % 2;
        } else {
          right_ch = (ord_tmp[1] + 1) % 2;
        }
        gl_balls_choices.push([size_tmp[ord_tmp[0]], num_tmp[ord_tmp[1]], size_tmp[(ord_tmp[0]+1)%2], num_tmp[(ord_tmp[1]+1)%2], right_ch]);
      }
      min_val = -10;
    }
    // console.log(gl_balls_choices);
  }

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

  class Ball {
    constructor(width, height, radius, num) {
      this.height = height;
      this.width = width;
      this.radius = radius;
      this.num = num;
      this.hovered = false;
    }

    hover() {
      if (p.dist(p.mouseX, p.mouseY, this.width, this.height)<this.radius/2) {
        p.fill(255, 125, 150);
        this.hovered = true;
      } else {
        this.hovered = false;
      }
    }

    get hit() {
      if (p.dist(p.mouseX, p.mouseY, this.width, this.height)<this.radius/2) {
        return true;
      }
      return false;
    }

    display() {
      p.fill(255);
      this.hover();
      p.ellipse(this.width, this.height, this.radius, this.radius);
      p.textSize(this.radius/2);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(0);
      p.text(this.num, this.width, this.height);
    }
  }

  class levelCounter {
    constructor(str_lvl, total_lvl, sub_lvl, total_sb_lvl, x_pos, y_pos) {
      this.current_level = str_lvl;
      this.total_levels = total_lvl;
      this.sub_level = sub_lvl;
      this.total_subLevels = total_sb_lvl;
      this.x_pos = x_pos;
      this.y_pos = y_pos;
      this.s_type = 0;
      this.q_type = ['Select bigger shape', 'Select bigger number'];
      this.start_time = 0;
    }

    inc_lvl() {
      if (this.sub_level==this.total_subLevels) {
        this.sub_level = 1;
        this.current_level += 1;
        this.s_type = (this.s_type + 1) % 2;
      } else {
        this.sub_level += 1;
        if (this.sub_level==11) {
          this.s_type = (this.s_type + 1) % 2;
        }
      }
      this.start_time = p.millis();
    }

    display() {
      p.push();
      p.textSize(30);
      p.textAlign(p.CENTER, p.CENTER);
      this.s_type== 1 ? p.fill(244, 66, 66) : p.fill(62, 96, 232);
      p.text(this.q_type[this.s_type], cv_width/2, this.y_pos + 50);
      p.fill(0);
      p.textSize(20);
      p.textAlign(p.LEFT, p.CENTER);
      p.pop();
      p.push();
      p.textFont('Courier New');
      p.textAlign(p.LEFT);
      p.textStyle(p.BOLD);
      p.textSize(15);
      p.noStroke();
      p.fill(0);
      p.text(`Level: ${(`0${this.current_level}`).slice(-2)}/${this.total_levels}`, 20, p.wrapper.offsetHeight - 80);
      p.text(`Sub-lvl: ${(`0${this.sub_level}`).slice(-2)}/${this.total_subLevels}`, 20, p.wrapper.offsetHeight - 60);
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
