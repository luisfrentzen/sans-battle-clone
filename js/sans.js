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

    this.handsUpFrames = zip([
      [...document.getElementsByClassName("sans-hand-up")],
      [0, 0, 0, 0, 0],
      [3, 5, 4, -1, 1],
      [2, 2, 2, 2, 2],
    ]);
    this.handsDownFrames = zip([
      [...document.getElementsByClassName("sans-hand-down")],
      [0, 0, 0, 0],
      [0, -1, 4, 3],
      [2, 2, 2, 2],
    ]);
    this.handsRightFrames = zip([
      [...document.getElementsByClassName("sans-hand-right")],
      [0, -3, -4, 5, 2],
      [0, 0, 0, 0, 0],
      [5, 5, 5, 5, 5],
    ]);
    this.handsLeftFrames = zip([
      [...document.getElementsByClassName("sans-hand-left")],
      [1, 3, -2, -1, 1],
      [0, 0, 0, 0, 0],
      [5, 5, 5, 5, 5],
    ]);

    this.animationSpeed = 6;

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

    this.animationClock = 0;
    this.frameToRender = [];

    this.headAnimationX = 0;
    this.headAnimationY = 0;
  }

  playAnimation(frames) {
    // this.isMoving = false;
    frames.forEach((f) => {
      this.frameToRender.push(f);
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
    let headX = 0;
    let headY = 0;
    this.update();

    if (this.frameToRender.length == 0) {
      this.headAnimationX = 0;
      this.headAnimationY = 0;
      if (!this.isMoving) this.isMoving = true;
      if (this.animationClock > 0) this.animationClock = 0;
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
    } else {
      this.animationClock++;

      let frame = this.frameToRender[0][0];
      headX = this.frameToRender[0][1];
      headY = this.frameToRender[0][2];
      let offset = this.frameToRender[0][3];

      ctx.drawImage(
        frame,
        this.x - offset * this.scale,
        this.y + this.height - frame.height * this.scale,
        frame.width * this.scale,
        frame.height * this.scale
      );

      if (this.animationClock % this.animationSpeed == 0) {
        if (this.frameToRender.length != 1) {
          this.frameToRender.shift();
        }
      }
    }

    ctx.drawImage(
      this.head,
      this.x +
        (this.body.width / 2 -
          this.head.width / 2 +
          this.headMovementX +
          headX) *
          this.scale,
      this.y + (this.headMovementY + headY) * this.scale,
      this.head.width * this.scale,
      this.head.height * this.scale
    );
  }
}
