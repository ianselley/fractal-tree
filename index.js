const truncLength = 100;
const startingPointY = 100;
let branch;
let sliderAngle;
let sliderRatio;
let mode;
let hasTrunc;

function setup() {
  createCanvas(1000, 700);
  stroke(255);
  sliderAngle = createSlider(0, 2 * PI, PI / 8, 0);
  sliderAngle.size(800);
  createSpan("Change the angle");
  sliderRatio = createSlider(0, 0.85, 0.75, 0.001);
  sliderRatio.size(800);
  createSpan("Change the length");
  mode = createRadio();
  createSpan(
    "Change between diferent ways of calculating the effect in the change of angle"
  );
  for (let i = 0; i < 13; i++) {
    mode.option(i);
  }
  hasTrunc = createCheckbox("Trunc", true);
  const start = new Point(0, startingPointY);
  const end = new Point(0, startingPointY + truncLength);
  branch = new Branch(start, end);
}

function predraw() {
  translate(width / 2, height);
  scale(1, -1);
}

function draw() {
  background(37);
  predraw();
  if (hasTrunc.checked()) {
    branch.grow(); // You can show the trunc if you want
  }
  branch.createBranches(mode.value(), sliderAngle.value(), sliderRatio.value());
  bfs(branch);
}

function bfs(branch) {
  if (branch.vector.mod < 14) {
    return;
  }
  branch.left.createBranches(
    mode.value(),
    sliderAngle.value(),
    sliderRatio.value()
  );
  branch.right.createBranches(
    mode.value(),
    sliderAngle.value(),
    sliderRatio.value()
  );
  branch.left.grow();
  branch.right.grow();
  bfs(branch.left);
  bfs(branch.right);
}
