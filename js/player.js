class Player {
  constructor(x, y, color = "#c70021") {
    this.x = x;
    this.y = y;
    this.texture = document.getElementById("player-heart");

    this.boundingBoxWidth = 14;
    this.boundingBoxHeight = 14;

    this.speed = 2;
    // this.velX = 0;
    // this.velY = 0;
    this.velocity = [0, 0, 0, 0];

    this.normGrav = 0.1;
    this.slammedGrav = 6.1;

    this.grav = this.normGrav;

    this.jumpVel = 3.5;

    // 0 free move - red
    // 1 grav-based move - blue
    this.mode = 0;
    this.color = this.mode == 0 ? color : "#2000bf";

    this.isJumping = false;
    this.isSlammed = false;
    this.isGrounded = [false, false, false, false];

    //0 normal down
    //1 left
    //2 upside down
    //3 right
    this.orientation = 0;
  }

  changeMode(mode) {
    this.mode = mode;
    this.orientation = 0;
    this.color = this.mode == 0 ? "#c70021" : "#2000bf";
  }

  move(dirVector) {
    for (let i = 0; i < 4; i++) {
      if (i % 2 == this.orientation % 2 && this.mode == 1) {
        continue;
      }
      this.velocity[i] = dirVector[i] * this.speed;
    }
  }

  jump() {
    if (this.isGrounded[this.orientation] && !this.isJumping) {
      this.velocity[this.orientation] -= this.jumpVel;
      this.isJumping = true;
    }
  }

  render(ctx, arena) {
    ctx.save();
    this.x += this.velocity[3] - this.velocity[1];
    this.y += this.velocity[0] - this.velocity[2];

    let leftBorder = arena.x + arena.borderWidth;
    let rightBorder = arena.x + arena.width - arena.borderWidth;
    let upperBound = arena.y + arena.borderWidth;
    let lowerBound = arena.y + arena.height - arena.borderWidth;

    if (this.x <= leftBorder) {
      this.x = leftBorder;
      this.isGrounded[1] = true;
      this.velocity[1] = 0;

      if (this.orientation == 1 && this.isSlammed) {
        this.isSlammed = false;
        this.grav = this.normGrav;
        playerSlammedEffect(ctx, 1, SHAKE_LENGTH);
        warnBoneStab(ctx, 1);
      }
    } else {
      this.isGrounded[1] = false;
    }

    if (this.x + this.boundingBoxWidth >= rightBorder) {
      this.x = rightBorder - this.boundingBoxWidth;
      this.isGrounded[3] = true;
      this.velocity[3] = 0;

      if (this.orientation == 3 && this.isSlammed) {
        this.isSlammed = false;
        this.grav = this.normGrav;
        playerSlammedEffect(ctx, 3, SHAKE_LENGTH);
        warnBoneStab(ctx, 3);
      }
    } else {
      this.isGrounded[3] = false;
    }

    if (this.y <= upperBound) {
      this.y = upperBound;
      this.isGrounded[2] = true;
      this.velocity[2] = 0;

      if (this.orientation == 2 && this.isSlammed) {
        this.isSlammed = false;
        this.grav = this.normGrav;
        playerSlammedEffect(ctx, 2, SHAKE_LENGTH);
        warnBoneStab(ctx, 2);
      }
    } else {
      this.isGrounded[2] = false;
    }

    if (this.y + this.boundingBoxHeight >= lowerBound) {
      this.y = lowerBound - this.boundingBoxHeight;
      this.isGrounded[0] = true;
      this.velocity[0] = 0;

      if (this.orientation == 0 && this.isSlammed) {
        this.isSlammed = false;
        this.grav = this.normGrav;
        playerSlammedEffect(ctx, 0, SHAKE_LENGTH);
        warnBoneStab(ctx, 0);
      }
    } else {
      this.isGrounded[0] = false;
    }

    if (!this.isGrounded[this.orientation] && this.mode == 1) {
      this.velocity[this.orientation] += this.grav;
      // if (this.velocity[this.orientation] > -1 && this.isJumping) {
      //   this.isJumping = false;
      // }
    }

    ctx.translate(
      this.x + this.boundingBoxWidth / 2,
      this.y + this.boundingBoxHeight / 2
    );
    ctx.rotate((Math.PI * (1 + this.orientation)) / 2);
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
    ctx.fillRect(
      this.x,
      this.y,
      this.x + this.boundingBoxWidth,
      this.y + this.boundingBoxHeight
    );
    ctx.globalCompositeOperation = "source-over";
    ctx.restore();
  }
}
