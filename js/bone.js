class Bone {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.scale = 1;

    this.texture = document.getElementById("v-bone");

    this.width = this.texture.width;

    this.unit = this.texture.height / 3;
    this.height = this.unit * h;

    console.log(this.unit);
  }

  update() {}

  render(ctx) {
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
  }
}
