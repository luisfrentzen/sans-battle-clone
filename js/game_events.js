function slamPlayer(dir) {
  let frames = (() => {
    switch (dir) {
      case 0:
        return sans.handsDownFrames;
      case 1:
        return sans.handsLeftFrames;
      case 2:
        return sans.handsUpFrames;
      case 3:
        return sans.handsRightFrames;
    }
  })();

  sans.playAnimation(frames);

  setTimeout(() => {
    p.changeMode(1);
    p.orientation = dir;
    p.isSlammed = true;
    p.grav = p.slammedGrav;
    p.velocity = [0, 0, 0, 0];
  }, 390);
}

function playerSlammedEffect(ctx, dir, frameCount) {
  let shakeValues = (() => {
    switch (dir) {
      case 0:
        return [[0, 10]];
      case 1:
        return [[-10, 0]];
      case 2:
        return [[0, -10]];
      case 3:
        return [[10, 0]];
    }
  })();

  for (let i = 0; i < frameCount - 1; i++) {
    let dx = Math.random() * 10 - 5;
    let dy = Math.random() * 10 - 5;
    shakeValues.push([dx, dy]);
  }

  ctx.save();
  addShakeValues(shakeValues);
  slamSound.play();
}

function warnBoneStab(ctx, dir) {
  addWarningAreas(arena, dir, DEFAULT_WARNING_H);
  let fx = document.getElementById("warning-sound");
  fx.play();

  setTimeout(() => {
    warningAreas.shift();
    boneStab(dir);
  }, 500);
}

function boneStab(dir) {
  let fx = document.getElementById("bone-stab-sound");
  fx.play();

  if (dir % 2 == 0) {
    addVerticallBoneStreak(
      arena.x + 5,
      dir == 0 ? arena.y + arena.currentHeight + 20 : arena.y - 85,
      12,
      12,
      dir == 0 ? -80 : 40,
      undefined,
      dir == 0 ? -10 : 10
    );
  } else {
    addHorizontalBoneStreak(
      dir == 3 ? arena.x + arena.currentWidth + 20 : arena.x - 85,
      arena.y + 5,
      12,
      12,
      dir == 3 ? -80 : 40,
      undefined,
      dir == 3 ? -10 : 10
    );
  }
}
