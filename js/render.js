window.onload = main;

const SHAKE_LENGTH = 8;

const red = "#c70021";
const blue = "#2000bf";

function zip(arrays) {
  return arrays[0].map(function (_, i) {
    return arrays.map(function (array) {
      return array[i];
    });
  });
}

function prepCanvas(canvas, width = 800, height = 600) {
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  canvas.height = height * dpr;
  canvas.width = width * dpr;

  canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);

  console.log(canvas.getContext("2d").canvas.width, canvas.width);

  return canvas;
}

const dirVector = [0, 0, 0, 0];

function onKeyUp(e) {
  var k = e.keyCode;
  switch (k) {
    case 37:
      dirVector[1] = 0;
      p.move(dirVector);
      break;
    case 39:
      dirVector[3] = 0;
      p.move(dirVector);
      break;
    case 38:
      dirVector[2] = 0;
      p.move(dirVector);
      break;
    case 40:
      dirVector[0] = 0;
      p.move(dirVector);
      break;
    case 32:
      if (!inGame) {
        inGame = true;
        bgMusic.play();
        requestAnimationFrame(gameLoop);
      }
      break;
    default:
  }

  if (p.isJumping) {
    p.isJumping = false;
    p.velocity[p.orientation] = 0;
  }
}

function onKeyDown(e) {
  var k = e.keyCode;
  switch (k) {
    case 37:
      if (p.orientation == 3 && p.mode == 1) {
        p.jump();
      } else {
        dirVector[1] = 1;
        p.move(dirVector);
      }

      break;
    case 39:
      if (p.orientation == 1 && p.mode == 1) {
        p.jump();
      } else {
        dirVector[3] = 1;
        p.move(dirVector);
      }

      break;
    case 38:
      if (p.orientation == 0 && p.mode == 1) {
        p.jump();
      } else {
        dirVector[2] = 1;
        p.move(dirVector);
      }

      break;
    case 40:
      if (p.orientation == 2 && p.mode == 1) {
        p.jump();
      } else {
        dirVector[0] = 1;
        p.move(dirVector);
      }

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
var shakeFrames = [];
var warningAreas = [];

var bgMusic = {};
var slamSound = {};
var bonestabSound = {};
var warningSound = {};

var inGame = false;

function initGame() {
  inGame = true;

  dpr = Math.ceil(window.devicePixelRatio);
  c = prepCanvas(document.getElementById("canv"));
  ctx = c.getContext("2d");

  bgMusic = document.getElementById("bg-music");
  slamSound = document.getElementById("slam-sound");
  bonestabSound = document.getElementById("bone-stab-sound");
  warningSound = document.getElementById("warning-sound");

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

function addVerticalBones(x, y, h, v) {
  hostileAreas.push(new VerticalBone(x, y, h, v));
}

function addHorizontalBones(x, y, w, v) {
  hostileAreas.push(new HorizontalBone(x, y, w, v));
}

function addWarningAreas(arena, dir, h) {
  warningAreas.push(new WarningArea(arena, dir, h));
}

function destroyHostileObjects(arena) {
  hostileAreas = hostileAreas.filter((e) => {
    if (e.x < arena.x - 100 || e.x > arena.x + arena.currentWidth + 100) {
      return false;
    }

    if (e.y < arena.y - 100 || e.y > arena.y + arena.currentHeight + 100) {
      return false;
    }

    return true;
  });
}

function renderHostiles(ctx) {
  hostileAreas.forEach((hostiles) => {
    hostiles.render(ctx);
  });
}

function renderWarnings(ctx) {
  warningAreas.forEach((warn) => {
    warn.render(ctx);
  });
}

function checkCollideWithHostiles() {
  hostileAreas.forEach((hostiles) => {
    if (hostiles.isColliding(p)) {
      return;
    }
  });
}

function gameLoop(now) {
  clearFrame();
  render();
  checkCollideWithHostiles();
  destroyHostileObjects(arena);
  requestAnimationFrame(gameLoop);
}

function render() {
  ctx.imageSmoothingEnabled = false;

  if (shakeFrames.length != 0) {
    ctx.translate(shakeFrames[0][0], shakeFrames[0][1]);
    shakeFrames.shift();

    if (shakeFrames.length == 0) ctx.restore();
  }

  p.render(ctx, arena);
  arena.render(ctx);
  renderWarnings(ctx);

  renderHostiles(ctx);
  // maskArena();
  sans.render(ctx);
}

function addShakeValues(val) {
  val.forEach((e) => {
    shakeFrames.push(e);
  });
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
