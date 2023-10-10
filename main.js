// P5.js Code from Daniel Shiffman instructional <https://www.youtube.com/watch?v=BjoM9oKOAKY&t=542s>

var scl = 10;
var xvec, yvec;
// var noiseInc = 0.1;
var noiseInc = 0.05;
// var noiseInc = 0.03;
var time = 0;
var particles = [];
var flowfield;

var hueNum = 0;
var hueInc = 1;
// var hueInc = 0.5;
// var hueInc = 0.25;
var framesNum = 0;

const graphicsStack = [];
const maxFrames = 150;

const WINDOW_WIDTH =  1920 / 1;
const WINDOW_HEIGHT = 1080 / 1;

// We write to this each frame and update it
let currentG;

// TODO: Try to draw frames with little opacity then maximizing it at the end

function setup() {
  frameRate(30);
  colorMode(HSB, 100);
       createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

       const count = 10000;
       for (var i = 0; i < count; i++) {
              particles[i] = new Particle();
       }

       background('rgba(0, 0, 0, 1)');

       currentG = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
       
       // Fill stack with frames  
       for (let i = 0; i < maxFrames; i++) {
              const g = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
              g.background('rgba(0, 0, 0, 1)');
              
              graphicsStack.push(g);
       }
}

function draw() { // Rotating Vectors
       console.log('FPS: ' + frameRate());
       FlowField();

       for (var k = 0; k < particles.length; k++) {
              particles[k].show();
              particles[k].update();
              particles[k].follow(flowfield);
              if (particles[k].edge()) particles[k] = new Particle();
              // particles[k].show();
              // particles[k].update();
              // particles[k].edge();
              // particles[k].follow(flowfield);
       }

       // Push current graphics onto stack and remove the oldest frame
       graphicsStack.push(currentG);
       
       // Stays in memory otherwise
       let graphicsPointer = graphicsStack.shift();
       graphicsPointer.remove();

       hueNum += hueInc;
       hueNum = hueNum % 360;

       // Render the stack
       const bufferG = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
       bufferG.background('rgb(0, 0, 0)');
       for (let i = 0; i < maxFrames; i++) {
              bufferG.image(graphicsStack[i], 0, 0);
       }

       image(bufferG, 0, 0);
       
       if (framesNum > 20000) {
              close();
       }
       
       const paddedHue = parseInt(hueNum).toString().padStart(3, '0');
       const paddedFrames = framesNum.toString().padStart(9, '0');
       // bufferG.save(`frame-3xtime-150x-5op-${paddedFrames}`);
       bufferG.remove();

       framesNum++;

       // Create a new graphics object we will write to
       currentG = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function FlowField(){
       xvec = floor((WINDOW_WIDTH+50) / scl);
       yvec = floor((WINDOW_HEIGHT+50) / scl);
       // console.log('Creating flow field of size', xvec * yvec);
       flowfield = new Array(xvec * yvec);

       var yNoise = 0;
       for (var y = 0; y < yvec; y++) {
              var xNoise = 0;
              for (var x = 0; x < xvec; x++) {
                     var vecDirect = noise(xNoise, yNoise, time) * 2*(TWO_PI);
                     var dir = p5.Vector.fromAngle(vecDirect);
                     var index = x + y * xvec;
                     flowfield[index] = dir;
                     dir.setMag(3);
                     xNoise += noiseInc;
                    //  stroke(180);
                    //  push();
                    //  translate((x * scl) * 8, (y * scl) * 8);
                    //  rotate(dir.heading());
                    //  line(0, 0, scl, 0);
                    //  pop();
              }
              yNoise += noiseInc;
              time += (.00001 / 3);
              // time += (.00001 / 4);
              // time += .00001;
              // time += .000001;
       }
}

function Particle() {
       this.x = random(width);
       this.y = random(height);
       this.pos = createVector(this.x, this.y);
       this.oldPos = createVector(this.x, this.y);
       this.vel = createVector(0, 0);
       this.acc = createVector(0, 0);
       this.r = 1;
       this.maxspeed = 1;

       this.update = function() {
              this.oldPos = createVector(this.pos.x, this.pos.y);
              this.pos.add(this.vel);
              this.vel.add(this.acc);
              this.acc.mult(0);
              this.vel.limit(this.maxspeed);
       }

       this.follow = function(vectors) { // flowfield vectors
              var x = floor(this.pos.x / scl);
              var y = floor(this.pos.y / scl);
              var index = x + y * xvec;
              var force = vectors[index];
              this.applyForce(force);
       }

       this.applyForce = function(force) {
              this.acc.add(force);
       }

       this.show = function() {
              const colorStr = `hsla(${parseInt(hueNum)}, 100%, 50%, 0.05)`;
              const newColor = color(colorStr);
              
              currentG.fill(newColor);
              currentG.noStroke();
              currentG.ellipse(this.pos.x, this.pos.y, 1, 1);
              currentG.line(this.pos.x, this.pos.y, this.oldPos.x, this.oldPos.y);
       }

       this.edge = function() {
              // if (this.pos.x < -this.r) this.pos.x = width + this.r;
              // if (this.pos.y < -this.r) this.pos.y = height + this.r;
              // if (this.pos.x > width + this.r) this.pos.x = -this.r;
              // if (this.pos.y > height + this.r) this.pos.y = -this.r;
              if (this.pos.x < -this.r)         return true;
              if (this.pos.y < -this.r)         return true;
              if (this.pos.x > width + this.r)  return true;
              if (this.pos.y > height + this.r) return true;
              return false;
       }
}

function windowResized() {
       resizeCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}
