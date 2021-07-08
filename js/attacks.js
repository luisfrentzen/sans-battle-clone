var attacks = [boneGap1, boneGap2, boneGap3, gasterStream1, boneStabs];

function intro() {
  onEvent = true;
  slamPlayer(0);

  setTimeout(() => {
    let fx = document.getElementById("gaster-blaster-sound");
    let ding = document.getElementById("ding-sound");
    sans.playAnimation(sans.handsRightFrames);
    fx.currentTime = 0;
    p.velocity = [0, 0, 0, 0];
    ding.currentTime = 0;
    ding.play();
    boneGap3(false);
    setTimeout(() => {
      fx.play();
    }, 500);
  }, 1300);
  setTimeout(() => {
    sans.resetAnimation();
    gasterStream1(false);
  }, 3500);
}

function boneGap1(reset = true) {
  onEvent = true;
  arena.resizeToLayout(2);
  p.changeMode(1);
  if (reset) {
    p.setDefaultPosition();
  }

  setTimeout(() => {
    for (var i = 0; i < 7; i++) {
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
    clearEventStatus(i * 800 + 1800);
  }, 1000);
}

function boneGap2(reset = true) {
  onEvent = true;
  arena.resizeToLayout(2);
  p.changeMode(1);
  if (reset) {
    p.setDefaultPosition();
  }

  setTimeout(() => {
    for (var i = 0; i < 7; i++) {
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
    clearEventStatus(i * 1000 + 1600);
  }, 1000);
}

function boneGap3(reset = true) {
  onEvent = true;
  p.changeMode(0);
  if (reset) {
    p.setDefaultPosition();
    arena.resizeToLayout(2);
  }

  let y = arena.y - 100;
  let offset = 0;
  let acc = 3;
  let f = 9;
  let v = 6;

  setTimeout(() => {
    for (var i = 0; i < 28; i++) {
      setTimeout(() => {
        offset += f;
        f -= acc;
        if (offset == 0) acc *= -1;
        addVerticalBones(arena.x - 50, y + offset, 20, v);
        addVerticalBones(arena.x - 50, y + offset + 200, 20, v);
      }, i * 90);
    }
    if (reset) clearEventStatus(i * 100 + 1000);
  }, 100);
}

function boneStabs(reset = true) {
  onEvent = true;
  p.changeMode(0);
  if (reset) {
    p.setDefaultPosition();
  }
  arena.resizeToLayout(1);

  setTimeout(() => {
    for (let i = 0; i < 8; i++) {
      let dir = Math.floor(Math.random() * 3);
      setTimeout(() => {
        slamPlayer(dir);
        if (i == 7) {
          setTimeout(() => {
            sans.resetAnimation();
            clearEventStatus(100);
          }, 1500);
        }
      }, i * 1200);
    }
  }, 1000);
}

function crossGasterStream() {
  let scale = 2;
  let gap = 25;
  addGasterBlast(
    arena.x + arena.currentWidth / 2 - 28.5 * scale,
    arena.y + arena.currentHeight + gap,
    2,
    scale,
    arena
  );
  addGasterBlast(
    arena.x + arena.currentWidth / 2 - 28.5 * scale,
    arena.y - 44 * scale - gap,
    0,
    scale,
    arena
  );
  addGasterBlast(
    arena.x - 57 * scale - gap + 10,
    arena.y + arena.currentHeight / 2 - 22 * scale,
    3,
    scale,
    arena
  );
  addGasterBlast(
    arena.x + arena.currentWidth + gap - 10,
    arena.y + arena.currentHeight / 2 - 22 * scale,
    1,
    scale,
    arena
  );
  setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      gasterList[i].fire();
    }
  }, 800);
}

function edgeGasterStream() {
  let scale = 2;
  let gap = 25;
  addGasterBlast(
    arena.x - 40,
    arena.y + arena.currentHeight + gap - 6,
    2,
    scale,
    arena
  );
  addGasterBlast(
    arena.x + arena.currentWidth - 44 * scale + 10,
    arena.y - 44 * scale - gap + 6,
    0,
    scale,
    arena
  );
  addGasterBlast(
    arena.x - 57 * scale - gap + 20,
    arena.y + arena.currentHeight - 44 * scale + 25,
    3,
    scale,
    arena
  );
  addGasterBlast(
    arena.x + arena.currentWidth + gap - 20,
    arena.y - 25,
    1,
    scale,
    arena
  );
  setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      gasterList[i].fire();
    }
  }, 800);
}

function bigGasterStream() {
  let scale = 2.5;
  let gap = 25;
  addGasterBlast(
    arena.x - 57 * scale - gap + 10,
    arena.y + arena.currentHeight / 2 - 22 * scale,
    3,
    scale,
    arena
  );
  addGasterBlast(
    arena.x + arena.currentWidth + gap - 10,
    arena.y + arena.currentHeight / 2 - 22 * scale,
    1,
    scale,
    arena
  );
  setTimeout(() => {
    for (let i = 0; i < 2; i++) {
      gasterList[i].fire();
    }
  }, 800);
}

var gasterStreams = [];

function gasterStream1(reset = true) {
  onEvent = true;
  p.changeMode(0);
  if (reset) {
    p.setDefaultPosition();
  }
  arena.resizeToLayout(1);

  setTimeout(() => {
    gasterStreams.push(
      crossGasterStream,
      edgeGasterStream,
      crossGasterStream,
      bigGasterStream
    );

    for (let i = 0; i < gasterStreams.length; i++) {
      setTimeout(() => {
        gasterStreams.shift()();

        if (gasterStreams.length == 0) {
          clearEventStatus(2000);
        }
      }, i * 1000);
    }
  }, 1000);
}

function clearEventStatus(interval = 500) {
  setTimeout(() => {
    onEvent = false;
  }, interval);
}
