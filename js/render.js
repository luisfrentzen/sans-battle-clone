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
      p.move(dirVector);
      break;
    case 39:
      dirVector.RIGHT = 0;
      p.move(dirVector);
      break;
    case 38:
      dirVector.UP = 0;
      p.move(dirVector);
      if (p.isJumping) {
        p.isJumping = false;
        p.velY = 0;
      }
      break;
    case 40:
      dirVector.DOWN = 0;
      p.move(dirVector);
      break;
    default:
  }
}

function onKeyDown(e) {
  var k = e.keyCode;
  switch (k) {
    case 37:
      dirVector.LEFT = 1;
      p.move(dirVector);
      break;
    case 39:
      dirVector.RIGHT = 1;
      p.move(dirVector);
      break;
    case 38:
      if (p.mode == 0) {
        dirVector.UP = 1;
        p.move(dirVector);
      } else {
        p.jump();
      }
      break;
    case 40:
      dirVector.DOWN = 1;
      p.move(dirVector);
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

function gameLoop() {
  clearFrame();
  render();

  requestAnimationFrame(gameLoop);
}

function render() {
  p.render(ctx, arena);
  arena.render(ctx);
}

function clearFrame() {
  ctx.save();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
}

requestAnimationFrame(gameLoop);
