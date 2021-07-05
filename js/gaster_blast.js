class GasterBlast extends HostileBlock {
  constructor(gaster) {
    super(gaster.x, gaster.y);
    this.gaster = gaster;
    this.blastWidthFactor = 0;
    this.blastGrowthFactor = 0.4;
    this.startFrame = gaster.animationClock;
    this.nPulses = 4;
    this.alpha = 1;

    this.fx1 = document.getElementById("gaster-blast-1-sound");
    this.fx2 = document.getElementById("gaster-blast-2-sound");

    this.fadeOutValue = 0;
    this.currentVolume = 1;

    this.blastUpperound = 1.5;
    this.blastLowerBound = 0.9;
  }

  update() {
    this.blastWidthFactor += this.blastGrowthFactor;

    if (
      (this.nPulses % 2 == 0
        ? this.blastWidthFactor > this.blastUpperound
        : this.blastWidthFactor < this.blastLowerBound) &&
      this.nPulses >= 0
    ) {
      this.blastGrowthFactor = 0.08 * (this.nPulses % 2 == 0 ? -1 : 1);
      this.nPulses--;
      this.blastUpperound -= 0.1;
      this.blastLowerBound -= 0.1;

      if (this.nPulses == 1) {
        this.fadeOutValue = 0.02;
      }
    }

    if (this.blastWidthFactor <= 0) {
      this.gaster.gasterBlast.pop();
    }

    this.currentVolume -= this.fadeOutValue;
    this.alpha -= this.fadeOutValue;
    if (this.currentVolume < 0) this.currentVolume = 0;
    this.fx1.volume = this.currentVolume;
  }

  render(ctx) {
    this.update();

    ctx.globalAlpha = this.alpha;
    let mainBlastHeight =
      (this.gaster.height - 12 * this.gaster.scale) * this.blastWidthFactor;
    let secondaryBlastHeight =
      (this.gaster.height - 24 * this.gaster.scale) * this.blastWidthFactor;
    let tertiaryBlasterHeight =
      (this.gaster.height - 36 * this.gaster.scale) * this.blastWidthFactor;

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(
      this.gaster.x + this.gaster.width - 2 * this.gaster.scale,
      this.gaster.y + this.gaster.height / 2 - tertiaryBlasterHeight / 2,
      5 * this.gaster.scale,
      tertiaryBlasterHeight
    );

    ctx.fillRect(
      this.gaster.x + this.gaster.width + 3 * this.gaster.scale,
      this.gaster.y + this.gaster.height / 2 - secondaryBlastHeight / 2,
      5 * this.gaster.scale,
      secondaryBlastHeight
    );

    ctx.fillRect(
      this.gaster.x + this.gaster.width + 8 * this.gaster.scale,
      this.gaster.y + this.gaster.height / 2 - mainBlastHeight / 2,
      actCanvWidth * 2,
      mainBlastHeight
    );

    ctx.globalAlpha = 1;
  }
}
