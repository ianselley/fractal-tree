class Branch {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.left = undefined;
    this.right = undefined;
    this.angleChange = sliderAngle.value();
    this.tableOfChanges = {
      0: this.angleChange,
      1:
        cos(
          this.angle *
            cos(this.angle / cos(this.angleChange)) *
            cos(this.angleChange)
        ) /
        cos(cos(this.angle / cos(this.angleChange)) * cos(this.angleChange)), // Makes it shake
      2:
        (sin(sin(this.angleChange)) * cos(cos(this.angleChange))) /
        cos(cos(this.angle)),
      3: sin(cos(this.angleChange)) / cos(sin(this.angle)),
      4:
        sin(this.angleChange) == 0
          ? 0
          : sin(this.angle / sin(this.angleChange)) * cos(this.angleChange),
      5: cos(this.angle / cos(this.angleChange)) * cos(this.angleChange),
      6: cos(this.angle * this.angleChange) / cos(this.angleChange), // Makes it look alive
      7:
        cos(cos(this.angle * this.angleChange) / cos(this.angleChange)) *
        sin(this.angle),
      8:
        this.angleChange == 0
          ? 0
          : cos(this.angle / this.angleChange) * sin(this.angleChange), // Creates "wavey" patterns
      9: this.angle * cos(this.angleChange) * tan(this.angle), // Sometimes Creates "dresses" and "lamps"
      10: sin(this.angleChange) / sin(this.angle),
      11: cos(this.angleChange) * sin(this.angle),
      12: this.angleChange * sin(this.angle),
      13:
        cos(
          this.angle *
            cos(this.angle / cos(this.angleChange)) *
            cos(this.angleChange)
        ) * cos(this.angle * log(this.angleChange + 9)),
      14: cos(this.angle + this.angleChange) * sin(this.angleChange),
      15:
        this.angleChange == 0
          ? 0
          : cos(this.angle - this.angleChange) / sin(this.angleChange / 2),
    };
  }
  get vector() {
    return this.start.vectorTo(this.end);
  }
  get angle() {
    return this.vector.angle;
  }
  get options() {
    return Object.keys(this.tableOfChanges).length;
  }
  draw() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
  createBranches() {
    this.angleChange = sliderAngle.value();
    const modeValue = mode.value();
    const ratio = sliderRatio.value();

    this.angleChange = modeValue
      ? this.tableOfChanges[modeValue]
      : this.angleChange;

    const leftVector = this.vector.rotate(this.angleChange).mult(ratio);
    const rightVector = this.vector.rotate(-this.angleChange).mult(ratio);
    const leftEnd = this.end.addVector(leftVector);
    const rightEnd = this.end.addVector(rightVector);
    this.left = new Branch(this.end, leftEnd);
    this.right = new Branch(this.end, rightEnd);
    this.left.draw();
    this.right.draw();
  }
}
