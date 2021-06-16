class Player {
  constructor(x, y, color = "#c70021") {
    this.x = x;
    this.y = y;
    this.texture = new Image();
    this.texture.src = "../textures/PlayerHeart.png";

    this.color = color;

    this.boundingBoxWidth = 14;
    this.boundingBoxHeight = 14;

    this.speed = 2;
    this.velX = 0;
    this.velY = 0;
    // 0 free move - blue
    // 1 grav-based move - red
    this.playerMode = 0;
    this.playerColor = color;
  }

  move(dirVector) {
    this.velX = dirVector.RIGHT * this.speed + -dirVector.LEFT * this.speed;
    this.velY = dirVector.DOWN * this.speed + -dirVector.UP * this.speed;
  }

  render(ctx) {
    ctx.save();

    this.x += this.velX;
    this.y += this.velY;

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

    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = "source-over";
    // ctx.rotate(-(Math.PI / 2));
    ctx.restore();
  }
}
