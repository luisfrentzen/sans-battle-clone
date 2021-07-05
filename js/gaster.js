class Gaster {
  constructor(x, y, dir, scale = 3, arena) {
    this.targetX = x;
    this.targetY = y;

    let phX = 0;
    let phY = 0;
    phX = arena.currentWidth / 2 + Math.round(Math.random() * 100);
    phY = arena.currentHeight / 2 + Math.round(Math.random() * 100);

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

    this.nIntroFrame = 10;

    let velX = (this.targetX - this.x) / this.nIntroFrame;
    let velY = (this.targetY - this.y) / this.nIntroFrame;

    this.velocity = [
      velY > 0 ? velY : 0,
      velX < 0 ? velX : 0,
      velY < 0 ? velY : 0,
      velX > 0 ? velX : 0,
    ];

    this.fx = document.getElementById("gaster-blaster-sound");

    console.log(this.velocity);
    this.fx.play();
  }

  update() {
    this.y += this.velocity[0];
    this.y += this.velocity[2];
    this.x += this.velocity[1];
    this.x += this.velocity[3];

    if (
      Math.round(this.x) == this.targetX &&
      Math.round(this.y) == this.targetY
    ) {
      this.velocity = [0, 0, 0, 0];
    }
  }

  intro() {}

  outro() {}

  fire() {
    this.animationFrames.forEach((f) => {
      this.frameToRender.push(f);
    });

    this.gasterBlast.push(new GasterBlast(this));
    this.gasterBlast[0].fx1.play();
  }

  render(ctx) {
    // console.log(this.x, this.y);
    this.update();
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((Math.PI * (1 + this.dir)) / 2);
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
