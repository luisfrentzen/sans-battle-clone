const c = document.getElementById("canv");
const ctx = c.getContext("2d");

var p = new Player(10, 10, 10);
const dpi = window.devicePixelRatio;

function fixDpi() {
  let style = {
    height() {
      return +getComputedStyle(c).getPropertyValue("height").slice(0, -2);
    },
    width() {
      return +getComputedStyle(c).getPropertyValue("width").slice(0, -2);
    },
  };
  console.log(style.width(), style.height());
  c.setAttribute("width", style.width() * dpi);
  c.setAttribute("height", style.height() * dpi);
}

var arenaWitdh = 412;
var arenaHeigth = 144;

fixDpi();
function render() {
  clearFrame();
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = "5";
  ctx.rect(
    c.width / 2 - arenaWitdh / 2,
    c.height / 2 - arenaHeigth / 2,
    arenaWitdh,
    arenaHeigth
  );
  ctx.stroke();

  if (arenaWitdh < 512) {
    // arenaWitdh -= 1;
  }

  requestAnimationFrame(render);
}

function clearFrame() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.restore();
}

requestAnimationFrame(render);
