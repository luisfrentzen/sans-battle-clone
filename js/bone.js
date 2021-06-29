class Bone extends HostileBlock {
  constructor(x, y, v) {
    super(x, y);
    this.scale = 1;
    this.v = v;
  }

  update() {}
}

class VerticalBone extends Bone {
  constructor(x, y, h, v) {
    super(x, y, v);
    this.h = h;

    this.texture = document.getElementById("v-bone");

    this.width = this.texture.width;

    this.unit = this.texture.height / 3;
    this.height = this.unit * h;

    super.hbHeight = this.height;
    super.hbWidth = this.width;
  }

  update() {
    this.x += this.v;
  }

  render(ctx) {
    this.update();
    ctx.drawImage(
      this.texture,
      0,
      0,
      this.width,
      this.unit,
      this.x,
      this.y,
      this.width * this.scale,
      this.unit * this.scale
    );

    let offset = this.unit * this.scale;
    for (let i = 0; i < this.h - 2; i++) {
      ctx.drawImage(
        this.texture,
        0,
        this.unit,
        this.width,
        this.unit,
        this.x,
        this.y + offset,
        this.width * this.scale,
        this.unit * this.scale
      );

      offset += this.unit * this.scale;
    }

    ctx.drawImage(
      this.texture,
      0,
      this.unit * 2,
      this.width,
      this.unit,
      this.x,
      this.y + offset,
      this.width * this.scale,
      this.unit * this.scale
    );

    ctx.lineWidth = "1";
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.hbWidth, this.hbHeight);
  }
}

class HorizontalBone extends Bone {
  constructor(x, y, w, v) {
    super(x, y, v);
    this.w = w;

    this.texture = document.getElementById("h-bone");

    this.height = this.texture.height;

    this.unit = this.texture.width / 3;
    this.width = this.unit * w;

    super.hbHeight = this.height;
    super.hbWidth = this.width;
  }

  update() {
    this.y += this.v;
  }

  render(ctx) {
    this.update();
    ctx.drawImage(
      this.texture,
      0,
      0,
      this.unit,
      this.height,
      this.x,
      this.y,
      this.unit * this.scale,
      this.height * this.scale
    );

    let offset = this.unit * this.scale;
    for (let i = 0; i < this.w - 2; i++) {
      ctx.drawImage(
        this.texture,
        this.unit,
        0,
        this.unit,
        this.height,
        this.x + offset,
        this.y,
        this.unit * this.scale,
        this.height * this.scale
      );

      offset += this.unit * this.scale;
    }

    ctx.drawImage(
      this.texture,
      this.unit * 2,
      0,
      this.unit,
      this.height,
      this.x + offset,
      this.y,
      this.unit * this.scale,
      this.height * this.scale
    );

    ctx.lineWidth = "1";
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.hbWidth, this.hbHeight);
  }
}
