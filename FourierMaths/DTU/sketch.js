let x = [];
let fourierX;

let time = 0;
let path = [];


let img;
function preload() {
  img = loadImage('assets/dft.png');
}

function setup() {
  createCanvas(1880, 970);

  for (let i = 0; i < drawing.length; i += 3) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    x.push(c);
  }
  fourierX = dft(x);

  fourierX.sort((a, b) => b.amp - a.amp);

}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prev_x = x;
    let prev_y = y;


    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    stroke(0, 100);
    noFill();
    ellipse(x, y, radius * 2);

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(0,100);
    line(prev_x, prev_y, x, y);


  }
  return createVector(x, y);
}


function draw() {
  background(255);

  image(img, width/2, 10);

  stroke(0,0,0);
  textSize(40);
  fill(0);
  text('Discrete Fourier Transform',170,100);
  text('About 5000 Vectors In Use',750,900);

  let v = epiCycles(width/4, height/4, 0, fourierX);
  path.unshift(v);

  // // fill(255);
  // // triangle(490, wave[0] + 7, 490, wave[0] - 7, 505, wave[0])

  beginShape();
  strokeWeight(4);
  noFill();
  for (let i = 0; i < path.length; i++) {
    stroke(0, 255, 0);
    vertex(path[i].x, path[i].y);
  }
  endShape();
  strokeWeight(1);

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
  // if (wave.length > 2000) {
  //   wave.pop();
  // }

}
