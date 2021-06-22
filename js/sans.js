class Sans {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.totalSprites = 3;
    this.spritesLoaded = 0;

    this.body = document.getElementById("sans-torso");
    this.head = document.getElementById("sans-head");
    this.leg = document.getElementById("sans-legs");

    this.headGap = 6;

    this.handsUpFrames = document.getElementsByClassName("sans-hand-up");
    this.handsDownFrames = document.getElementsByClassName("sans-hand-down");
    this.handsRightFrames = document.getElementsByClassName("sans-hand-right");
    this.handsLeftFrames = document.getElementsByClassName("sans-hand-left");

    this.animationSpeed = 2;

    this.scale = 2;
    this.width = this.body.width * this.scale;
    this.height =
      (this.head.height + this.body.height + this.leg.height - this.headGap) *
      this.scale;

    this.bodyMovementX = 0;
    this.bodyMovementY = 0;
    this.bodyMoveSpeedX = 0.019 * this.scale;
    this.bodyMoveSpeedY = 0.019 * this.scale;

    this.headMovementX = 0;
    this.headMovementY = 0.04;
    this.headMoveSpeedX = 0.019 * this.scale;
    this.headMoveSpeedY = 0.0225 * this.scale;
    this.isMoving = true;

    this.frameToRender = [];
  }

  playAnimation(frames) {
    frames.forEach((f) => {
      this.frameToRender.add(f);
    });
  }

  update() {
    if (this.isMoving) {
      this.bodyMovementX += this.bodyMoveSpeedX;
      this.bodyMovementY += this.bodyMoveSpeedY;

      if (this.bodyMovementX > 0.63 * this.scale || this.bodyMovementX < 0) {
        this.bodyMoveSpeedX *= -1;
      }
      if (this.bodyMovementY < -0.3 * this.scale || this.bodyMovementY > 0) {
        this.bodyMoveSpeedY *= -1;
      }

      this.headMovementX += this.headMoveSpeedX;
      this.headMovementY += this.headMoveSpeedY;

      if (this.headMovementX > 0.63 * this.scale || this.headMovementX < 0) {
        this.headMoveSpeedX *= -1;
      }
      if (this.headMovementY < -0.3 * this.scale || this.headMovementY > 0.04) {
        this.headMoveSpeedY *= -1;
      }
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
