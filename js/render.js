window.onload = main;

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
    case 32:
      if (!inGame) {
        inGame = true;
        bgMusic.play();
        requestAnimationFrame(gameLoop);
      }
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

var arenaWidth = 0,
  arenaHeigth = 0;
var dpr = 0,
  c = {},
  ctx = {};
var p = {},
  arena = {},
  sans = {};
var actCanvHeight = 0,
  actCanvWidth = 0;
var hostileAreas = [];
var bgMusic = {};

var inGame = false;

function initGame() {
  inGame = true;

  dpr = Math.ceil(window.devicePixelRatio);
  c = prepCanvas(document.getElementById("canv"));
  ctx = c.getContext("2d");

  bgMusic = document.getElementById("bg-music");

  actCanvWidth = parseInt(c.style.width, 10);
  actCanvHeight = parseInt(c.style.height, 10);

  p = new Player(0, 0);
  p.x = actCanvWidth / 2 - p.boundingBoxWidth / 2;
  p.y = actCanvHeight * (4 / 6);

  arenaWidth = 150;
  arenaHeigth = 150;
  arena = new Arena(arenaWidth, arenaHeigth);

  sans = new Sans(0, 0);
  sans.x = actCanvWidth / 2 - sans.width / 2;
  sans.y = arena.y - arena.currentHeight - 8;
}

function addVerticalBones(x, y, h) {
  hostileAreas.push(new VerticalBone(x, y, h));
}

function addHorizontalBones(x, y, w) {
  hostileAreas.push(new HorizontalBone(x, y, w));
}

function renderHostiles(ctx) {
  hostileAreas.forEach((hostiles) => {
    hostiles.render(ctx);
  });
}

function checkCollideWithHostiles() {
  hostileAreas.forEach((hostiles) => {
    if (hostiles.isColliding(p)) {
      console.log("collided");
      return;
    }
  });
}

function gameLoop() {
  clearFrame();
  render();
  checkCollideWithHostiles();
  requestAnimationFrame(gameLoop);
}

function render() {
  ctx.imageSmoothingEnabled = false;
  p.render(ctx, arena);
  arena.render(ctx);
  renderHostiles(ctx);
  maskArena();
  sans.render(ctx);
}

function maskArena() {
  let maskX = actCanvWidth / 2 - arena.currentWidth / 2;
  let maskY = actCanvHeight * (4 / 5) + arena.borderWidth;

  ctx.beginPath();
  ctx.rect(
    maskX - arena.borderWidth / 2,
    maskY - arena.borderWidth / 2,
    arena.currentWidth + arena.borderWidth,
    -(arena.currentHeight + arena.borderWidth)
  );
  ctx.rect(actCanvWidth, actCanvHeight, -actCanvWidth, -actCanvHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function clearFrame() {
  ctx.save();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
}

function main() {
  initGame();
  requestAnimationFrame(gameLoop);
}
