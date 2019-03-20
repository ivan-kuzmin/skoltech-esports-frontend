import pointerLock from 'src/assets/js/pointerLock';
import createStats from 'src/assets/js/createStats';
import sounds from './sound_data';


export default function sketch(p) {
  const stats = createStats();
  p.props = {};
  p.cs_go_coefficient = 0.2745;
  let gl_startGame = false;
  const cv_width = p.displayWidth;
  const cv_height = p.displayHeight;
  let gl_ball = [];
  let gl_pointer = [];
  let gl_label = [];
  let gl_timer = [];
  let gl_timer_lb = [];
  const gl_score = [];												// Results will store in this variable
  let time_bar = [];
  let song = [];
  let song_cl = [];
  let game_fin = false;
  let curr_stat = 0;
  let resp_time = 0;
  let tmp_ans = 0;
  const lang = 'en';


  p.setup = function () {
    p.createCanvas(cv_width, cv_height);
    p.frameRate(60);

    gl_startGame = false;
    p.angleMode(p.DEGREES);
    p.noCursor();
    // start_game();												// Call this line when you need to start the game ############ START #############
    p.onSetAppState({ startNewGame: start_game });
    p.wrapper.onfullscreenchange = (event) => {
      if (!document.fullscreenElement) {
        p.onSetAppState(state => ({ newGame: false, game: { ...state.game, playedGames: 0 } }));
        p.ready = false;
        gl_startGame = false;
      }
    };
    gl_pointer = new cursorPointer(40);
    pointerLock(p, gl_pointer.moveCallback, false);
  };

  p.draw = function () {
    for (const stat of stats) {
      stat.domElement.style.opacity = p.props.newGame ? 0.5 : 1;
      stat.update();
    }
    p.background(230);
    p.noFill();
    p.stroke(0);
    p.rect(0, 0, cv_width-1, cv_height-1);
    if (p.props.newGame) {
      if (gl_startGame) {
        finished(gl_timer.dec());
        change_lb(gl_timer_lb.dec(), 0);
        time_bar.display(gl_timer.ratio, gl_timer.mm);
        gl_ball.display(gl_pointer.radius);
        gl_label.display();
        song_cl.draw();
        if (game_fin) {
          gl_startGame = false;
          game_fin = false;
          // p.background(0, 0, 0, 180);
          // p.textAlign(p.CENTER, p.CENTER);
          // p.fill(255);
          // p.textSize(70);
          // p.text('Finished...', cv_width/2, cv_height/2);	// Here the test will finished                     ############# END ##############
        }
        gl_pointer.display();
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

  p.keyPressed = function () {
    if (p.keyCode == 32) {
      change_lb(true, 1);
    }
  };

  p.mousePressed = function () {
    if (p.props.newGame && !p.ready) {
      p.ready = true;
      start_game();
    }
    if (p.props.newGame) {
      song_cl.check_hit();
    }
  };

  function start_game() {
    if (!document.fullscreenElement) { p.wrapper.requestFullscreen(); }
    if (!p.pointerLockIsLocked()) { p.wrapper.requestPointerLock(); }
    if (p.ready) {
      time_bar = new TimeBar(200, 0, cv_width-250, 20);
      gl_startGame = true;
      gl_pointer.x = p.width / 2;
      gl_pointer.y = p.height / 2;
      gl_timer = new Timer(6000, p.millis());
      create_objs();
    }
  }

  function create_objs() {
    song_cl = new Songs(cv_width, cv_height, 200, 50, 2000, lang);
    song_cl.prep_info();
    song_cl.get_new_sound();
    gl_ball = new Ball(cv_width/2, 100, 25, p.floor(p.random(0, 360)), 1.5, cv_width, cv_height);
    gl_label = new Label(cv_width/2, cv_height/2, 200, 50);
    gl_timer = new Timer(9000, p.millis());
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
      // p.noLoop();
      gl_startGame = false;
      // p.cursor();
      // console.log(gl_score);							// 1st variable of results
      // console.log(song_cl.result);					// 2nd variable of results
      game_fin = true;
      p.props.generateResult(gl_score, song_cl.result);
    }
  }


  class Songs {
    constructor(x, y, width, height, interval, lang) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.cur_song = [];
      this.cur_song_txt = [];
      this.right_choice = [];
      this.class = [];
      this.subclass = [];
      this.lang = lang;
      this.sound_inf = [];
      this.start_time = p.millis();
      this.txt_x = x - width/2;
      this.txt_y = y - height/2;
      this.interval = interval;
      this.result = [];
    }

    prep_info() {
      sounds.collection.forEach(this.extract_inf, this);
    }

    extract_inf(item, index) {
      this.sound_inf.push([item, this.getLength(sounds[item])-1]);
    }

    getLength(dict) {
      return Object.keys(dict).length;
    }

    play_new_sound() {
      this.class = p.floor(p.random(0, this.sound_inf.length));
      this.subclass = p.floor(p.random(1, this.sound_inf[this.class][1]+1));
      this.cur_song = sounds.main_url+sounds[this.sound_inf[this.class][0]].main_url
			+ sounds[this.sound_inf[this.class][0]][this.subclass].main_url + sounds[this.sound_inf[this.class][0]][this.subclass][1];
      this.cur_song_txt = sounds[this.sound_inf[this.class][0]][this.subclass].name[this.lang];
      this.Load_sound(this.cur_song);
    }

    get_new_sound() {
      this.class = p.floor(p.random(0, this.sound_inf.length));
      this.subclass = p.floor(p.random(1, this.sound_inf[this.class][1]+1));
      this.right_choice = sounds[this.sound_inf[this.class][0]][this.subclass].name[this.lang];
    }

    Load_sound(loc) {
      song = p.loadSound(loc, this.playSound);
      this.start_time = p.millis();
    }

    playSound() {
      // console.log(this.song)
      song.setVolume(0.8);
      song.play();
    }

    check_next() {
      const tmp_inter = p.millis()-this.start_time;
      if (tmp_inter > this.interval) {
        if (this.cur_song_txt == this.right_choice) {
          this.result.push([tmp_inter, 0]);
        } else {
          this.result.push([tmp_inter, 1]);
        }
        this.play_new_sound();
      }
    }

    check_hit() {
      const tmp_inter = p.millis()-this.start_time;
      if (this.cur_song_txt == this.right_choice) {
        this.result.push([tmp_inter, 1]);
        this.get_new_sound();
      } else {
        this.result.push([tmp_inter, 0]);
      }
    }

    draw() {
      this.check_next();
      p.fill(0, 0, 0, 150);
      p.rect(this.x-this.width, this.y-this.height, this.width, this.height, 15);
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(this.right_choice, this.txt_x, this.txt_y);
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
      if (p.dist(gl_pointer.x, gl_pointer.y, this.x, this.y)+this.radius<=pointer_r) {
        if (this.hover_stat != 1) {
          this.store_data(1);
        }
        p.fill(226);
        this.draw_elip();
        this.write_txt('\uF0FC', 'rgb(39, 142, 93)', this.x, this.y+this.radius/8, this.radius*1.5);
      } else if (p.dist(gl_pointer.x, gl_pointer.y, this.x, this.y)<pointer_r+this.radius) {
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
      this.x = p.width/2;
      this.y = p.height/2;
    }

    // ======================================================= MOUSE MOVE FUNCTION
    moveCallback = (x, y) => {
      if (p.ready) {
        let nextY = this.y + y * p.props.sensitivity * p.cs_go_coefficient;
        if (nextY > p.height) {
          nextY = p.height;
        } else if (nextY < 0) {
          nextY = 0;
        }
        let nextX = this.x + x * p.props.sensitivity * p.cs_go_coefficient;
        if (nextX > p.width) {
          nextX = p.width;
        } else if (nextX < 0) {
          nextX = 0;
        }
        this.x = nextX;
        this.y = nextY;
      }
    };

    display() {
      p.stroke(100);
      p.line(this.x, this.y+this.radius, this.x, this.y+this.radius+20);
      p.line(this.x, this.y-this.radius, this.x, this.y-this.radius-20);
      p.line(this.x+this.radius, this.y, this.x+this.radius+20, this.y);
      p.line(this.x-this.radius, this.y, this.x-this.radius-20, this.y);
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
}

// window.getLength = function (dict) {
// 	return Object.keys(dict).length;
// }
