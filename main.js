const {p5Noise} = require('./ported-noise');
const {p5Vector} = require('./ported-vector');

var scl = 10;
var xvec, yvec;
// var noiseInc = 0.1;
var noiseInc = 0.05;
// var noiseInc = 0.03;
var time = 0;
var particles = [];
var flowfield;

// Each frame will look at assigned flow field by index
// Frame 0 gets flowFields[0]...
// This is to parallelize frame rendering
var flowFields = [];

var hueNum = 0;
var hueInc = 1;
// var hueInc = 0.5;
// var hueInc = 0.25;
var framesNum = 0;

const graphicsStack = [];
const maxFrames = 150;

const WINDOW_WIDTH =  1920 / 6;
const WINDOW_HEIGHT = 1080 / 6;

const random = (n) => Math.random() * n;

// Will contain [x, y, r, g, b, a] to represent frames to be later drawn elsewhere
let frameStrings = '';

// Represents each frame
let frameStringsArray = [];

const programStartTime = new Date();
setup();
for (let i = 0; i < 100000; i++) {
       const currTime = new Date();
       draw();
       const endTime = new Date() - currTime;
       console.log(`Frame ${i} took ${endTime}ms. FPS: ${1000 / endTime}`);
}
console.log(`Program took ${new Date() - programStartTime}ms`);


function setup() {
    // frameRate(30);
    // colorMode(HSB, 100);
        //  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
        FlowField();
  
         const count = 10000;
         for (var i = 0; i < count; i++) {
                particles[i] = new Particle();
         }
  
        //  background('rgba(0, 0, 0, 1)');
  
        //  currentG = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
         
         // Fill stack with frames  
        //  for (let i = 0; i < maxFrames; i++) {
        //         const g = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
        //         g.background('rgba(0, 0, 0, 1)');
                
        //         graphicsStack.push(g);
        //  }
  }
  
  function draw() { // Rotating Vectors
        //  console.log('FPS: ' + frameRate());
       //   FlowField();
  
         for (var k = 0; k < particles.length; k++) {
                particles[k].show(framesNum);
                particles[k].update();
                particles[k].follow(flowfield);
                if (particles[k].edge()) particles[k] = new Particle();
         }

       //   Push a new frame and empty current frame after
       //   frameStringsArray.push(frameStrings);
       //   frameStrings = '';
  
         // Push current graphics onto stack and remove the oldest frame
        //  graphicsStack.push(currentG);
         
        //  // Stays in memory otherwise
        //  let graphicsPointer = graphicsStack.shift();
        //  graphicsPointer.remove();
  
        //  hueNum += hueInc;
        //  hueNum = hueNum % 360;
  
        //  // Render the stack
        //  const bufferG = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
        //  bufferG.background('rgb(0, 0, 0)');
        //  for (let i = 0; i < maxFrames; i++) {
        //         bufferG.image(graphicsStack[i], 0, 0);
        //  }
  
        //  image(bufferG, 0, 0);
         
        //  if (framesNum > 20000) {
        //         close();
        //  }
         
        //  const paddedHue = parseInt(hueNum).toString().padStart(3, '0');
        //  const paddedFrames = framesNum.toString().padStart(9, '0');
        //  // bufferG.save(`frame-3xtime-150x-5op-${paddedFrames}`);
        //  bufferG.remove();
  
         framesNum++;
  
        //  // Create a new graphics object we will write to
        //  currentG = createGraphics(WINDOW_WIDTH, WINDOW_HEIGHT);
  }
  
  function FlowField(){
         xvec = Math.floor((WINDOW_WIDTH+50) / scl);
         yvec = Math.floor((WINDOW_HEIGHT+50) / scl);
         // console.log('Creating flow field of size', xvec * yvec);
         flowfield = new Array(xvec * yvec);
  
         var yNoise = 0;
         for (var y = 0; y < yvec; y++) {
                var xNoise = 0;
                for (var x = 0; x < xvec; x++) {
                       var vecDirect = p5Noise.noise(xNoise, yNoise, time) * 2*(Math.PI * 2);
                       var dir = p5Vector.fromAngle(vecDirect);
                       var index = x + y * xvec;
                       flowfield[index] = dir;
                       dir.setMag(3);
                       xNoise += noiseInc;
                }
                yNoise += noiseInc;
                time += (.00001 / 3);
         }
  }
  
  function Particle() {
         this.x = random(WINDOW_WIDTH);
         this.y = random(WINDOW_HEIGHT);
         this.pos = p5Vector.createVector(this.x, this.y);
         this.oldPos = p5Vector.createVector(this.x, this.y);
         this.vel = p5Vector.createVector(0, 0);
         this.acc = p5Vector.createVector(0, 0);
         this.r = 1;
         this.maxspeed = 1;
  
         this.update = function() {
                this.oldPos = p5Vector.createVector(this.pos.x, this.pos.y);
                this.pos.add(this.vel);
                this.vel.add(this.acc);
                this.acc.mult(0);
                this.vel.limit(this.maxspeed);
         }
  
         this.follow = function(vectors) { // flowfield vectors
                var x = Math.floor(this.pos.x / scl);
                var y = Math.floor(this.pos.y / scl);
                var index = x + y * xvec;
                var force = vectors[index];
                this.applyForce(force);
         }
  
         this.applyForce = function(force) {
                this.acc.add(force);
         }
  
         this.show = function(frame) {
                // const colorStr = `hsla(${parseInt(hueNum)}, 100%, 50%, 0.05)`;
                // const newColor = color(colorStr);
                const r = `255`;
                const g = `255`;
                const b = `0`;
                const a = `1`;
                
                // currentG.fill(newColor);
                // currentG.noStroke();
                // currentG.ellipse(this.pos.x, this.pos.y, 1, 1);
                (async () => {
                       frameStrings += `[${frame}, ${this.pos.x}, ${this.pos.y}, ${r}, ${g}, ${b}, ${a}]\n`;

                })();
                // currentG.line(this.pos.x, this.pos.y, this.oldPos.x, this.oldPos.y);
         }
  
         this.edge = function() {
                if (this.pos.x < -this.r)         return true;
                if (this.pos.y < -this.r)         return true;
                if (this.pos.x > WINDOW_WIDTH + this.r)  return true;
                if (this.pos.y > WINDOW_HEIGHT + this.r) return true;
                return false;
         }
  }
  

  