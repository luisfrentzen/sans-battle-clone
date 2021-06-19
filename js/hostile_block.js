class HostileBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hbWidth = 0;
    this.hbHeight = 0;
  }

  isColliding(player) {
    if (
      this.x + this.hbWidth > player.x &&
      this.y + this.hbHeight > player.y &&
      this.x < player.x + player.boundingBoxWidth &&
      this.y < player.y + player.boundingBoxHeight
    ) {
      return true;
    }
    return false;
  }
}
