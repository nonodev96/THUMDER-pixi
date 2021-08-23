import * as PIXI from 'pixi.js';
import { Application, Text, Loader, Texture, Ticker } from 'pixi.js';
import { PixiJSPipeline } from './PixiJSPipeline';
import { PixiJSTable } from './PixiJSTable';
import { PixiJSGrid } from './PixiJSGrid';

import Keyboard from 'pixi.js-keyboard';
import Mouse from 'pixi.js-mouse';

import { Utils } from './Utils'

var state;


// constants
const SIZE = 1024;
// const CENTER = SIZE / 2;

// create and append app
const app = new Application({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  // width: SIZE * 2,
  // height: SIZE,
  backgroundColor: 0xDDDDDD, // light blue
  sharedTicker: true,
  sharedLoader: true,
  // antialias: true,
  // autoDensity: true,
  // resolution: 2,
});
app.view.id = 'main';

PIXI.settings.SORTABLE_CHILDREN = true



app.view.addEventListener("resize", function () {
  app.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
  pipeline.borderTop.width = document.documentElement.clientWidth
  pipeline.borderLeft.height = document.documentElement.clientHeight

});

app.view.addEventListener('contextmenu', (e) => {
  // window.wasRightClick = true;
  // e.preventDefault();
});



const pipeline = new PixiJSPipeline()
pipeline.addInstruction("ADDI R28, R0, #4")
pipeline.addInstruction("ADDI R29, R0, #1", { ID_stall: 2 }, [{ start: { instruction: 1, step: 1 }, to: { instruction: 2, step: 2 } }], 1)
pipeline.addInstruction("ADDI R17, R0, 0")
pipeline.addInstruction("ADDI R18, R0, 0")
pipeline.addInstruction("ADDI R26, R0, #32")

const button = document.createElement("button")
button.textContent = "test"
button.addEventListener("click", () => {
  pipeline.addInstruction("nop", { IF: 1, IF_stall: 0, ID: 1, ID_stall: 0, intEX: 2, MEM: 1, WB: 1 })
  pipeline.addInstruction("nop", { IF: 1, IF_stall: 0, ID: 1, ID_stall: 0, intEX: 1, intEX_stall: 1, MEM: 1, WB: 1 })
  pipeline.draw()
})
document.querySelectorAll("body")[0].appendChild(button)
document.querySelectorAll("body")[0].appendChild(document.createElement("br"))

document.body.appendChild(app.view);

const loader = Loader.shared;
const ticker = Ticker.shared;

let styleNoWrap = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 12,
  fill: "white",
  stroke: '#000000',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

loader.load((loader, resources) => {

  // Conainer
  // const table = new PixiJSTable(true, 10, 10, { x: 0, y: 0 }, { x: 0, y: 0 }, new Text(""))
  // table.addCell(new PIXI.Text("This is a large bit of text without word wrap to show you what happens when there's a large cell", styleNoWrap));
  // app.stage.addChild(table.draw())

  // Graphics
  // const grid = new PixiJSGrid(1024, 64, { width: 1, color: 0xffffff, alpha: 1, alignment: 0.5, native: true }, true, true)
  // app.stage.addChild(grid.drawGrid())

  // Graphics
  app.stage.addChild(pipeline.draw())

  // const pipeline2 = new PixiJSPipeline(5, 10)
  // pipeline2.table.position.x += 0
  // pipeline2.table.position.y += 200
  // app.stage.addChild(pipeline2.draw())

  const fps = new Text('FPS: 0', { fill: 0xffffff });
  fps.position.x = document.documentElement.clientWidth - 200
  fps.position.y = 25

  app.stage.addChild(fps);


  // const container = new PIXI.Container();
  // const text = new PIXI.Text("Texto")
  // container.addChild(text)
  // app.stage.addChild(container)
  app.ticker.add((delta) => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
    // hero.direction = getNextEntityDirection(app.view.width, hero);
    // hero.sprite.x = getNextEntityPosition(hero);
  })
})



loader.onProgress.add(() => {
  console.log("onProgress");
});
loader.onError.add(() => {
  console.log("onError");
});
loader.onLoad.add(() => {
  console.log("onLoad");
});
loader.onComplete.add(setup);
loader.load()


function setup() {
  console.log("Setup");

  // Set the game state
  state = play;

  // Start the game loop 
  app.ticker.add(delta => gameLoop(delta));

  Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
    console.log(buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY);
  });
}

function gameLoop(delta) {
  // Update the current game state:
  state(delta);

  Keyboard.update();
  Mouse.update();
}

function play(delta) {
  const speed = 5 * delta;

  // Keyboard
  if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
    pipeline.moveLeft()
    // console.log("⬅");
  }
  if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {
    pipeline.moveRight()
    // console.log("➡");
  }
  if (Keyboard.isKeyDown('ArrowUp', 'KeyW')) {
    pipeline.moveTop()
    // console.log("⬆");
  }
  if (Keyboard.isKeyDown('ArrowDown', 'KeyS')) {
    pipeline.moveBottom()
    // console.log("⬇");
  }

  let object_ = {
    x: 1,
    y: 1,
    rotation: 90
  }

  // Mouse
  object_.rotation = Utils.getAngleTo(Mouse.getPosX(), Mouse.getPosY(), object_.x, object_.y);

  if (Mouse.isButtonDown(Mouse.Button.LEFT)) {
    object_.x += Utils.getAngleX(speed, object_.rotation);
    object_.y += Utils.getAngleY(speed, object_.rotation);
  }

  if (Mouse.isButtonDown(Mouse.Button.RIGHT)) {
    object_.x -= Utils.getAngleX(speed, object_.rotation);
    object_.y -= Utils.getAngleY(speed, object_.rotation);
  }
}