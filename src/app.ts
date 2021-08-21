import * as PIXI from 'pixi.js';
import { Application, Text, Loader, Resource, Texture, Ticker } from 'pixi.js';
import { PixiJSPipeline } from './PixiJSPipeline';
import { PixiJSTable } from './PixiJSTable';
import { PixiJSGrid } from './PixiJSGrid';

// constants
const SIZE = 1024;
// const CENTER = SIZE / 2;

// create and append app
const app = new Application({
  width: SIZE * 2,
  height: SIZE,
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
  antialias: true,
  autoDensity: true,
  resolution: 2,
});





const pipeline = new PixiJSPipeline(10, 10)

const button = document.createElement("button")
button.textContent =  "test"
button.addEventListener("click", () => {
  pipeline.addInstruction("bnez r4, r3")
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

loader.load(() => {

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
  fps.position.x += app.view.width - fps.width * 2
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