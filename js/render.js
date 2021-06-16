const red = "#c70021";
const blue = "#2000bf";

function prepCanvas(canvas, width = 800, height = 600) {
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  canvas.height = height * dpr;
  canvas.width = width * dpr;

  canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);

  console.log(canvas.getContext("2d").canvas.width, canvas.width);

  return canvas;
}

const dirVector = {
  UP: 0,
  DOWN: 0,
  RIGHT: 0,
  LEFT: 0,
};

function onKeyUp(e) {
  var k = e.keyCode;
  switch (k) {
    case 37:
      dirVector.LEFT = 0;
      break;
    case 39:
      dirVector.RIGHT = 0;
      break;
    case 38:
      dirVector.UP = 0;
      break;
    case 40:
      dirVector.DOWN = 0;
      break;
    default:
  }
}

function onKeyDown(e) {
  var k = e.keyCode;
  switch (k) {
    case 37:
      dirVector.LEFT = 1;
      break;
    case 39:
      dirVector.RIGHT = 1;
      break;
    case 38:
      dirVector.UP = 1;
      break;
    case 40:
      dirVector.DOWN = 1;
      break;
    default:
  }
}

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

const arenaWitdh = 150;
const arenaHeigth = 150;

const dpr = Math.ceil(window.devicePixelRatio);
const c = prepCanvas(document.getElementById("canv"));
const ctx = c.getContext("2d");

const p = new Player(0, 0);
p.x = parseInt(c.style.width, 10) / 2 - p.boundingBoxWidth / 2;
p.y = parseInt(c.style.height, 10) * (4 / 6);

const arena = new Arena(arenaWitdh, arenaHeigth);

function checkCombatBoundary(p, dirVector) {
  if (p.x + p.boundingBoxWidth >= arena.x + arena.width - arena.borderWidth) {
    dirVector.RIGHT = 0;
  }
  if (p.x <= arena.x + arena.borderWidth) {
    dirVector.LEFT = 0;
  }
  if (p.y + p.boundingBoxHeight >= arena.y + arena.height - arena.borderWidth) {
    dirVector.DOWN = 0;
  }
  if (p.y <= arena.y + arena.borderWidth) {
    dirVector.UP = 0;
  }
}

function gameLoop() {
  clearFrame();

  checkCombatBoundary(p, dirVector);
  p.move(dirVector);

  render();

  requestAnimationFrame(gameLoop);
}

function render() {
  p.render(ctx);
  arena.render(ctx);
}

function clearFrame() {
  ctx.save();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
}

requestAnimationFrame(gameLoop);
