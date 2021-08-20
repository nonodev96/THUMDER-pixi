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
  width: SIZE,
  height: SIZE,
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
});

document.body.appendChild(app.view);
// const loader = Loader.shared;
// const ticker = Ticker.shared;

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

// Conainer
const table = new PixiJSTable(true, 10, 10, { x: 0, y: 0 }, { x: 0, y: 0 }, new Text(""))
table.addCell(new PIXI.Text("This is a large bit of text without word wrap to show you what happens when there's a large cell", styleNoWrap));
app.stage.addChild(table.draw())



// Graphics
const pipeline = new PixiJSPipeline(1024, 10, { color: 0xff0000 }, true, true)
// app.stage.addChild(pipeline.draw())


// Graphics
const grid = new PixiJSGrid(1024, 64, { width: 1, color: 0xffffff, alpha: 1, alignment: 0.5, native: true }, true, true)
// app.stage.addChild(grid.drawGrid())



// const container = new PIXI.Container();
// const text = new PIXI.Text("Texto")
// container.addChild(text)
// app.stage.addChild(container)