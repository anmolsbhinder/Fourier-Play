let x = [];
let fourierX;

let time = 0;
let path = [];


function setup() {
  createCanvas(1880, 970);

  for (let i = 0; i < drawing.length; i += 10) {
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

    stroke(255, 100);
    noFill();
    ellipse(x, y, radius * 2);

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255);
    line(prev_x, prev_y, x, y);


  }
  return createVector(x, y);
}


function draw() {
  background(0);

  let v = epiCycles(width/2, height/2, 0, fourierX);
  path.unshift(v);

  // // fill(255);
  // // triangle(490, wave[0] + 7, 490, wave[0] - 7, 505, wave[0])

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    stroke(255, 0, 0);
    vertex(path[i].x, path[i].y);
  }
  endShape();

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
