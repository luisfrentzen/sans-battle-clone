const c = document.getElementById("canv");

var p = new Player(10, 10, 10);
const dpi = window.devicePixelRatio;

function prepCanvas(canvas) {
  let winHeight = window.innerHeight;
  let winWidth = window.innerWidth;

  canvas.width = winWidth;
  canvas.height = winHeight;
  console.log(canvas.width)
  console.log(canvas.height)
  
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

const ctx = prepCanvas(c);
// const ctx = c.getContext("2d");

var arenaWitdh = 412;
var arenaHeigth = 144;

var combatZoneTexture = new Image();
combatZoneTexture.src = "../textures/HPBackground.png"

function render() {
  // fixDpi();
  clearFrame();
  
    // arenaWitdh -= 1;
  combatZoneFill = ctx.createPattern(combatZoneTexture, "repeat");
  // console.log(combatZoneFill)
  ctx.strokeStyle = combatZoneFill;
  ctx.lineWidth = "8";
  ctx.strokeRect(20, 20, c.width - 40, 200);
  requestAnimationFrame(render);
}

function clearFrame() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
}

requestAnimationFrame(render);
