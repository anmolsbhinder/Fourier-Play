let time = 0;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  translate(200, 200);
  let radius = 50;
  ellipse(0, 0, radius * 2);

  stroke(255);
  noFill();

  time += 0.05;
}
