import createStats from 'src/assets/js/createStats';

export default function sketch(p) {
  const stats = createStats();
  const yl_color = p.color(221,229,  0);
  const rd_color = p.color(229, 26,  0);
  const wh_color = p.color(255,255,255);
  var gl_startGame = [];
  var gl_timer = [];
  var time_bar = [];
  var start_time = [];
  var circles = [];
  var circles_snk = [];
  var test = [];
  var test_snk = [];
  var gl_result = [];
  var gl_result_key = [];
  var gl_score = [];
  var hovered = false;
  var img = [];
  var snk = [];
  var keys = [];
  var tree = [];
  var trunk = [];
  var press_key = {             
    17:false, 18:false, 19:false, 20:false,       
    65:false, 97:false,           
    83:false, 115:false,          
    68:false, 100:false,          
    87:false, 119:false
  };


  let cv_width = p.displayWidth;
  let cv_height = p.displayHeight;
  let cv_mid = [cv_width/2,cv_height/2];

  p.preload = function(){
    tree = p.loadImage(`${window.location.href.split('games')[0]}img` + '/tree.png');
    trunk = p.loadImage(`${window.location.href.split('games')[0]}img` + '/trunk.png')
    keys = [p.loadImage(`${window.location.href.split('games')[0]}img` +'/a.png'),
    p.loadImage(`${window.location.href.split('games')[0]}img` + '/s.png'),
    p.loadImage(`${window.location.href.split('games')[0]}img` +'/d.png'),
    p.loadImage(`${window.location.href.split('games')[0]}img` + '/w.png'),
    p.loadImage(`${window.location.href.split('games')[0]}img` + '/ctrl.png')]
    snk.push(p.loadImage(`${window.location.href.split('games')[0]}img` + '/snake.png'))
    snk.push(p.loadImage(`${window.location.href.split('games')[0]}img` + '/snake2.png'))
    img.push(p.loadImage(`${window.location.href.split('games')[0]}img` + '/chip.png'));
    img.push(p.loadImage(`${window.location.href.split('games')[0]}img` + '/forest_head.png'));
    img.push(p.loadImage(`${window.location.href.split('games')[0]}img` + '/old_head.png'));
    img.push(p.loadImage(`${window.location.href.split('games')[0]}img` + '/park_head.png'));
  }

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
        time_bar.display(gl_timer.ratio,gl_timer.mm);
        p.imageMode(p.CORNER);
        p.image(tree,cv_mid[0],0,cv_mid[0],cv_height);
        p.image(trunk,0,cv_mid[1]/2,cv_mid[0],3*cv_height/4);
        hovered = false;

        for (const circle of circles) {
          circle.display();
          circle.type = 0;
          hovered = circle.hovered | hovered;
        }

        for (const circle of circles_snk){
          circle.display();
          circle.type = 0;
        }

        change_cl();
        change_snk();
        show_keys();
        if (hovered) {
          p.cursor(p.HAND);
        } else {
          p.cursor();
        }

        if (gl_timer.mm == 0) {
          gl_startGame=false;
          p.cursor();
          
          // console.log(gl_result);
          p.props.generateResult({'chipmunk': gl_result, 'snake': gl_result_key}, gl_score.score, gl_score.total);
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
      time_bar = new TimeBar(200,0,cv_width-250,20)
      gl_score = new Score(0,cv_height);
      gl_startGame = true;
      create_circles();
      test = new Test(7,5,1500)
      test_snk = new Test(4,3,1500)
      change_cl();
      change_snk();
      gl_timer = new Timer(9000,p.millis());
    }
  }

  function create_circles() {
    circles[0] = new Ball(7*cv_mid[0]/4,5.8*cv_mid[1]/8,90,'',img);
    circles[1] = new Ball(15*cv_mid[0]/8,9.3*cv_mid[1]/8,90,'',img);
    circles[2] = new Ball(6.95*cv_mid[0]/4,11.5*cv_mid[1]/8,90,'',img);
    circles[3] = new Ball(10.9*cv_mid[0]/8,10.5*cv_mid[1]/8,90,'',img);
    circles[4] = new Ball(12.5*cv_mid[0]/8,3*cv_mid[1]/8,90,'',img);
    circles[5] = new Ball(9*cv_mid[0]/8,6*cv_mid[1]/8,90,'',img);
    circles[6] = new Ball(11*cv_mid[0]/8,3.2*cv_mid[1]/8,90,'',img);

    circles_snk[0] = new Ball(1.1*cv_mid[0]/8,9.5*cv_mid[1]/8,90,'',snk); //a
    circles_snk[1] = new Ball(3*cv_mid[0]/8,6*cv_mid[1]/8,90,'',snk);   //w
    circles_snk[2] = new Ball(6.3*cv_mid[0]/8,9.5*cv_mid[1]/8,90,'',snk); //d
    circles_snk[3] = new Ball(2.7*cv_mid[0]/8,11.5*cv_mid[1]/8,90,'',snk);  //s
  }

  function show_keys(){
    p.imageMode(p.CENTER)
    p.image(keys[3],circles_snk[1].width,circles_snk[1].height-circles_snk[1].radius*.8,circles_snk[1].radius/2,circles_snk[1].radius/2); //w
    p.image(keys[1],circles_snk[3].width,circles_snk[3].height+circles_snk[3].radius*.8,circles_snk[3].radius/2,circles_snk[3].radius/2); //s
    p.image(keys[2],circles_snk[2].width+circles_snk[2].radius*.8,circles_snk[2].height,circles_snk[2].radius/2,circles_snk[2].radius/2); //d
    p.image(keys[0],circles_snk[0].width-circles_snk[0].radius*.8,circles_snk[0].height,circles_snk[0].radius/2,circles_snk[0].radius/2); //a
  }

  function change_cl() {
    if(test.reach_max){
      if(test.ans_type == 2 | test.ans_type == 3 | test.ans_type == 4){
        gl_result.push([1,test.max_t,test.ans_type,-1])
        gl_score.inc()
      } else {
        gl_result.push([0,test.max_t,test.ans_type,-1])
        gl_score.dec()
      }
      test.next_test()
    }
    if(test.ans_type == 1){
      circles[test.red_ball].set_type(2)
      circles[test.yel_ball].set_type(1)
    } else if (test.ans_type == 2){
      circles[test.red_ball].set_type(3)
      circles[test.yel_ball].set_type(1)
    } else if (test.ans_type == 3){
      circles[test.red_ball].set_type(4)
      circles[test.yel_ball].set_type(1)
    } else if (test.ans_type == 0){
      circles[test.yel_ball].set_type(1)
    }
  }

  function change_snk() {
    if(test_snk.reach_max){
      if(test_snk.ans_type == 2){
        gl_result_key.push([1,test_snk.max_t,test_snk.ans_type,-1])
        gl_score.inc()
      } else {
        gl_result_key.push([0,test_snk.max_t,test_snk.ans_type,-1])
        gl_score.dec()
      }
      test_snk.next_test()
    }
    if(test_snk.ans_type == 1){
      circles_snk[test_snk.yel_ball].set_type(2)
    } else if (test_snk.ans_type == 0){
      circles_snk[test_snk.yel_ball].set_type(1)
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

  p.keyPressed = function(){
    if(start_game){
      var tmp = [];
      var pressed = false;
      press_key[p.keyCode] = true;
      // console.log(press_key)
      if (test_snk.ans_type == 0){
        if (press_key[17] | press_key[18] | press_key[19] | press_key[20]){     //[a,w,d,s]
          if (press_key[65] | press_key[97]){               //ctrl + a
            tmp = [0 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'ctrl + a',p.keyCode];
            pressed = true;
          } else if (press_key[83] | press_key[115]){           //ctrl + s
            tmp = [3 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'ctrl + s',p.keyCode];
            pressed = true;
          } else if (press_key[68] | press_key[100]){           //ctrl + d
            tmp = [2 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'ctrl + d',p.keyCode]
            pressed = true;
          } else if (press_key[87] | press_key[119]){           //ctrl + w
            tmp = [1 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'ctrl + w',p.keyCode]
            pressed = true;
          }
        } else if (press_key[83] | press_key[115] | press_key[68] | press_key[100] | press_key[87] | press_key[119] | press_key[65] | press_key[97]){
          tmp = [0,test_snk.resp_time,test_snk.ans_type,' ',p.keyCode]
          pressed = true;
        }
      } else if (test_snk.ans_type == 1){
        if (press_key[65] | press_key[97]){                 //a
          tmp = [0 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'a',p.keyCode]
          pressed = true;
        } else if (press_key[83] | press_key[115]){             //s
          tmp = [3 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'s',p.keyCode]
          pressed = true;
        } else if (press_key[68] | press_key[100]){             //d
          tmp = [2 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'d',p.keyCode]
          pressed = true;
        } else if (press_key[87] | press_key[119]){             //w
          tmp = [1 == test_snk.yel_ball,test_snk.resp_time,test_snk.ans_type,'w',p.keyCode]
          pressed = true;
        }

      } else if (test_snk.ans_type == 2){
        if (press_key[83] | press_key[115] | press_key[68] | press_key[100] | press_key[87] | press_key[119] | press_key[65] | press_key[97]){
          gl_result_key.push([0,test_snk.resp_time,test_snk.ans_type,' ',p.keyCode])
        }
      }
      if(pressed){
        if(tmp[0]){
          gl_score.inc()
          tmp[0] = 1;
        } else {
          gl_score.dec()
          tmp[0] = 0;
        }
        gl_result_key.push(tmp)
        test_snk.next_test();
      }
    }
  }

  p.keyReleased = function(){
    if(start_game){
      press_key[p.keyCode] = false;
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

  class Test{
    constructor(ball_num,num_ans_type,max_t){
      this.n = ball_num
      this.num_ans_type = num_ans_type;
      this.ans_type = p.floor(p.random(0,(this.n*this.num_ans_type)));
      this.ans_type = this.ans_type%this.num_ans_type
      this.yel_ball = p.floor(p.random(0,this.n));
      this.red_ball = p.floor(p.random(1,this.n-1));
      this.red_ball = (this.red_ball+this.yel_ball) % (this.n-1);
      this.start_t = p.millis();
      this.max_t = max_t;
    }
    next_test(){
      this.ans_type = p.floor(p.random(0,(this.n*this.num_ans_type)))
      this.ans_type = this.ans_type%this.num_ans_type
      this.yel_ball = p.floor(p.random(0,this.n))
      this.red_ball = p.floor(p.random(1,this.n-1))
      this.red_ball = (this.red_ball+this.yel_ball) % (this.n-1)
      this.start_t = p.millis()
    }
    get reach_max(){
      if(this.max_t<p.millis()-this.start_t){
        return true;
      } else {
        return false;
      }
    }
    get resp_time(){
      var tmp = p.millis()-this.start_t
      this.start_t = p.millis()
      return tmp
    }
  }

  class Ball{
    constructor(width, height, radius, num,imgs){
      this.height = height;
      this.width = width;
      this.radius = radius;
      this.num = num;
      this.hovered = false;
      this.color = p.color(219, 145, 0,230)
      this.type = 0;
      this.imgs = [];
      this.size = this.radius*(.8);
      for (var i = 0; i < imgs.length; i++) {
        this.imgs[i] = imgs[i];
      }
    }
    hover(){
      if(p.dist(p.mouseX,p.mouseY,this.width,this.height)<this.radius/2){
        this.hovered = true;
        p.stroke(220)
      } else {
        this.hovered = false;
        p.stroke(0)
      }
    }
    get hit(){
      if (p.dist(p.mouseX,p.mouseY,this.width,this.height)<this.radius/2){
        return true;
      } else {
        return false;
      }
    }
    set_type(type){
      this.type = type
    }
    display(){
      p.fill(this.color)
      this.hover();
      p.ellipse(this.width,this.height,this.radius,this.radius)
      // p.text(this.num,this.width,this.height)
      p.imageMode(p.CENTER);
      if(this.type !=0){
        p.image(this.imgs[this.type-1],this.width,this.height,this.size,this.size)
      }

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
