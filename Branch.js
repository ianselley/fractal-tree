class Branch {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.left = undefined;
    this.right = undefined;
  }
  get vector() {
    return this.start.vectorTo(this.end);
  }
  get angle() {
    return this.vector.angle;
  }
  grow() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
  createBranches(mode, angleChange = PI / 8, ratio = 0.8) {
    switch (mode) {
      case "1":
        angleChange =
          cos(
            this.angle * cos(this.angle / cos(angleChange)) * cos(angleChange)
          ) / cos(cos(this.angle / cos(angleChange)) * cos(angleChange)); // Makes it shake
        break;

      case "2":
        angleChange =
          (sin(sin(angleChange)) * cos(cos(angleChange))) /
          cos(cos(this.angle));
        break;

      case "3":
        angleChange = sin(cos(angleChange)) / cos(sin(this.angle));
        break;

      case "4":
        angleChange = sin(this.angle / sin(angleChange)) * cos(angleChange);
        break;

      case "5":
        angleChange = cos(this.angle / cos(angleChange)) * cos(angleChange);
        break;

      case "6":
        angleChange = cos(this.angle * angleChange) / cos(angleChange); // Makes it look alive
        break;

      case "7":
        angleChange =
          cos(cos(this.angle * angleChange) / cos(angleChange)) *
          sin(this.angle);
        break;

      case "8":
        angleChange =
          angleChange === 0
            ? 0
            : cos(this.angle / angleChange) * sin(angleChange); // Creates "wavey" patterns
        break;

      case "9":
        angleChange = this.angle * cos(angleChange) * tan(this.angle); // Creates "dresses" and "lamps"
        break;

      case "10":
        angleChange = sin(angleChange) / sin(this.angle);
        break;

      case "11":
        angleChange = cos(angleChange) * sin(this.angle);
        break;

      case "12":
        angleChange = angleChange * sin(this.angle);
        break;
    }

    const leftVector = this.vector.rotate(angleChange).mult(ratio);
    const rightVector = this.vector.rotate(-angleChange).mult(ratio);
    const leftEnd = this.end.addVector(leftVector);
    const rightEnd = this.end.addVector(rightVector);
    this.left = new Branch(this.end, leftEnd);
    this.right = new Branch(this.end, rightEnd);
    this.left.grow();
    this.right.grow();
  }
}
