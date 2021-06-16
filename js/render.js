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

const arenaWitdh = 150;
const arenaHeigth = 150;

const dpr = Math.ceil(window.devicePixelRatio);
const c = prepCanvas(document.getElementById("canv"));
const ctx = c.getContext("2d");

const p = new Player(0, 0);
p.x = parseInt(c.style.width, 10) / 2 - p.boundingBoxWidth / 2;
p.y = parseInt(c.style.height, 10) * (4 / 6);

const arena = new Arena(arenaWitdh, arenaHeigth);

function render() {
  clearFrame();

  p.render(ctx);
  arena.render(ctx);
  requestAnimationFrame(render);
}

function clearFrame() {
  ctx.save();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
}

requestAnimationFrame(render);
