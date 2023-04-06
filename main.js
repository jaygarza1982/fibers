// P5.js Code from Daniel Shiffman instructional <https://www.youtube.com/watch?v=BjoM9oKOAKY&t=542s>

var scl = 5;
var xvec, yvec;
var noiseInc = 0.03;
var time = 0;
var particles = [];
var flowfield;

function setup() {
       createCanvas(windowWidth, windowHeight);

       for (var i = 0; i < 1000; i++) {
              particles[i] = new Particle();
       }

}

function draw() { // Rotating Vectors
       // background(255,100);
       background('rgba(0,0,0,0.25)');
       
       FlowField();

  // console.log('Noise inc', noiseInc);

       for (var k = 0; k < particles.length; k++) {
              particles[k].show();
              particles[k].update();
              particles[k].edge();
              particles[k].follow(flowfield);
       }
}

function FlowField(){
       xvec = floor((windowWidth+50) / scl);
       yvec = floor((windowHeight+50) / scl);
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
                     // stroke(180);
                     // push();
                     // translate(x * scl, y * scl);
                     // rotate(dir.heading());
                     // line(0, 0, scl, 0);
                     // pop();
              }
              yNoise += noiseInc;
              time += .000001;
       }
}

function Particle() {
       this.x = random(width);
       this.y = random(height);
       this.pos = createVector(this.x, this.y);
       this.vel = createVector(0, 0);
       this.acc = createVector(0, 0);
       this.r = 2.0;
       this.maxspeed = 1;

       this.update = function() {
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
              fill(255,255,255,1);
              noStroke();
              ellipse(this.pos.x, this.pos.y, 3, 3);
       }

       this.edge = function() {
              if (this.pos.x < -this.r) this.pos.x = width + this.r;
              if (this.pos.y < -this.r) this.pos.y = height + this.r;
              if (this.pos.x > width + this.r) this.pos.x = -this.r;
              if (this.pos.y > height + this.r) this.pos.y = -this.r;
       }
}

function windowResized() {
       resizeCanvas(windowWidth, windowHeight);
}