window.onload = main;

const SHAKE_LENGTH = 8;
const DEFAULT_WARNING_H = 30;

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

  // console.log(canvas.getContext("2d").canvas.width, canvas.width);
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
      if (!inMenu) {
        if (p.orientation == 3 && p.mode == 1) {
          p.jump();
        } else {
          dirVector[1] = 1;
          p.move(dirVector);
        }
      } else {
        activeMenu = activeMenu - 1 < 0 ? 0 : activeMenu - 1;
      }

      break;
    case 39:
      if (!inMenu) {
        if (p.orientation == 1 && p.mode == 1) {
          p.jump();
        } else {
          dirVector[3] = 1;
          p.move(dirVector);
        }
      } else {
        activeMenu = activeMenu + 1 > 3 ? 3 : activeMenu + 1;
      }

      break;
    case 38:
      if (!inMenu) {
        if (p.orientation == 0 && p.mode == 1) {
          p.jump();
        } else {
          dirVector[2] = 1;
          p.move(dirVector);
        }
      }

      break;
    case 40:
      if (!inMenu) {
        if (p.orientation == 2 && p.mode == 1) {
          p.jump();
        } else {
          dirVector[0] = 1;
          p.move(dirVector);
        }
      }

      break;
    case 13:
      if (showDialog) {
        menuSelectSound.pause();
        menuSelectSound.currentTime = 0;
        menuSelectSound.play();
        showDialog = false;
        dialogToRender.pop();
        playerAttack();
      }
      if (isPlayerAttacking) {
        playAttackAnimation();
      }
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

var targetTexture = {};
var attackAnimationFrames = [];

var attackTargetFrames = [];

var isPlayerAttacking = false;

var uiActFrames = [];
var uiFightFrames = [];
var uiItemFrames = [];
var uiMercyFrames = [];

var bgMusic = {};
var slamSound = {};
var bonestabSound = {};
var warningSound = {};
var menuSelectSound = {};

var gasterList = [];

var inGame = false;

var inMenu = false;
var activeMenu = 0;
var showDialog = false;
var dialogCharAt = 1;
var dialogFx = {};

var attackCursorPos = 0;

var stringPool =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function renderDamageFont(x, y, ctx, str, scale = 0.75) {
  let spritesheet = document.getElementById("damage-font");

  let offset = 0;

  [...str].forEach((c, i) => {
    let idx = stringPool.indexOf(c);
    let x_mapped = idx % 16;
    let y_mapped = Math.floor(idx / 16);

    ctx.drawImage(
      spritesheet,
      33 * x_mapped,
      32 * y_mapped,
      33,
      32,
      x + offset,
      y,
      33 * scale,
      32 * scale
    );

    offset += ("!\"'()1[]`iIj|".includes(c) ? 24 : 32) * scale;
  });
}

function renderBasicFont(x, y, ctx, str, scale = 1.75) {
  let spritesheet = document.getElementById("basic-font");

  let offset = 0;
  let enter = 0;

  [...str].forEach((c) => {
    if (c == "^") {
      enter += 16 * scale;
      offset = 0;
      return;
    }

    let idx = stringPool.indexOf(c);
    let x_mapped = idx % 16;
    let y_mapped = Math.floor(idx / 16);

    ctx.drawImage(
      spritesheet,
      10 * x_mapped,
      16 * y_mapped,
      10,
      16,
      x + offset,
      y + enter,
      10 * scale,
      16 * scale
    );

    offset += 8 * scale;
  });
}

function renderBattleFont(x, y, ctx, str, scale = 2.5) {
  let spritesheet = document.getElementById("battle-font");

  let offset = 0;

  [...str].forEach((c) => {
    let idx = stringPool.indexOf(c.toUpperCase());
    let x_mapped = idx % 16;
    let y_mapped = Math.floor(idx / 16);

    ctx.drawImage(
      spritesheet,
      6 * x_mapped,
      6 * y_mapped,
      6,
      6,
      x + offset,
      y,
      6 * scale,
      6 * scale
    );

    offset += 5 * scale;
  });
}

function initGame() {
  inGame = false;

  dpr = Math.ceil(window.devicePixelRatio);
  c = prepCanvas(document.getElementById("canv"), 600, 450);
  ctx = c.getContext("2d");

  bgMusic = document.getElementById("bg-music");
  slamSound = document.getElementById("slam-sound");
  bonestabSound = document.getElementById("bone-stab-sound");
  warningSound = document.getElementById("warning-sound");
  dialogFx = document.getElementById("battle-text-sound");
  menuSelectSound = document.getElementById("menu-select-sound");

  uiActFrames = [...document.getElementsByClassName("act-ui")];
  uiMercyFrames = [...document.getElementsByClassName("mercy-ui")];
  uiFightFrames = [...document.getElementsByClassName("fight-ui")];
  uiItemFrames = [...document.getElementsByClassName("item-ui")];

  targetTexture = document.getElementById("target");

  attackAnimationFrames = document.getElementById("attack-swipe");
  attackTargetFrames = [...document.getElementsByClassName("attack-pointer")];

  actCanvWidth = parseInt(c.style.width, 10);
  actCanvHeight = parseInt(c.style.height, 10);

  p = new Player(0, 0);
  p.x = actCanvWidth / 2 - p.boundingBoxWidth / 2;
  p.y = actCanvHeight * (4 / 6);

  arenaWidth = 150;
  arenaHeigth = 150;
  arena = new Arena(arenaWidth, arenaHeigth);

  sans = new Sans(0, 0);
}

function addVerticalBones(x, y, h, v) {
  hostileAreas.push(new VerticalBone(x, y, h, v));
}

function addHorizontalBones(x, y, w, v) {
  hostileAreas.push(new HorizontalBone(x, y, w, v));
}

function addHorizontalBoneStreak(x, y, w, n, bound, hold = 30, v = 10) {
  hostileAreas.push(new HorizontalBoneStreak(x, y, w, v, n, bound, hold));
}

function addVerticallBoneStreak(x, y, h, n, bound, hold = 30, v = 10) {
  hostileAreas.push(new VerticalBoneStreak(x, y, h, v, n, bound, hold));
}

function addWarningAreas(arena, dir, h) {
  warningAreas.push(new WarningArea(arena, dir, h));
}

function hostileDestroyerFilter(arena) {
  return function (e) {
    if (
      (e.x < -300 || e.x > arena.x + actCanvWidth + 300) &&
      e.readyToDestroy
    ) {
      return false;
    }

    if (
      (e.y < -300 || e.y > arena.y + actCanvHeight + 300) &&
      e.readyToDestroy
    ) {
      return false;
    }

    return true;
  };
}

function destroyHostileObjects(arena) {
  hostileAreas = hostileAreas.filter(hostileDestroyerFilter(arena));
  gasterList = gasterList.filter(hostileDestroyerFilter(arena));
}

function renderHostiles(ctx) {
  hostileAreas.forEach((hostiles) => {
    hostiles.render(ctx);
  });
}

function renderGasters(ctx) {
  gasterList.forEach((gaster) => {
    gaster.render(ctx);
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

  gasterList.forEach((gaster) => {
    if (gaster.gasterBlast.length > 0) {
      if (gaster.gasterBlast[0].isColliding(p)) {
        console.count("collide");
        return;
      }
    }
  });
}

function gameLoop(now) {
  clearFrame();
  render(now);
  checkCollideWithHostiles();
  destroyHostileObjects(arena);
  requestAnimationFrame(gameLoop);
}

function render(now) {
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
  maskArena();
  sans.render(ctx);
  renderMisc(ctx);
  renderGasters(ctx);
  renderDialog(ctx, now);
}

var dialogToRender = [];
var lastCharacterTime = 0;

function addDialog(str) {
  showDialog = true;
  dialogCharAt = 0;
  dialogToRender.unshift(str);
}

function renderDialog(ctx, now) {
  if (!showDialog) return;
  renderBasicFont(arena.x + 15, arena.y + 15, ctx, "*", 1.75);

  renderBasicFont(
    arena.x + 45,
    arena.y + 15,
    ctx,
    dialogToRender[0].slice(0, dialogCharAt),
    1.75
  );

  if (
    dialogCharAt < dialogToRender[0].length &&
    now - lastCharacterTime >= 35
  ) {
    dialogCharAt++;
    dialogFx.pause();
    dialogFx.currentTime = 0;
    dialogFx.play();
    lastCharacterTime = now;
  }
}

function renderMisc(ctx) {
  renderBattleFont(17.5, 372, ctx, "poni");
  renderBattleFont(100, 372, ctx, "lv 26");

  let gap = (560 - uiFightFrames[0].width * 4) / 3;
  let offset = uiFightFrames[0].width + gap;

  ctx.drawImage(
    inMenu && activeMenu == 0 ? uiFightFrames[1] : uiFightFrames[0],
    17.5,
    400
  );
  ctx.drawImage(
    inMenu && activeMenu == 1 ? uiActFrames[1] : uiActFrames[0],
    17.5 + offset * 1,
    400
  );
  ctx.drawImage(
    inMenu && activeMenu == 2 ? uiItemFrames[1] : uiItemFrames[0],
    17.5 + offset * 2,
    400
  );
  ctx.drawImage(
    inMenu && activeMenu == 3 ? uiMercyFrames[1] : uiMercyFrames[0],
    17.5 + offset * 3,
    400
  );

  if (isPlayerAttacking) {
    ctx.drawImage(
      targetTexture,
      arena.x + arena.currentWidth / 2 - targetTexture.width / 2,
      arena.y + arena.currentHeight / 2 - targetTexture.height / 2
    );
  }
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
  ctx.rect(
    actCanvWidth,
    actCanvHeight - (inMenu ? 50 : 0),
    -actCanvWidth,
    -actCanvHeight + (inMenu ? 50 : 0)
  );
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
