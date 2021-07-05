class Gaster {
  constructor(x, y, dir, scale = 3) {
    this.x = x;
    this.y = y;
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

    this.fx = document.getElementById("gaster-blaster-sound");

    this.fx.play();
  }

  update() {}

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
