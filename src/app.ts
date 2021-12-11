import * as PIXI from 'pixi.js';
import Keyboard from 'pixi.js-keyboard';
import Mouse from 'pixi.js-mouse';
import { PixiTHUMDER_Pipeline } from './PixiTHUMDER_Pipeline';
import { PixiTHUMDER_CycleClockDiagram } from './PixiTHUMDER_CycleClockDiagram';
import { PixiTHUMDER_Table } from './PixiTHUMDER_Table';
import { PixiUtils } from './PixiUtils';

let state;

// constants
const SIZE = 720;

// create and append app
const app = new PIXI.Application({
  // width: document.documentElement.clientWidth,
  // height: document.documentElement.clientHeight,
  width          : SIZE * 2,
  height         : SIZE,
  backgroundColor: 0xDDDDDD, // light blue
  sharedTicker   : true,
  sharedLoader   : true,
  antialias      : true,
  autoDensity    : true,
  resolution     : 2,
});
app.view.id = 'main';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.SORTABLE_CHILDREN = true;

const loader = PIXI.Loader.shared;
const ticker = PIXI.Ticker.shared;

const pipeline = new PixiTHUMDER_Pipeline();
const cycleClockDiagram = new PixiTHUMDER_CycleClockDiagram();
const table = new PixiTHUMDER_Table();

for (const row of [0, 1, 2]) {
  for (const col of [0]) {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2.5, 0x0033FF, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 175, 25);
    rectangle.endFill();
    rectangle.zIndex = 11;
    const text = new PIXI.Text('Test', { fontSize: 18 });
    text.position.x += (rectangle.width / 2) - (text.width / 2);
    text.position.y += ((rectangle.height - text.height) / 2) - 2.5;
    rectangle.addChild(text);

    table.setCell(row, col, rectangle);
  }
}


app.view.addEventListener('resize', () => {
  app.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
  cycleClockDiagram.borderTopWidth = document.documentElement.clientWidth;
  cycleClockDiagram.borderLeftHeight = document.documentElement.clientHeight;
});

app.view.addEventListener('contextmenu', (e) => {
  // window.wasRightClick = true;
  // e.preventDefault();
});

const iter = 0;
cycleClockDiagram.addInstruction('ADDI R28, R0, #4', {}, iter);
cycleClockDiagram.addInstruction('ADDI R17, R0, 0', {}, iter);
cycleClockDiagram.addInstruction('ADDI R18, R0, 0', {}, iter);
cycleClockDiagram.addInstruction('ADDI R26, R0, #32', { IF_stall: 1 }, iter);
cycleClockDiagram.addInstruction('ADDI R29, R0, #1', { IF_stall: 1 }, iter);
cycleClockDiagram.addArrow({ start: { instruction: 1, step: 1 }, to: { instruction: 5, step: 5 } });

const buttonAddInstruction = document.createElement('button');
buttonAddInstruction.textContent = 'Add Instruction';
buttonAddInstruction.addEventListener('click', () => {
  cycleClockDiagram.addInstruction('ADDI R26, R0, #32', {
    IF      : 1,
    IF_stall: 0,
    ID      : 1,
    ID_stall: 0,
    intEX   : 1,
    MEM     : 1,
    WB      : 1,
  });
});

const buttonAddInstructionX10 = document.createElement('button');
buttonAddInstructionX10.textContent = 'Add Instruction (x10)';
buttonAddInstructionX10.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    cycleClockDiagram.addInstruction('ADDI R26, R0, #32', {
      IF      : 1,
      IF_stall: 0,
      ID      : 1,
      ID_stall: 0,
      intEX   : 1,
      MEM     : 1,
      WB      : 1,
    });
  }
});

const buttonNextStep = document.createElement('button');
buttonNextStep.textContent = 'Next step';
buttonNextStep.addEventListener('click', () => {
  cycleClockDiagram.nextStep();
});

const buttonNextStepX10 = document.createElement('button');
buttonNextStepX10.textContent = 'Next step (x10)';
buttonNextStepX10.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    cycleClockDiagram.nextStep();
  }
});

const buttonReset = document.createElement('button');
buttonReset.textContent = 'Reset';
buttonReset.addEventListener('click', () => {
//  cycleClockDiagram.reset();
});

const buttonDebug = document.createElement('button');
buttonDebug.textContent = 'Debug';
buttonDebug.addEventListener('click', () => {
  cycleClockDiagram.debug();
});

document.querySelectorAll('body')[0].appendChild(buttonAddInstruction);
document.querySelectorAll('body')[0].appendChild(buttonAddInstructionX10);
document.querySelectorAll('body')[0].appendChild(buttonNextStep);
document.querySelectorAll('body')[0].appendChild(buttonNextStepX10);
document.querySelectorAll('body')[0].appendChild(buttonReset);
document.querySelectorAll('body')[0].appendChild(buttonDebug);
document.querySelectorAll('body')[0].appendChild(document.createElement('br'));


const styleNoWrap = new PIXI.TextStyle({
  fontFamily        : 'Arial',
  fontSize          : 12,
  fill              : 'white',
  stroke            : '#000000',
  strokeThickness   : 4,
  dropShadow        : true,
  dropShadowColor   : '#000000',
  dropShadowBlur    : 4,
  dropShadowAngle   : Math.PI / 6,
  dropShadowDistance: 6,
});

document.body.appendChild(app.view);

function play(delta) {
  const speed = 5 * delta;

  // Keyboard
  if (Keyboard.isKeyDown('ArrowLeft', 'KeyA', 'KeyJ')) {
    cycleClockDiagram.moveRight();
  }
  if (Keyboard.isKeyDown('ArrowRight', 'KeyD', 'KeyL')) {
    cycleClockDiagram.moveLeft();

  }
  if (Keyboard.isKeyDown('ArrowUp', 'KeyW', 'KeyI')) {
    cycleClockDiagram.moveBottom();

  }
  if (Keyboard.isKeyDown('ArrowDown', 'KeyS', 'KeyK')) {
    cycleClockDiagram.moveTop();
  }

  // const objectPixi = {
  //   x: 1,
  //   y: 1,
  //   rotation: 90,
  // };

  // Mouse
  // objectPixi.rotation = PixiUtils.getAngleTo(Mouse.getPosX(), Mouse.getPosY(), objectPixi.x, objectPixi.y);

  if (Mouse.isButtonDown(Mouse.Button.RIGHT)) {
    // objectPixi.x += PixiUtils.getAngleX(speed, objectPixi.rotation);
    // objectPixi.y += PixiUtils.getAngleY(speed, objectPixi.rotation);
  }

  if (Mouse.isButtonDown(Mouse.Button.LEFT)) {
    // objectPixi.x -= PixiUtils.getAngleX(speed, objectPixi.rotation);
    // objectPixi.y -= PixiUtils.getAngleY(speed, objectPixi.rotation);
  }
}

function gameLoop(delta) {
  // Update the current game state:
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
  // Container
  // const table = new PixiJSTable(true, 10, 10, { x: 0, y: 0 }, { x: 0, y: 0 }, new Text(""))
  // table.addCell(new PIXI.Text("This is a large bit of text without word wrap to show you what happens when there's a large cell", styleNoWrap));
  // app.stage.addChild(table.draw())

  // Graphics
  // const grid = new PixiJSGrid(1024, 64, { width: 1, color: 0xffffff, alpha: 1, alignment: 0.5, native: true }, true, true)
  // app.stage.addChild(grid.drawGrid())

  // Graphics
  //app.stage.addChild(pipeline.draw());
  app.stage.addChild(cycleClockDiagram.draw());
  // app.stage.addChild(table.draw());

  // const cycleClockDiagram2 = new PixiJScycleClockDiagram(5, 10)
  // cycleClockDiagram2.table.position.x += 0
  // cycleClockDiagram2.table.position.y += 200
  // app.stage.addChild(cycleClockDiagram2.draw())

  const fps = new PIXI.Text('FPS: 0', { fill: 0xffffff });
  fps.position.x = document.documentElement.clientWidth - 200;
  fps.position.y = 25;

  app.stage.addChild(fps);

  // const container = new PIXI.Container();
  // const text = new PIXI.Text("Texto")
  // container.addChild(text)
  // app.stage.addChild(container)
  app.ticker.add((delta) => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
    // hero.direction = getNextEntityDirection(app.view.width, hero);
    // hero.sprite.x = getNextEntityPosition(hero);
  });
});
