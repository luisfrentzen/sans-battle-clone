class Arena {
  constructor(width, height) {
    this.resizeSpeed = 16;

    this.width = width + (this.resizeSpeed - (width % this.resizeSpeed));
    this.height = height + (this.resizeSpeed - (height % this.resizeSpeed));
    this.currentWidth = this.width;
    this.currentHeight = this.height;

    this.borderWidth = 4;
    this.texture = new Image();
    this.texture.src = "../textures/CombatZoneUnclipper.png";

    this.xResizeValue = this.resizeSpeed;
    this.yResizeValue = this.resizeSpeed;

    this.x = 0;
    this.y = 0;
  }

  resize(width, height) {
    width = width + (this.resizeSpeed - (width % this.resizeSpeed));
    height = height + (this.resizeSpeed - (height % this.resizeSpeed));

    this.xResizeValue =
      width > this.width ? this.resizeSpeed : -Math.abs(this.resizeSpeed);
    this.yResizeValue =
      height > this.height ? this.resizeSpeed : -Math.abs(this.resizeSpeed);

    this.width = width;
    this.height = height;
  }

  render(ctx) {
    var x = parseInt(ctx.canvas.style.width, 10) / 2 - this.currentWidth / 2;
    var y = parseInt(ctx.canvas.style.height, 10) * (4 / 5);

    this.x = x;
    this.y = y - this.currentHeight;

    if (this.currentWidth != this.width) {
      this.currentWidth += this.xResizeValue;
      console.log(this.currentWidth, this.width);
    }

    if (this.currentHeight != this.height) {
      this.currentHeight += this.yResizeValue;
    }

    var textureFill = ctx.createPattern(this.texture, "repeat");

    ctx.beginPath();
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = textureFill;

    ctx.strokeRect(x, y, this.currentWidth, -this.currentHeight);
    ctx.closePath();
  }
}
