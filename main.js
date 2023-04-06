let inc;
let scl;
let cols;
let rows;

let zoff;

let fr;

let particles = [];

let flowField = [];

function setup() {
  createCanvas(600, 600);
  zoff = 0;
  scl = 10;
  inc = 0.1;
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP();

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  
  background(220);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += inc;
      
    }
    yoff += inc;
    zoff += 0.0002;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].edges();
    particles[i].show();    
    particles[i].follow(flowField);
  }
  fr.html(floor(frameRate()) + " fps");
}