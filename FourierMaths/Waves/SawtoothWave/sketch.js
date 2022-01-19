let time = 0;
let wave = [];

let slider;

function setup() {
  createCanvas(1880, 970);
  slider = createSlider(1, 500, 1);
  slider.position(width/10, 2*height/3);
  slider.style('width', '200px');
}

function draw() {
  background(0);


  textSize(40);
  fill(255, 255, 255);
  text('Sawtooh Wave',100,70);


  textSize(32);
  fill(255, 255, 255);
  text(slider.value(),width/10+70, 2*height/3+50);
  
  translate(300, 400);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prev_x = x;
    let prev_y = y;
    let n = i+1;
    if (i % 2 == 1) {
      n *= -1;
    }
    let radius = 200 * (2 / (n * PI));

    stroke(255, 100);
    noFill();
    ellipse(x, y, radius * 2);

    x += radius * cos(n * time);
    y += radius * sin(n * time);

    // fill(255);
    // ellipse(x, y, 5);
    stroke(255);
    line(prev_x, prev_y, x, y);
  }

  wave.unshift(y);

  line(x, y, 500, wave[0]);

  fill(255);
  triangle(480,wave[0]+7,480,wave[0]-7,500,wave[0]);

  translate(500, 0);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    stroke(255, 0, 0);
    vertex(i, wave[i]);
  }
  endShape();

  if (wave.length > 2000) {
    wave.pop();
  }

  time += 0.01;
}
