class WarningArea {
  constructor(arena, dir, h) {
    this.dir = dir;
    this.h = h;
    this.offset = 5;

    this.height = dir % 2 == 0 ? this.h : arena.currentHeight - 2 * this.offset;
    this.width = dir % 2 == 0 ? arena.currentWidth - 2 * this.offset : this.h;

    this.pos = (() => {
      switch (this.dir) {
        case 0:
          return [
            arena.x + this.offset,
            arena.y + arena.currentHeight - this.offset,
          ];
        case 1:
        case 2:
          return [arena.x + this.offset, arena.y + this.offset];
        case 3:
          return [
            arena.x + arena.currentWidth - this.offset,
            arena.y + this.offset,
          ];
      }
    })();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = red;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      this.pos[0],
      this.pos[1],
      this.width * (this.dir == 3 ? -1 : 1),
      this.height * (this.dir == 0 ? -1 : 1)
    );
  }
}
