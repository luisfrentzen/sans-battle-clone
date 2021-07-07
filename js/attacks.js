function boneGap1() {
  p.setDefaultPosition();
  p.changeMode(1);
  arena.resizeToLayout(2);

  setTimeout(() => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        addVerticalBones(
          arena.x - 50,
          arena.y + arena.currentHeight - 18,
          2,
          3
        );
        addVerticalBones(
          arena.x + arena.currentWidth + 50,
          arena.y + arena.currentHeight - 18,
          2,
          -3
        );
        addVerticalBones(arena.x - 50, arena.y + 3, 11, 3);
        addVerticalBones(
          arena.x + arena.currentWidth + 50,
          arena.y + 3,
          11,
          -3
        );
      }, i * 800);
    }
  }, 1000);
}

function boneGap2() {
  p.setDefaultPosition();
  p.changeMode(1);
  arena.resizeToLayout(2);

  setTimeout(() => {
    for (let i = 0; i < 7; i++) {
      let lowerH = Math.floor(Math.random() * (6 - 2 + 1) + 2);
      let upperH = 13 - lowerH;
      setTimeout(() => {
        addVerticalBones(
          arena.x - 50,
          arena.y + arena.currentHeight - lowerH * 8.5,
          lowerH,
          3
        );
        addVerticalBones(
          arena.x + arena.currentWidth + 50,
          arena.y + arena.currentHeight - lowerH * 8.5,
          lowerH,
          -3
        );
        addVerticalBones(arena.x - 50, arena.y + 3, upperH, 3);
        addVerticalBones(
          arena.x + arena.currentWidth + 50,
          arena.y + 3,
          upperH,
          -3
        );
      }, i * 1000);
    }
  }, 1000);
}
