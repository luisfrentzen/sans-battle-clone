class Player {
  constructor(x, y, color = "#c70021") {
    this.x = x;
    this.y = y;
    this.texture = new Image();
    this.texture.src = "../textures/PlayerHeart.png";

    this.boundingBoxWidth = 14;
    this.boundingBoxHeight = 14;

    // 0 free move - blue
    // 1 grav-based move - red
    this.playerMode = 0;
    this.playerColor = color;
  }

  move(horVector, verVector) {
    this.x += horVector;
    this.y += verVector;
  }

  changeColor(color) {}

  render(ctx) {
    ctx.save();

    ctx.translate(
      this.x + this.boundingBoxWidth / 2,
      this.y + this.boundingBoxHeight / 2
    );
    ctx.rotate(Math.PI / 2);
    ctx.translate(
      -(this.x + this.boundingBoxWidth / 2),
      -(this.y + this.boundingBoxHeight / 2)
    );

    ctx.drawImage(
      this.texture,
      this.x,
      this.y,
      this.boundingBoxWidth,
      this.boundingBoxHeight
    );

    ctx.globalCompositeOperation = "source-in";

    ctx.fillStyle = red;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = "source-over";
    // ctx.rotate(-(Math.PI / 2));
    ctx.restore();
  }
}
