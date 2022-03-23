class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  lengthTo(point) {
    return dist(this.x, this.y, point.x, point.y);
  }
  vectorTo(point) {
    const i = point.x - this.x;
    const j = point.y - this.y;
    return new Vector(i, j);
  }
  addVector(vector) {
    const x = this.x + vector.i;
    const y = this.y + vector.j;
    return new Point(x, y);
  }
}
