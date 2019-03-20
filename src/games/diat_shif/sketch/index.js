

// function preload() {
// 	let BallFont = loadFont('assets/Arial_Unicode.ttf');
// }

const s = function (p) {
  let gl_startGame = false;
  const cv_width = window.innerWidth;
  const cv_height = window.innerHeight;
  let gl_ball = [];
  let gl_pointer = [];
  let gl_label = [];
  let gl_timer = [];
  let gl_timer_lb = [];
  const gl_score = [];												// Results will store in this variable
  let time_bar = [];
  let game_fin = false;
  let curr_stat = 0;
  let resp_time = 0;
  let tmp_ans = 0;

  p.setup = function () {
    p.createCanvas(cv_width, cv_height);
    gl_startGame = false;
    p.angleMode(p.DEGREES);
    p.noCursor();
    start_game();												// Call this line when you need to start the game ############ START #############
  };

  p.draw = function () {
    p.background(255);
    p.noFill();
    p.stroke(0);
    p.rect(0, 0, cv_width-1, cv_height-1);
    if (gl_startGame) {
      finished(gl_timer.dec());
      change_lb(gl_timer_lb.dec(), 0);
      time_bar.display(gl_timer.ratio, gl_timer.mm);
      gl_ball.display(gl_pointer.radius);
      gl_pointer.display();
      gl_label.display();
      if (game_fin) {
        p.background(0, 0, 0, 180);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(255);
        p.textSize(70);
        p.text('Finished...', cv_width/2, cv_height/2);	// Here the test will finished                     ############# END ##############
      }
    }
  };
  p.keyPressed = function () {
    if (p.keyCode == 32) {
      change_lb(true, 1);
    }
  };

  function start_game() {
    time_bar = new TimeBar(200, 0, cv_width-250, 20);
    gl_startGame = true;
    gl_timer = new Timer(60000, p.millis());
    create_objs();
  }

  function create_objs() {
    gl_ball = new Ball(cv_width/2, 100, 25, p.floor(p.random(0, 360)), 1.5, cv_width, cv_height);
    gl_pointer = new cursorPointer(40);
    gl_label = new Label(cv_width/2, cv_height/2, 200, 50);
    gl_timer = new Timer(90000, p.millis());
    gl_timer_lb = new Timer(2000, p.millis());
    next_label();
    time_bar = new TimeBar(200, 0, cv_width-250, 20);
  }


  function next_label() {
    const color_txt = p.floor(p.random(0, gl_label.colors.length));
    const color_cl = p.floor(p.random(0, gl_label.colors.length));
    const q_type = p.floor(p.random(0, 10));
    const label_type = p.floor(p.random(0, 10));
    if (q_type>4) {
      gl_label.lbtype = 1;
    } else {
      gl_label.lbtype = 0;
    }
    if (label_type>4) {
      gl_label.rnd = 1;
    } else {
      gl_label.rnd = 0;
    }
    gl_label.next_rnd(color_txt, color_cl);
  }

  function change_lb(bool, pressed) {
    if (bool) {
      curr_stat = gl_ball.hover_stat;
      gl_ball.hover_stat = 2;
      resp_time = p.round(p.millis() - gl_label.start_time);
      gl_ball.store_data(curr_stat);
      !(pressed ^ gl_label.lbtype) ? tmp_ans = 1 : tmp_ans = 0;

      gl_score.push([p.round(gl_ball.full_foc), 							// Here results will get update
        p.round(gl_ball.semi_foc),
        p.round(gl_ball.loss_foc),
        gl_ball.switch_num,
        gl_label.curr_txt,
        gl_label.curr_col_txt,
        resp_time, tmp_ans]);

      gl_ball.switch_num = 0;
      gl_ball.loss_foc = 0;
      gl_ball.semi_foc = 0;
      gl_ball.full_foc = 0;
      gl_timer_lb.rst();
      next_label();
    }
  }
  function finished(bool) {
    if (bool) {
      p.noLoop();
      p.cursor();
      console.log(gl_score);
      game_fin = true;
    }
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
        return false;
      }
      this.mm = 0;
      return true;
    }

    inc(mm) {
      this.total += mm;
    }

    rst() {
      this.mm = this.total;
      this.start_time = p.millis();
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
    constructor(x, y, radius, angle, vel, width, height) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.angle = angle;
      this.velocity = vel;
      this.width = width;
      this.height = height;
      this.hover_stat = 0;
      this.hover_srart = p.millis();
      this.loss_foc = 0;
      this.semi_foc = 0;
      this.full_foc = 0;
      this.switch_num = 0;
    }

    hover(pointer_r) {
      if (p.dist(p.mouseX, p.mouseY, this.x, this.y)+this.radius<=pointer_r) {
        if (this.hover_stat != 1) {
          this.store_data(1);
        }
        p.fill(226);
        this.draw_elip();
        this.write_txt('\uF0FC', 'rgb(39, 142, 93)', this.x, this.y+this.radius/8, this.radius*1.5);
      } else if (p.dist(p.mouseX, p.mouseY, this.x, this.y)<pointer_r+this.radius) {
        if (this.hover_stat != 0.5) {
          this.store_data(0.5);
        }
        p.fill(242, 209, 65);
        this.draw_elip();
      } else {
        if (this.hover_stat != 0) {
          this.store_data(0);
        }
        p.fill(201, 65, 28);
        this.draw_elip();
        this.write_txt('\uF0FB', 'rgb(255, 255, 255)', this.x, this.y, this.radius*1.5);
      }
    }

    store_data(num) {
      if (this.hover_stat == 0) {
        this.loss_foc += p.millis() - this.hover_srart;
      } else if (this.hover_stat == 0.5) {
        this.semi_foc += p.millis() - this.hover_srart;
      } else {
        this.full_foc += p.millis() - this.hover_srart;
      }
      this.hover_srart = p.millis();
      this.hover_stat = num;
      this.switch_num++;
    }

    display(pointer_r) {
      this.hover(pointer_r);
    }

    cal_movement() {
      this.x += p.cos(this.angle)*this.velocity;
      this.y += -p.sin(this.angle)*this.velocity;
      this.cal_inters_borders();
    }

    cal_inters_borders() {
      this.cal_inters_left();
      this.cal_inters_top();
      this.cal_inters_right();
      this.cal_inters_bot();
    }

    cal_inters_bot() {
      if (this.y + this.radius >= this.height) {
        this.angle = 360 - this.angle;
        this.y = this.height - this.radius - 1;
      }
    }

    cal_inters_top() {
      if (this.y - this.radius <= 0) {
        this.angle = 360 - this.angle;
        this.y = 1+this.radius;
      }
    }

    cal_inters_right() {
      if (this.x + this.radius >= this.width) {
        if (this.angle>270) {
          this.angle = 540 - this.angle;
          this.x = this.width - this.radius - 1;
        } else {
          this.angle = 180 - this.angle;
          this.x = this.width - this.radius - 1;
        }
      }
    }

    cal_inters_left(left) {
      if (this.x - this.radius <= 0) {
        if (this.angle>180) {
          this.angle = 540 - this.angle;
          this.x = 1+this.radius;
        } else {
          this.angle = 180 - this.angle;
          this.x = 1+this.radius;
        }
      }
    }

    draw_elip() {
      p.stroke(0);
      p.ellipse(this.x, this.y, this.radius*2, this.radius*2);
      this.cal_movement();
    }

    write_txt(txt, rgb, x, y, size, v_align=p.CENTER, h_align=p.CENTER, fnt='Wingdings') {
      p.textFont(fnt);
      p.textAlign(h_align, v_align);
      p.noStroke();
      p.fill(rgb);
      p.textSize(size);
      p.text(txt, x, y);
    }
  }

  class cursorPointer {
    constructor(radius) {
      this.radius = radius;
    }

    display() {
      p.stroke(100);
      p.line(p.mouseX, p.mouseY+this.radius, p.mouseX, p.mouseY+this.radius+20);
      p.line(p.mouseX, p.mouseY-this.radius, p.mouseX, p.mouseY-this.radius-20);
      p.line(p.mouseX+this.radius, p.mouseY, p.mouseX+this.radius+20, p.mouseY);
      p.line(p.mouseX-this.radius, p.mouseY, p.mouseX-this.radius-20, p.mouseY);
    }
  }

  class Label {
    constructor(x, y, width, height) {
      this.x = x - width/2;
      this.y = y - height/2;
      this.txt_x = x;
      this.txt_y = y;
      this.width = width;
      this.height = height;

      this.colors_lb = ['RED', 'GREEN', 'BLUE',
        'GRAY', 'ORANGE', 'YELLOW',
        'WHITE', 'PINK', 'BROWN',
        'VIOLET', 'BLACK'];

      this.colors = ['rgb(255, 0, 0)', 'rgb(0,255,0)', 'rgb(0,0,255)',
        'rgb(128, 128, 128)', 'rgb(255, 127, 0)', 'rgb(255, 255, 0)',
        'rgb(255,255,255)', 'rgb(255, 192, 203)', 'rgb(150, 75, 0)',
        'rgb(127, 0, 255)', 'rgb(0,0,0)'];

      this.lbtype = 1;
      this.rnd = 1;
      this.curr_txt = [];
      this.curr_col = [];
      this.curr_col_txt = [];
      this.start_time = 0;
    }

    next_rnd(color_label, cl) {
      if (this.lbtype) {
        if (this.rnd) {
          this.curr_col = this.colors[color_label];
          this.curr_txt = this.colors_lb[color_label];
          this.curr_col_txt = this.colors_lb[color_label];
        } else {
          this.curr_col = this.colors[cl];
          this.curr_txt = this.colors_lb[cl];
          this.curr_col_txt = this.colors_lb[cl];
        }
      } else if (cl == color_label) {
        if (cl== this.colors_lb.length-1) {
          this.curr_col = this.colors[cl-1];
          this.curr_txt = this.colors_lb[color_label];
          this.curr_col_txt = this.colors_lb[cl-1];
        } else {
          this.curr_col = this.colors[cl+1];
          this.curr_txt = this.colors_lb[color_label];
          this.curr_col_txt = this.colors_lb[cl+1];
        }
      } else {
        this.curr_col = this.colors[cl];
        this.curr_txt = this.colors_lb[color_label];
        this.curr_col_txt = this.colors_lb[cl];
      }
      this.start_time = p.millis();
    }

    display() {
      p.noStroke();
      p.fill(0, 0, 0, 100);
      p.rect(this.x, this.y, this.width, this.height, 10);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(this.curr_col);
      p.textSize(this.height/2);
      p.textFont('Arial');
      p.text(this.curr_txt, this.txt_x, this.txt_y);
      p.fill(0);
    }
  }
};

const myp5 = new p5(s);
