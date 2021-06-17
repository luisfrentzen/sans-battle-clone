class Sans {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.totalSprites = 3;
    this.spritesLoaded = 0;

    this.body = document.getElementById("sans-torso");
    this.head = document.getElementById("sans-head");
    this.leg = document.getElementById("sans-legs");

    this.scale = 1.5;
    this.width = this.body.width * this.scale;
    this.height =
      this.head.height * this.scale +
      this.body.height * this.scale +
      this.leg.height * this.scale -
      8;
  }

  render(ctx) {
    ctx.drawImage(
      this.body,
      this.x,
      this.y + this.head.height * this.scale - 8,
      this.body.width * this.scale,
      this.body.height * 1.5
    );
    ctx.drawImage(
      this.leg,
      this.x +
        (this.body.width * this.scale) / 2 -
        (this.leg.width * this.scale) / 2 +
        2,
      this.y +
        this.body.height * this.scale +
        this.head.height * this.scale -
        8,
      this.leg.width * this.scale,
      this.leg.height * this.scale
    );
    ctx.drawImage(
      this.head,
      this.x +
        (this.body.width * this.scale) / 2 -
        (this.head.width * this.scale) / 2,
      this.y,
      this.head.width * this.scale,
      this.head.height * this.scale
    );
  }
}
