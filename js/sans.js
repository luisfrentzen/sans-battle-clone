class Sans {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.totalSprites = 3;
    this.spritesLoaded = 0;

    this.body = document.getElementById("sans-torso");
    this.head = document.getElementById("sans-head");
    this.leg = document.getElementById("sans-legs");
    this.headGap = 5;

    this.scale = 2;
    this.width = this.body.width * this.scale;
    this.height =
      (this.head.height + this.body.height + this.leg.height - this.headGap) *
      this.scale;

    this.bodyMovementX = 0;
    this.bodyMovementY = 0;
    this.bodyMoveSpeedX = 0.015 * this.scale;
    this.bodyMoveSpeedY = 0.015 * this.scale;

    this.headMovementX = 0;
    this.headMovementY = 0;
    this.headMoveSpeedX = 0.015 * this.scale;
    this.headMoveSpeedY = 0.016 * this.scale;
  }

  update() {
    this.bodyMovementX += this.bodyMoveSpeedX;
    this.bodyMovementY += this.bodyMoveSpeedY;

    if (this.bodyMovementX > 0.62 * this.scale || this.bodyMovementX < 0) {
      this.bodyMoveSpeedX *= -1;
    }
    if (this.bodyMovementY < -0.3 * this.scale || this.bodyMovementY > 0) {
      this.bodyMoveSpeedY *= -1;
    }

    this.headMovementX += this.headMoveSpeedX;
    this.headMovementY += this.headMoveSpeedY;

    if (this.headMovementX > 0.62 * this.scale || this.headMovementX < 0) {
      this.headMoveSpeedX *= -1;
    }
    if (this.headMovementY < -0.34 * this.scale || this.headMovementY > 0) {
      this.headMoveSpeedY *= -1;
    }
  }

  render(ctx) {
    this.update();
    ctx.drawImage(
      this.body,
      this.x + this.bodyMovementX * this.scale,
      this.y +
        (this.head.height - this.headGap + this.bodyMovementY) * this.scale,
      this.body.width * this.scale,
      this.body.height * this.scale
    );
    ctx.drawImage(
      this.leg,
      this.x + (this.body.width / 2 - this.leg.width / 2 + 2) * this.scale,
      this.y +
        (this.body.height + this.head.height - this.headGap) * this.scale,
      this.leg.width * this.scale,
      this.leg.height * this.scale
    );
    ctx.drawImage(
      this.head,
      this.x +
        (this.body.width / 2 - this.head.width / 2 + this.headMovementX) *
          this.scale,
      this.y + this.headMovementY * this.scale,
      this.head.width * this.scale,
      this.head.height * this.scale
    );
  }
}
