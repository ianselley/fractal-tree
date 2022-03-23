class Vector {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }
  mult(scalar) {
    return new Vector(this.i * scalar, this.j * scalar);
  }
  get mod() {
    return sqrt(this.i ** 2 + this.j ** 2);
  }
  get angle() {
    return atan2(this.j, this.i);
  }
  rotate(alpha) {
    const theta = this.angle + alpha;
    const newI = this.mod * cos(theta);
    const newJ = this.mod * sin(theta);
    return new Vector(newI, newJ);
  }
}
