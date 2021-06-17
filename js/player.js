class Player {
  constructor(x, y, color = "#c70021") {
    this.x = x;
    this.y = y;
    this.texture = new Image();
    this.texture.src = "../textures/PlayerHeart.png";

    this.boundingBoxWidth = 14;
    this.boundingBoxHeight = 14;

    this.speed = 2;
    this.velX = 0;
    this.velY = 0;

    this.grav = 0.1;
    this.jumpVel = 3.5;
    // 0 free move - red
    // 1 grav-based move - blue
    this.mode = 1;
    this.color = this.mode == 0 ? color : "#2000bf";

    this.isJumping = false;
    this.isGrounded = true;
  }

  move(dirVector) {
    this.velX = dirVector.RIGHT * this.speed + -dirVector.LEFT * this.speed;
    if (p.mode == 0) {
      this.velY = dirVector.DOWN * this.speed + -dirVector.UP * this.speed;
    }
    // this.gravVel *= this.gravAcc;
    // this.velY += 1;
  }

  jump() {
    if (this.isGrounded) {
      this.velY -= this.jumpVel;
      this.isJumping = true;
    }
  }

  render(ctx, arena) {
    ctx.save();
    this.x += this.velX;
    this.y += this.velY;

    let leftBorder = arena.x + arena.borderWidth;
    let rightBorder = arena.x + arena.width - arena.borderWidth;
    let upperBound = arena.y + arena.borderWidth;
    let lowerBound = arena.y + arena.height - arena.borderWidth;

    if (this.x <= leftBorder) this.x = leftBorder;
    if (this.x + this.boundingBoxWidth >= rightBorder)
      this.x = rightBorder - this.boundingBoxWidth;
    if (this.y <= upperBound) this.y = upperBound;
    if (this.y + this.boundingBoxHeight >= lowerBound) {
      this.y = lowerBound - this.boundingBoxHeight;
      this.isGrounded = true;
      this.velY = 0;
    } else {
      this.isGrounded = false;
    }

    if (!this.isGrounded && this.mode == 1) {
      this.velY += this.grav;
      if (this.velY > -1 && this.isJumping) {
        this.isJumping = false;
      }
    }

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
    ctx.restore();
  }
}
