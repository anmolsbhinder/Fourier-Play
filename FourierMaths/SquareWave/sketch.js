let time = 0;
let wave = [];

let slider;

let img;
function preload() {
  img = loadImage('assets/squarewave_rescaled.gif');
}

function setup() {
  createCanvas(1880, 970);
  slider = createSlider(1, 500, 1);
  slider.position(width/10, 2*height/3);
  slider.style('width', '200px');

}

function draw() {
  background(255,255,255);

  image(img, width/4, 2*height/3-100,400,400);

  stroke(0,0,0);
  textSize(40);
  fill(0);
  text('Square Wave',170,100);

  textSize(32);
  fill(0);
  text(slider.value(),width/10+70, 2*height/3+50);
  text('No. of Vectors In Use',width/13, 2*height/3-20);
  
  translate(300, 400);


  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prev_x = x;
    let prev_y = y;
    let n = i * 2 + 1;
    let radius = 100 * (4 / (n * PI));

    stroke(0,100);
    noFill();
    ellipse(x, y, radius * 2);

    x += radius * cos(n * time);
    y += radius * sin(n * time);

    // fill(255);
    // ellipse(x, y, 5);
    stroke(0);
    line(prev_x, prev_y, x, y);
  }

  wave.unshift(y);

  line(x, y, 500, wave[0]);

  fill(0);
  triangle(480,wave[0]+5,480,wave[0]-5,500,wave[0]);

  translate(500, 0);
  strokeWeight(4);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    stroke(255,0,0);
    vertex(i, wave[i]);
  }
  endShape();
  strokeWeight(1);

  if (wave.length > 2000) {
    wave.pop();
  }

  time += 0.02;
}
