pixi-pipeline
=============

## Define PIXI Application

```ts
const app = new PIXI.Application({
  width: SIZE * 2,
  height: SIZE,
  backgroundColor: 0xDDDDDD,
  sharedTicker: true,
  sharedLoader: true,
  antialias: true,
  autoDensity: true,
  resolution: 2,
});
app.view.id = 'main';
```

## Pipeline Methods

```ts
const pipeline = new PixiJSPipeline();

let iter = 0;
pipeline.addInstruction('ADDI R28, R0, #4', {}, iter);
iter++;
pipeline.addInstruction('ADDI R17, R0, 0', {}, iter);
iter++;
pipeline.addInstruction('ADDI R18, R0, 0', {}, iter);
iter++;
pipeline.addInstruction('ADDI R26, R0, #32', {}, iter);
iter++;
pipeline.addInstruction('ADDI R29, R0, #1', { ID_stall: 2 }, iter);
pipeline.addArrow({
  start: {
    instruction: 1,
    step: 1,
  },
  to: {
    instruction: 2,
    step: 2,
  },
});

pipeline.nextStep();
pipeline.debug();
```

### Add Pipeline interface

```ts
app.stage.addChild(pipeline.draw());
```

## Pixi init

```ts
let state;

function play(delta) {
  const speed = 5 * delta;
  if (Keyboard.isKeyDown('ArrowLeft', 'KeyA', 'KeyJ')) {
    pipeline.moveRight();
  }
  if (Keyboard.isKeyDown('ArrowRight', 'KeyD', 'KeyL')) {
    pipeline.moveLeft();
  }
  if (Keyboard.isKeyDown('ArrowUp', 'KeyW', 'KeyI')) {
    pipeline.moveBottom();
  }
  if (Keyboard.isKeyDown('ArrowDown', 'KeyS', 'KeyK')) {
    pipeline.moveTop();
  }
}

function gameLoop(delta) {
  state(delta);

  Keyboard.update();
  Mouse.update();
}

function setup() {
  console.log('Setup');

  // Set the game state
  state = play;

  // Start the game loop
  app.ticker.add((delta) => gameLoop(delta));

  Mouse.events.on('pressed', null, (buttonCode, event, mouseX, mouseY) => {
    console.log(buttonCode, event, 'mouseX', mouseX, 'mouseY', mouseY);
  });
  Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
    console.log(buttonCode, event, 'mouseX', mouseX, 'mouseY', mouseY, 'mouseOriginX', mouseOriginX, 'mouseOriginY', mouseOriginY, 'mouseMoveX', mouseMoveX, 'mouseMoveY', mouseMoveY);
  });
}

loader.onProgress.add(() => {
  console.log('onProgress');
});
loader.onError.add(() => {
  console.log('onError');
});
loader.onLoad.add(() => {
  console.log('onLoad');
});
loader.onComplete.add(setup);

loader.load((loader, resources) => {
  // Add pipeline
  app.stage.addChild(pipeline.draw());

  const fps = new PIXI.Text('FPS: 0', { fill: 0xffffff });
  fps.position.x = document.documentElement.clientWidth - 200;
  fps.position.y = 25;

  app.stage.addChild(fps);

  app.ticker.add((delta) => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
  });
});
```
