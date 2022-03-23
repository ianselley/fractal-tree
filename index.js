const truncLength = 100;
const startingPointY = 100;
let branch, sliderAngle, sliderRatio, mode, hasTrunc, start, end;

function settings() {
  sliderAngle = createSlider(0, 2 * PI, PI / 8, 0);
  sliderAngle.size(800);
  createSpan("Change the angle");
  sliderRatio = createSlider(0, 0.85, 0.75, 0.001);
  sliderRatio.size(800);
  createSpan("Change the length");
  mode = createRadio();
  createSpan(
    "Change between diferent ways of calculating the effect of changing the angle"
  );
}

function setup() {
  createCanvas(1000, 700);
  stroke(255);
  settings();
  start = new Point(0, startingPointY);
  end = new Point(0, startingPointY + truncLength);
  branch = new Branch(start, end);
  for (let i = 0; i < branch.options; i++) {
    mode.option(i);
  }
  hasTrunc = createCheckbox("Trunc", true);
}

function predraw() {
  translate(width / 2, height);
  scale(1, -1);
}

function draw() {
  background(37);
  predraw();
  branch = new Branch(start, end);
  if (hasTrunc.checked()) {
    branch.draw();
  }
  branch.createBranches();
  branch.angleChange = sliderAngle.value();
  bfs(branch);
}

function bfs(branch) {
  if (branch.vector.mod < 14) {
    return;
  }
  branch.left.createBranches();
  branch.right.createBranches();
  branch.left.draw();
  branch.right.draw();
  bfs(branch.left);
  bfs(branch.right);
}
