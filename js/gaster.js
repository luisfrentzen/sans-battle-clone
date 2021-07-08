class Gaster {
  constructor(x, y, dir, scale = 3, arena) {
    this.targetX = x;
    this.targetY = y;

    let phX = 0;
    let phY = 0;
    phX =
      arena.currentWidth / 2 +
      Math.floor(Math.random() * (1 + 150 - 100) + 100);
    phY =
      arena.currentHeight / 2 +
      Math.floor(Math.random() * (1 + 150 - 100) + 100);

    if (
      this.targetX < arena.x + arena.currentWidth / 2 &&
      this.targetY < arena.y + arena.currentHeight / 2
    ) {
      phX = this.targetX - phX;
      phY = this.targetY - phY;
    } else if (
      this.targetX < arena.x + arena.currentWidth / 2 &&
      this.targetY < arena.y + arena.currentHeight
    ) {
      phX = this.targetX - phX;
      phY = this.targetY + phY;
    } else if (
      this.targetX < arena.x + arena.currentWidth &&
      this.targetY < arena.y + arena.currentHeight / 2
    ) {
      phX = this.targetX + phX;
      phY = this.targetY - phY;
    } else {
      phX = this.targetX + phX;
      phY = this.targetY + phY;
    }

    this.arrivedTimestamp = -1;

    this.acc = 1;

    this.x = phX;
    this.y = phY;
    this.scale = scale;

    this.texture = document.getElementById("gaster-default");
    this.animationFrames = [...document.getElementsByClassName("gaster-fire")];

    this.dir = dir;

    this.width = this.texture.width * this.scale;
    this.height = this.texture.height * this.scale;
    this.frameToRender = [];

    this.gasterBlast = [];

    this.animationClock = 0;
    this.animationSpeed = 3;

    this.nIntroFrame = 12;

    let velX = (this.targetX - this.x) / this.nIntroFrame;
    let velY = (this.targetY - this.y) / this.nIntroFrame;

    this.velocity = [
      velY > 0 ? velY : 0,
      velX < 0 ? velX : 0,
      velY < 0 ? velY : 0,
      velX > 0 ? velX : 0,
    ];

    this.targetRotDeg = (Math.PI * (1 + this.dir)) / 2;
    this.rotDeg = this.targetRotDeg - Math.PI / 2;

    this.rotVel = Math.PI / 2 / this.nIntroFrame;
    this.fx = document.getElementById("gaster-blaster-sound");

    this.fx.currentTime = 0;
    this.fx.play();
  }

  update(now) {
    this.y += this.velocity[0] *= this.acc;
    this.y -= Math.abs((this.velocity[2] *= this.acc));
    this.x -= Math.abs((this.velocity[1] *= this.acc));
    this.x += this.velocity[3] *= this.acc;

    this.rotDeg += this.rotVel;

    if (this.rotDeg > this.targetRotDeg) {
      this.rotDeg = this.targetRotDeg;
      this.rotVel = 0;
      this.velocity = [0, 0, 0, 0];
      this.arrivedTimestamp = now;
      this.x = this.targetX;
      this.y = this.targetY;
    }
  }

  fire() {
    this.animationFrames.forEach((f) => {
      this.frameToRender.push(f);
    });

    this.gasterBlast.push(new GasterBlast(this));
    this.gasterBlast[0].fx1.currentTime = 0;
    this.gasterBlast[0].fx1.play();
    this.velocity[(this.dir + 2) % 4] = 3;
    this.acc = 1.1;

    let shakeValues = [];
    ctx.save();
    for (let i = 0; i < 2; i++) {
      let dx = Math.random() * 6 - 3;
      let dy = Math.random() * 6 - 3;
      shakeValues.push([dx, dy]);
    }
    addShakeValues(shakeValues);
  }

  render(ctx, now) {
    this.update(now);
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotDeg);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));

    if (this.frameToRender.length == 0) {
      if (this.animationClock > 0) this.animationClock = 0;

      ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    } else {
      this.animationClock++;

      ctx.drawImage(
        this.frameToRender[0],
        this.x,
        this.y,
        this.width,
        this.height
      );

      if (this.animationClock % this.animationSpeed == 0) {
        if (this.frameToRender.length != 1) {
          let f = this.frameToRender.shift();

          if (this.frameToRender.length == 1) {
            this.frameToRender.push(f);
          }
        }
      }
    }

    this.gasterBlast.forEach((f) => {
      f.render(ctx);
    });
    ctx.restore();
  }
}
