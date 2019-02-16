export default function sketch (p) {
  p.setup = function () {
    p.createCanvas(600, 400);
  };

  p.draw = function () {
    p.background(100);
    p.push();
    p.ellipse(100, 100, 100);
    p.pop();
  };
};
