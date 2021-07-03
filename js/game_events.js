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

function boneStab(ctx, dir) {
  slamPlayer(dir);
}
