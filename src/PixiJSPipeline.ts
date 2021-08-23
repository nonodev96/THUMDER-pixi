import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { PixiJSTable } from './PixiJSTable';
// import { Utils } from './Utils';

const styleFontTextInstruction = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 15,
  fill: 'white',
  stroke: '#000000',
  // strokeThickness: 0,
  // dropShadow: true,
  // dropShadowColor: "#000000",
  // dropShadowBlur: 5,
  // dropShadowAngle: Math.PI / 6,
  // dropShadowDistance: 6,
});

const styleFontTextSteps = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 15,
  fill: 'white',
  stroke: '#000000',
  // strokeThickness: 0,
  // dropShadow: true,
  // dropShadowColor: "#000000",
  // dropShadowBlur: 4,
  // dropShadowAngle: Math.PI / 6,
  // dropShadowDistance: 6,
});

export type ArrowDirection = {
  start: {
    instruction: number,
    step: number
  }
  to: {
    instruction: number,
    step: number
  }
}

export type Pipe = {
  IF?: number,
  IF_stall?: number,
  ID?: number,
  ID_stall?: number,
  intEX?: number,
  intEX_stall?: number,
  MEM?: number,
  MEM_stall?: number,
  WB?: number
  WB_stall?: number
}

export const defaultPipe = {
  IF: 1,
  IF_stall: 0,
  ID: 1,
  ID_stall: 0,
  intEX: 1,
  intEX_stall: 0,
  MEM: 1,
  MEM_stall: 0,
  WB: 1,
  WB_stall: 0
}

export class PixiJSPipeline extends PIXI.Container {
  table: PixiJSTable
  tableSteps: PixiJSTable
  tableInstructions: PixiJSTable
  arrows: PIXI.Graphics[]
  borderTitle: PIXI.Graphics
  borderLeft: PIXI.Graphics
  borderTop: PIXI.Graphics
  step: number

  constructor() {
    super();
    this.table = new PixiJSTable();
    this.tableSteps = new PixiJSTable();
    this.tableInstructions = new PixiJSTable();
    this.arrows = [];
    this.step = 0;
    this.borderTitle = new PIXI.Graphics();
    this.borderLeft = new PIXI.Graphics();
    this.borderTop = new PIXI.Graphics();

    this.initTables();
    this.drawBorders()
  }

  private initTables() {
    this.table.position.x += 200;
    this.table.position.y += 50;
    // this.table.zIndex = 10

    this.tableSteps.position.x += 200;
    this.tableSteps.zIndex = 12

    this.tableInstructions.position.y += 50;
    this.tableInstructions.zIndex = 11
  }

  private drawBorders() {
    this.borderTitle = new PIXI.Graphics();
    this.borderTitle.lineStyle(2.5, 0x222222, 1);
    this.borderTitle.beginFill(0x333333);
    this.borderTitle.drawRect(0, 0, 200, 80);
    this.borderTitle.endFill();
    this.borderTitle.zIndex = 13
    
    const text = new PIXI.Text(`Pipeline`, { fontFamily: 'Arial', fontSize: 30, fill: 'white', stroke: '#000000', });
    text.position.x = (this.borderTitle.width / 2) - (text.width / 2);
    text.position.y = (this.borderTitle.height / 2) - (text.height / 2);
    this.borderTitle.addChild(text);

    this.borderLeft = new Graphics();
    this.borderLeft.lineStyle(2.5, 0x222222, 1);
    this.borderLeft.beginFill(0x333333);
    this.borderLeft.drawRect(0, 0, 200, document.documentElement.clientWidth);
    this.borderLeft.endFill();
    this.borderLeft.zIndex = 10

    this.borderTop = new PIXI.Graphics();
    this.borderTop.lineStyle(2.5, 0x222222, 1);
    this.borderTop.beginFill(0x333333);
    this.borderTop.drawRect(0, 0, document.documentElement.clientWidth, 80);
    this.borderTop.endFill();
    // this.borderTop.zIndex = 12

  }

  public addInstruction(text: string, pipe: Pipe = defaultPipe, instructionsArrow: ArrowDirection[] = [], newStep: number = 1) {
    this.drawInstruction(text);
    for (let i = 0; i < this.step; i++) {
      this.drawPipe('', 0xCCCCCC, 0xBBBBBB, { instruction: this.step, step: i });
    }

    for (let i = 0; i < (pipe.IF_stall ?? defaultPipe.IF_stall); i++) this.drawPipe('💣', 0xFFFF00);
    for (let i = 0; i < (pipe.IF ?? defaultPipe.IF); i++) this.drawPipe('IF', 0xFFFF00);

    for (let i = 0; i < (pipe.ID_stall ?? defaultPipe.ID_stall); i++) this.drawPipe('💣', 0xFF9900);
    for (let i = 0; i < (pipe.ID ?? defaultPipe.ID); i++) this.drawPipe('ID', 0xFF9900);

    for (let i = 0; i < (pipe.intEX_stall ?? defaultPipe.intEX_stall); i++) this.drawPipe('💣', 0xFF0000);
    for (let i = 0; i < (pipe.intEX ?? defaultPipe.intEX); i++) this.drawPipe('intEX', 0xFF0000);

    for (let i = 0; i < (pipe.MEM_stall ?? defaultPipe.MEM_stall); i++) this.drawPipe('💣', 0x00FF00);
    for (let i = 0; i < (pipe.MEM ?? defaultPipe.MEM); i++) this.drawPipe('MEM', 0x00FF00);

    for (let i = 0; i < (pipe.WB_stall ?? defaultPipe.WB_stall); i++) this.drawPipe('💣', 0xFF00FF);
    for (let i = 0; i < (pipe.WB ?? defaultPipe.WB); i++) this.drawPipe('WB', 0xFF00FF);


    for (const arrow of instructionsArrow) {
      this.drawArrow(arrow);
    }

    this.drawSteps()
    this.step += 1;


    this.table.addRow();

    // const r1 = Utils.getRandomInt(0, 10)
    // const r2 = Utils.getRandomInt(0, 10)
    // const r3 = Utils.getRandomInt(0, 10)
    // const r4 = Utils.getRandomInt(0, 10)
    // this.drawArrow({ start: { instruction: r1, step: r2 }, to: { instruction: r3, step: r4 } })
  }

  /**
   * https://didactalia.net/comunidad/materialeducativo/recurso/calculadoras-de-progresiones-aritmeticas/f0ee1413-0276-7915-8ec2-fe0b2b31f6fc
   * https://math.stackexchange.com/questions/1314006/drawing-an-arrow
   */
  public drawArrow(arrowDirection: ArrowDirection, color = 0xFF0000) {
    const initDistance_x = 210 + 37.5;
    const initDistance_y = 90 + 12.5;

    const start_x = initDistance_x + (arrowDirection.start.step * 87.5);
    const start_y = initDistance_y + (arrowDirection.start.instruction * 37.5);

    const to_x = initDistance_x + (arrowDirection.to.step * 87.5);
    const to_y = initDistance_y + (arrowDirection.to.instruction * 37.5);
    const L1 = Math.sqrt((to_x - start_x) ** 2 + (to_y - start_y) ** 2);
    const angle = 35;
    const x3 = to_x + (15 / L1) * ((start_x - to_x) * Math.abs(Math.cos(angle)) + (start_y - to_y) * Math.abs(Math.sin(angle)));
    const y3 = to_y + (15 / L1) * ((start_y - to_y) * Math.abs(Math.cos(angle)) - (start_x - to_x) * Math.abs(Math.sin(angle)));
    const x4 = to_x + (15 / L1) * ((start_x - to_x) * Math.abs(Math.cos(angle)) - (start_y - to_y) * Math.abs(Math.sin(angle)));
    const y4 = to_y + (15 / L1) * ((start_y - to_y) * Math.abs(Math.cos(angle)) + (start_x - to_x) * Math.abs(Math.sin(angle)));

    const bezierArrow = new PIXI.Graphics();
    bezierArrow
      .lineStyle(3, color)

      .moveTo(start_x, start_y)
      .lineTo(to_x, to_y)

      .moveTo(x3, y3)
      .lineTo(to_x, to_y)
      .moveTo(x4, y4)
      .lineTo(to_x, to_y);

    this.arrows.push(bezierArrow);
  }

  private drawInstruction(text_value: string) {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2.5, 0x0033FF, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 175, 25);
    rectangle.endFill();
    // rectangle.zIndex = 11

    const text = new PIXI.Text(text_value, styleFontTextInstruction);
    text.position.x += (rectangle.width - text.width) / 2;
    text.position.y += ((rectangle.height - text.height) / 2) - 2.5;
    rectangle.addChild(text);

    this.tableInstructions.addCell(rectangle);
    this.tableInstructions.addRow();
  }

  private drawSteps() {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2.5, 0xAAAAAA, 1);
    rectangle.beginFill(0xAAAAAA);
    rectangle.drawRect(0, 0, 75, 25);
    rectangle.endFill();
    
    const text = new PIXI.Text("" + this.step, styleFontTextInstruction);
    text.position.x += (rectangle.width - text.width) / 2;
    text.position.y += ((rectangle.height - text.height) / 2) - 2.5;
    rectangle.addChild(text);
    
    this.tableSteps.addCell(rectangle);
  }

  private drawPipe(code: '' | '💣' | 'ID' | 'IF' | 'intEX' | 'MEM' | 'WB' | 'TEST' | null = null, colorLineStyle = 0xCCCCCC, colorFill = 0xBBBBBB, cellAt: { instruction: number, step: number } | null = null) {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2.5, colorLineStyle, 1);
    rectangle.beginFill(colorFill);
    rectangle.drawRect(0, 0, 75, 25);
    rectangle.endFill();
    rectangle.zIndex = 11
    if (code != null) {
      const step = new PIXI.Text(code, styleFontTextSteps);
      step.position.x += (rectangle.width - step.width) / 2;
      step.position.y += 5;
      rectangle.addChild(step);
    } else {
    }

    if (cellAt != null) {
      rectangle.position.y += 5;
      this.table.addCellAt(rectangle, cellAt.instruction, cellAt.step);
    } else {
      this.table.addCell(rectangle);
    }
  }

  public draw(): PIXI.Container {
    this.addChild(this.table.draw());
    this.addChild(this.tableSteps.draw());
    this.addChild(this.tableInstructions.draw());

    this.addChild(this.borderTop)
    this.addChild(this.borderLeft)
    this.addChild(this.borderTitle)

    for (const arrow of this.arrows) {
      this.addChild(arrow);
    }
    return this;
  }

  public moveLeft() {
    // if (this.table.position.x > 200) {
    this.table.position.x -= 10;
    this.tableSteps.position.x -= 10;
    for (const arrow of this.arrows) {
      arrow.position.x -= 10;
    }
    // }
  }

  public moveRight() {
    if (this.table.position.x < 200) {
      this.table.position.x += 10;
      this.tableSteps.position.x += 10;
      for (const arrow of this.arrows) {
        arrow.position.x += 10;
      }
    }
  }

  public moveTop() {
    // if (this.table.position.y > 50) {
    this.table.position.y -= 10;
    this.tableInstructions.y -= 10;
    for (const arrow of this.arrows) {
      arrow.position.y -= 10;
    }
    // }
  }

  public moveBottom() {
    if (this.table.position.y < 50) {
      this.table.position.y += 10;
      this.tableInstructions.y += 10;
      for (const arrow of this.arrows) {
        arrow.position.y += 10;
      }
    }
  }

  toString() {
    console.log(this.step, this.table);
  }
}
