
/**
 * A class to describe a two or three-dimensional vector, specifically
 * a Euclidean (also known as geometric) vector. A vector is an entity
 * that has both magnitude and direction. The datatype, however, stores
 * the components of the vector (`x`, `y` for 2D; or `x`, `y`, `z` for 3D). The magnitude
 * and direction can be accessed via the methods <a href="#/Vector/mag">Vector.mag()</a> and <a href="#/Vector/heading">heading()</a>.
 *
 * In many of the p5.js examples, you will see <a href="#/Vector">Vector</a> used to describe a
 * position, velocity, or acceleration. For example, if you consider a rectangle
 * moving across the screen, at any given instant it has a position (a vector
 * that points from the origin to its location), a velocity (the rate at which
 * the object's position changes per time unit, expressed as a vector), and
 * acceleration (the rate at which the object's velocity changes per time
 * unit, expressed as a vector).
 *
 * Since vectors represent groupings of values, we cannot simply use
 * traditional addition/multiplication/etc. Instead, we'll need to do some
 * "vector" math, which is made easy by the methods inside the <a href="#/Vector">Vector</a> class.
 *
 * @class Vector
 * @constructor
 * @param {Number} [x] x component of the vector
 * @param {Number} [y] y component of the vector
 * @param {Number} [z] z component of the vector
 * @example
 * <div>
 * <code>
 * let v1 = createVector(40, 50);
 * let v2 = createVector(40, 50);
 *
 * ellipse(v1.x, v1.y, 50, 50);
 * ellipse(v2.x, v2.y, 50, 50);
 * v1.add(v2);
 * ellipse(v1.x, v1.y, 50, 50);
 *
 * describe(`2 white ellipses. One center-left the other
 *   bottom right and off canvas`);
 * </code>
 * </div>
 */

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// const Vector = {
//     x: 0,
//     y: 0,
//     z: 0
// };

// Vector.prototype.constructor = (x, y, z) => {
//     this.x = x;
//     this.y = y;
//     this.z = z;
// }

// Vector = function Vector() {
//     let x, y, z;

//     // This is how it comes in with createVector()
//     // This check if the first argument is a function
//     //   if ({}.toString.call(arguments[0]) === '[object Function]') {
//     //     // In this case the vector have an associated p5 instance
//     //     this.isPInst = true;
//     //     this._fromRadians = arguments[0];
//     //     this._toRadians = arguments[1];
//     //     x = arguments[2] || 0;
//     //     y = arguments[3] || 0;
//     //     z = arguments[4] || 0;
//     //     // This is what we'll get with new Vector()
//     //   } else {
//     //     x = arguments[0] || 0;
//     //     y = arguments[1] || 0;
//     //     z = arguments[2] || 0;
//     //   }
//     /**
//      * The x component of the vector
//      * @property x {Number}
//      */
//     this.x = x;
//     /**
//      * The y component of the vector
//      * @property y {Number}
//      */
//     this.y = y;
//     /**
//      * The z component of the vector
//      * @property z {Number}
//      */
//     this.z = z;
// };

/**
 * Make a new 2D vector from an angle.
 *
 * @method fromAngle
 * @static
 * @param {Number}     angle The desired angle, in radians (unaffected by <a href="#/p5/angleMode">angleMode</a>)
 * @param {Number}     [length] The length of the new vector (defaults to 1)
 * @return {Vector}       The new <a href="#/Vector">Vector</a> object
 * @example
 * <div>
 * <code>
 * function draw() {
 *   background(200);
 *
 *   // Create a variable, proportional to the mouseX,
 *   // varying from 0-360, to represent an angle in degrees.
 *   let myDegrees = map(mouseX, 0, width, 0, 360);
 *
 *   // Display that variable in an onscreen text.
 *   // (Note the nfc() function to truncate additional decimal places,
 *   // and the "\xB0" character for the degree symbol.)
 *   let readout = 'angle = ' + nfc(myDegrees, 1) + '\xB0';
 *   noStroke();
 *   fill(0);
 *   text(readout, 5, 15);
 *
 *   // Create a Vector using the fromAngle function,
 *   // and extract its x and y components.
 *   let v = Vector.fromAngle(radians(myDegrees), 30);
 *   let vx = v.x;
 *   let vy = v.y;
 *
 *   push();
 *   translate(width / 2, height / 2);
 *   noFill();
 *   stroke(150);
 *   line(0, 0, 30, 0);
 *   stroke(0);
 *   line(0, 0, vx, vy);
 *   pop();
 * }
 * </code>
 * </div>
 */
Vector.fromAngle = function fromAngle(angle, length) {
    if (typeof length === 'undefined') {
        length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
};

/**
 * Adds `x`, `y`, and `z` components to a vector, adds one vector to another, or
 * adds two independent vectors together. The version of the method that adds
 * two vectors together is a static method and returns a <a href="#/Vector">Vector</a>, the others
 * act directly on the vector. Additionally, you may provide arguments to this method as an array.
 * See the examples for more context.
 *
 * @method add
 * @param  {Number} x   The x component of the vector to be added
 * @param  {Number} [y] The y component of the vector to be added
 * @param  {Number} [z] The z component of the vector to be added
 * @chainable
 * @example
 * <div class="norender">
 * <code>
 * let v = createVector(1, 2, 3);
 * v.add(4, 5, 6);
 * // v's components are set to [5, 7, 9]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * let v = createVector(1, 2, 3);
 * // Provide arguments as an array
 * let arr = [4, 5, 6];
 * v.add(arr);
 * // v's components are set to [5, 7, 9]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * // Static method
 * let v1 = createVector(1, 2, 3);
 * let v2 = createVector(2, 3, 4);
 *
 * let v3 = Vector.add(v1, v2);
 * // v3 has components [3, 5, 7]
 * print(v3);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // red vector + blue vector = purple vector
 * function draw() {
 *   background(240);
 *
 *   let v0 = createVector(0, 0);
 *   let v1 = createVector(mouseX, mouseY);
 *   drawArrow(v0, v1, 'red');
 *
 *   let v2 = createVector(-30, 20);
 *   drawArrow(v1, v2, 'blue');
 *
 *   let v3 = Vector.add(v1, v2);
 *   drawArrow(v0, v3, 'purple');
 * }
 *
 * // draw an arrow for a vector at a given base position
 * function drawArrow(base, vec, myColor) {
 *   push();
 *   stroke(myColor);
 *   strokeWeight(3);
 *   fill(myColor);
 *   translate(base.x, base.y);
 *   line(0, 0, vec.x, vec.y);
 *   rotate(vec.heading());
 *   let arrowSize = 7;
 *   translate(vec.mag() - arrowSize, 0);
 *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 *   pop();
 * }
 * </code>
 * </div>
 */
/**
 * @method add
 * @param  {Vector|Number[]} value The vector to add
 * @chainable
 */
Vector.prototype.add = function add(x, y, z) {
    if (x instanceof Vector) {
        this.x += x.x || 0;
        this.y += x.y || 0;
        this.z += x.z || 0;
        return this;
    }
    if (x instanceof Array) {
        this.x += x[0] || 0;
        this.y += x[1] || 0;
        this.z += x[2] || 0;
        return this;
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
};

/**
 * Creates a new <a href="#/Vector">Vector</a> (the datatype for storing vectors). This provides a
 * two or three-dimensional vector, specifically a Euclidean (also known as
 * geometric) vector. A vector is an entity that has both magnitude and
 * direction.
 *
 * @method createVector
 * @param {Number} [x] x component of the vector
 * @param {Number} [y] y component of the vector
 * @param {Number} [z] z component of the vector
 * @return {Vector}
 * @example
 * <div><code>
 * let v1;
 * function setup() {
 *   createCanvas(100, 100);
 *   stroke(255, 0, 255);
 *   v1 = createVector(width / 2, height / 2);
 * }
 *
 * function draw() {
 *   background(255);
 *   line(v1.x, v1.y, mouseX, mouseY);
 *   describe('draws a line from center of canvas to mouse pointer position.');
 * }
 * </code></div>
 */
Vector.createVector = function (x, y, z) {
    return new Vector(x, y, z);
};

/**
 * Calculates the magnitude (length) of the vector and returns the result as
 * a float. (This is simply the equation `sqrt(x*x + y*y + z*z)`.)
 *
 * @method mag
 * @return {Number} The magnitude of the vector
 * @example
 * <div>
 * <code>
 * function draw() {
 *   background(240);
 *
 *   let v0 = createVector(0, 0);
 *   let v1 = createVector(mouseX, mouseY);
 *   drawArrow(v0, v1, 'black');
 *
 *   noStroke();
 *   text('vector length: ' + v1.mag().toFixed(2), 10, 70, 90, 30);
 * }
 *
 * // draw an arrow for a vector at a given base position
 * function drawArrow(base, vec, myColor) {
 *   push();
 *   stroke(myColor);
 *   strokeWeight(3);
 *   fill(myColor);
 *   translate(base.x, base.y);
 *   line(0, 0, vec.x, vec.y);
 *   rotate(vec.heading());
 *   let arrowSize = 7;
 *   translate(vec.mag() - arrowSize, 0);
 *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 *   pop();
 * }
 * </code>
 * </div>
 * <div class="norender">
 * <code>
 * let v = createVector(20.0, 30.0, 40.0);
 * let m = v.mag();
 * print(m); // Prints "53.85164807134504"
 * </code>
 * </div>
 */
Vector.prototype.mag = function mag() {
    return Math.sqrt(this.magSq());
};

/**
 * Calculates the squared magnitude of the vector and returns the result
 * as a float. (This is simply the equation `x*x + y*y + z*z`.)
 * Faster if the real length is not required in the
 * case of comparing vectors, etc.
 *
 * @method magSq
 * @return {number} The squared magnitude of the vector
 * @example
 * <div class="norender">
 * <code>
 * // Static method
 * let v1 = createVector(6, 4, 2);
 * print(v1.magSq()); // Prints "56"
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   background(240);
 *
 *   let v0 = createVector(0, 0);
 *   let v1 = createVector(mouseX, mouseY);
 *   drawArrow(v0, v1, 'black');
 *
 *   noStroke();
 *   text('vector length squared: ' + v1.magSq().toFixed(2), 10, 45, 90, 55);
 * }
 *
 * // draw an arrow for a vector at a given base position
 * function drawArrow(base, vec, myColor) {
 *   push();
 *   stroke(myColor);
 *   strokeWeight(3);
 *   fill(myColor);
 *   translate(base.x, base.y);
 *   line(0, 0, vec.x, vec.y);
 *   rotate(vec.heading());
 *   let arrowSize = 7;
 *   translate(vec.mag() - arrowSize, 0);
 *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 *   pop();
 * }
 * </code>
 * </div>
 */
Vector.prototype.magSq = function magSq() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    return x * x + y * y + z * z;
};

/**
 * Normalize the vector to length 1 (make it a unit vector).
 *
 * @method normalize
 * @return {Vector} The normalized <a href="#/Vector">Vector</a>
 * @example
 * <div class="norender">
 * <code>
 * let v = createVector(10, 20, 2);
 * // v has components [10.0, 20.0, 2.0]
 * v.normalize();
 * // v's components are set to
 * // [0.4454354, 0.8908708, 0.089087084]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * // Static method
 * let v_initial = createVector(10, 20, 2);
 * // v_initial has components [10.0, 20.0, 2.0]
 * let v_normalized = Vector.normalize(v_initial);
 * print(v_normalized);
 * // returns a new vector with components set to
 * // [0.4454354, 0.8908708, 0.089087084]
 * // v_initial remains unchanged
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   background(240);
 *
 *   let v0 = createVector(50, 50);
 *   let v1 = createVector(mouseX - 50, mouseY - 50);
 *
 *   drawArrow(v0, v1, 'red');
 *   v1.normalize();
 *   drawArrow(v0, v1.mult(35), 'blue');
 *
 *   noFill();
 *   ellipse(50, 50, 35 * 2);
 * }
 *
 * // draw an arrow for a vector at a given base position
 * function drawArrow(base, vec, myColor) {
 *   push();
 *   stroke(myColor);
 *   strokeWeight(3);
 *   fill(myColor);
 *   translate(base.x, base.y);
 *   line(0, 0, vec.x, vec.y);
 *   rotate(vec.heading());
 *   let arrowSize = 7;
 *   translate(vec.mag() - arrowSize, 0);
 *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 *   pop();
 * }
 * </code>
 * </div>
 */
Vector.prototype.normalize = function normalize() {
    const len = this.mag();
    // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.
    if (len !== 0) this.mult(1 / len);
    return this;
};

/**
 * Set the magnitude of this vector to the value used for the `len`
 * parameter.
 *
 * @method setMag
 * @param  {number}    len The new length for this vector
 * @chainable
 * @example
 * <div class="norender">
 * <code>
 * let v = createVector(3, 4, 0);
 * // v has components [3.0, 4.0, 0.0]
 * v.setMag(10);
 * // v's components are set to [6.0, 8.0, 0.0]
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   background(240);
 *
 *   let v0 = createVector(0, 0);
 *   let v1 = createVector(50, 50);
 *
 *   drawArrow(v0, v1, 'red');
 *
 *   let length = map(mouseX, 0, width, 0, 141, true);
 *   v1.setMag(length);
 *   drawArrow(v0, v1, 'blue');
 *
 *   noStroke();
 *   text('magnitude set to: ' + length.toFixed(2), 10, 70, 90, 30);
 * }
 *
 * // draw an arrow for a vector at a given base position
 * function drawArrow(base, vec, myColor) {
 *   push();
 *   stroke(myColor);
 *   strokeWeight(3);
 *   fill(myColor);
 *   translate(base.x, base.y);
 *   line(0, 0, vec.x, vec.y);
 *   rotate(vec.heading());
 *   let arrowSize = 7;
 *   translate(vec.mag() - arrowSize, 0);
 *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 *   pop();
 * }
 * </code>
 * </div>
 */
Vector.prototype.setMag = function setMag(n) {
    return this.normalize().mult(n);
};

/**
 * Multiplies the vector by a scalar, multiplies the `x`, `y`, and `z` components from a vector, or multiplies
 * the `x`, `y`, and `z` components of two independent vectors. When multiplying a vector by a scalar, the `x`, `y`,
 * and `z` components of the vector are all multiplied by the scalar. When multiplying a vector by a vector,
 * the `x`, `y`, `z` components of both vectors are multiplied by each other
 * (for example, with two vectors `a` and `b`: `a.x * b.x`, `a.y * b.y`, `a.z * b.z`). The static version of this method
 * creates a new <a href="#/p5.Vector">p5.Vector</a> while the non-static version acts on the vector
 * directly. Additionally, you may provide arguments to this function as an array.
 * See the examples for more context.
 *
 * @method mult
 * @param  {Number} n The number to multiply with the vector
 * @chainable
 * @example
 * <div class="norender">
 * <code>
 * let v = createVector(1, 2, 3);
 * v.mult(2);
 * // v's components are set to [2, 4, 6]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * let v0 = createVector(1, 2, 3);
 * let v1 = createVector(2, 3, 4);
 * v0.mult(v1); // v0's components are set to [2, 6, 12]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * let v0 = createVector(1, 2, 3);
 * // Provide arguments as an array
 * let arr = [2, 3, 4];
 * v0.mult(arr); // v0's components are set to [2, 6, 12]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * let v0 = createVector(1, 2, 3);
 * let v1 = createVector(2, 3, 4);
 * const result = Vector.mult(v0, v1);
 * print(result); // result's components are set to [2, 6, 12]
 * </code>
 * </div>
 *
 * <div class="norender">
 * <code>
 * // Static method
 * let v1 = createVector(1, 2, 3);
 * let v2 = Vector.mult(v1, 2);
 * // v2 has components [2, 4, 6]
 * print(v2);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   background(240);
 *
 *   let v0 = createVector(50, 50);
 *   let v1 = createVector(25, -25);
 *   drawArrow(v0, v1, 'red');
 *
 *   let num = map(mouseX, 0, width, -2, 2, true);
 *   let v2 = Vector.mult(v1, num);
 *   drawArrow(v0, v2, 'blue');
 *
 *   noStroke();
 *   text('multiplied by ' + num.toFixed(2), 5, 90);
 * }
 *
 * // draw an arrow for a vector at a given base position
 * function drawArrow(base, vec, myColor) {
 *   push();
 *   stroke(myColor);
 *   strokeWeight(3);
 *   fill(myColor);
 *   translate(base.x, base.y);
 *   line(0, 0, vec.x, vec.y);
 *   rotate(vec.heading());
 *   let arrowSize = 7;
 *   translate(vec.mag() - arrowSize, 0);
 *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
 *   pop();
 * }
 * </code>
 * </div>
 */

/**
 * @method mult
 * @param  {Number} x The number to multiply with the x component of the vector
 * @param  {Number} y The number to multiply with the y component of the vector
 * @param  {Number} [z] The number to multiply with the z component of the vector
 * @chainable
 */

/**
 * @method mult
 * @param  {Number[]} arr The array to multiply with the components of the vector
 * @chainable
 */

/**
 * @method mult
 * @param  {p5.Vector} v The vector to multiply with the components of the original vector
 * @chainable
 */

Vector.prototype.mult = function mult(x, y, z) {
    if (x instanceof Vector) {
        // new p5.Vector will check that values are valid upon construction but it's possible
        // that someone could change the value of a component after creation, which is why we still
        // perform this check
        if (
            Number.isFinite(x.x) &&
            Number.isFinite(x.y) &&
            Number.isFinite(x.z) &&
            typeof x.x === 'number' &&
            typeof x.y === 'number' &&
            typeof x.z === 'number'
        ) {
            this.x *= x.x;
            this.y *= x.y;
            this.z *= x.z;
        } else {
            console.warn(
                'Vector.mult:',
                'x contains components that are either undefined or not finite numbers'
            );
        }
        return this;
    }
    if (x instanceof Array) {
        if (
            x.every(element => Number.isFinite(element)) &&
            x.every(element => typeof element === 'number')
        ) {
            if (x.length === 1) {
                this.x *= x[0];
                this.y *= x[0];
                this.z *= x[0];
            } else if (x.length === 2) {
                this.x *= x[0];
                this.y *= x[1];
            } else if (x.length === 3) {
                this.x *= x[0];
                this.y *= x[1];
                this.z *= x[2];
            }
        } else {
            console.warn(
                'Vector.mult:',
                'x contains elements that are either undefined or not finite numbers'
            );
        }
        return this;
    }

    const vectorComponents = [...arguments];
    if (
        vectorComponents.every(element => Number.isFinite(element)) &&
        vectorComponents.every(element => typeof element === 'number')
    ) {
        if (arguments.length === 1) {
            this.x *= x;
            this.y *= x;
            this.z *= x;
        }
        if (arguments.length === 2) {
            this.x *= x;
            this.y *= y;
        }
        if (arguments.length === 3) {
            this.x *= x;
            this.y *= y;
            this.z *= z;
        }
    } else {
        console.warn(
            'Vector.mult:',
            'x, y, or z arguments are either undefined or not a finite number'
        );
    }

    return this;
};

Vector.prototype.limit = function limit(max) {
    const mSq = this.magSq();
    if (mSq > max * max) {
        this.div(Math.sqrt(mSq)) //normalize it
            .mult(max);
    }
    return this;
};

Vector.prototype.div = function div(x, y, z) {
    if (x instanceof p5.Vector) {
        // new p5.Vector will check that values are valid upon construction but it's possible
        // that someone could change the value of a component after creation, which is why we still
        // perform this check
        if (
            Number.isFinite(x.x) &&
            Number.isFinite(x.y) &&
            Number.isFinite(x.z) &&
            typeof x.x === 'number' &&
            typeof x.y === 'number' &&
            typeof x.z === 'number'
        ) {
            const isLikely2D = x.z === 0 && this.z === 0;
            if (x.x === 0 || x.y === 0 || (!isLikely2D && x.z === 0)) {
                console.warn('p5.Vector.prototype.div:', 'divide by 0');
                return this;
            }
            this.x /= x.x;
            this.y /= x.y;
            if (!isLikely2D) {
                this.z /= x.z;
            }
        } else {
            console.warn(
                'p5.Vector.prototype.div:',
                'x contains components that are either undefined or not finite numbers'
            );
        }
        return this;
    }
    if (x instanceof Array) {
        if (
            x.every(element => Number.isFinite(element)) &&
            x.every(element => typeof element === 'number')
        ) {
            if (x.some(element => element === 0)) {
                console.warn('p5.Vector.prototype.div:', 'divide by 0');
                return this;
            }

            if (x.length === 1) {
                this.x /= x[0];
                this.y /= x[0];
                this.z /= x[0];
            } else if (x.length === 2) {
                this.x /= x[0];
                this.y /= x[1];
            } else if (x.length === 3) {
                this.x /= x[0];
                this.y /= x[1];
                this.z /= x[2];
            }
        } else {
            console.warn(
                'p5.Vector.prototype.div:',
                'x contains components that are either undefined or not finite numbers'
            );
        }

        return this;
    }

    const vectorComponents = [...arguments];
    if (
        vectorComponents.every(element => Number.isFinite(element)) &&
        vectorComponents.every(element => typeof element === 'number')
    ) {
        if (vectorComponents.some(element => element === 0)) {
            console.warn('p5.Vector.prototype.div:', 'divide by 0');
            return this;
        }

        if (arguments.length === 1) {
            this.x /= x;
            this.y /= x;
            this.z /= x;
        }
        if (arguments.length === 2) {
            this.x /= x;
            this.y /= y;
        }
        if (arguments.length === 3) {
            this.x /= x;
            this.y /= y;
            this.z /= z;
        }
    } else {
        console.warn(
            'p5.Vector.prototype.div:',
            'x, y, or z arguments are either undefined or not a finite number'
        );
    }

    return this;
};

exports.p5Vector = Vector;
