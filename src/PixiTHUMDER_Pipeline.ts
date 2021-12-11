import * as PIXI from 'pixi.js';

export type ColorType = number;

export type CoordsType = {
  x: number;
  y: number;
};

const styleFontTextPipe = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize  : 18,
  fill      : 'black',
  stroke    : '#000000',
  // strokeThickness: 0,
  // dropShadow: true,
  // dropShadowColor: "#000000",
  // dropShadowBlur: 4,
  // dropShadowAngle: Math.PI / 6,
  // dropShadowDistance: 6,
});

const styleFontTextBox = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize  : 18,
  fill      : 'black',
  stroke    : '#000000',
  // strokeThickness: 0,
  // dropShadow: true,
  // dropShadowColor: "#000000",
  // dropShadowBlur: 4,
  // dropShadowAngle: Math.PI / 6,
  // dropShadowDistance: 6,
});

export class PixiTHUMDER_Pipeline extends PIXI.Container {
  private readonly IntStages_text: PIXI.Text;
  private readonly IF_text: PIXI.Text;
  private readonly ID_text: PIXI.Text;
  private readonly intEX_text: PIXI.Text;

  private readonly faddEX_array: Array<PIXI.Text>;
  private readonly fmultEX_array: Array<PIXI.Text>;
  private readonly fdivEX_array: Array<PIXI.Text>;

  private readonly MEM_text: PIXI.Text;
  private readonly WB_text: PIXI.Text;

  private readonly faddEX_count;
  private readonly fmultEX_count;
  private readonly fdivEX_count;

  constructor(faddEX_count = 1, fmultEX_count = 8, fdivEX_count = 8) {
    super();
    this.IntStages_text = new PIXI.Text('Int-Stages');
    this.IF_text = new PIXI.Text('test', styleFontTextBox);
    this.ID_text = new PIXI.Text('test', styleFontTextBox);
    this.intEX_text = new PIXI.Text('test', styleFontTextBox);
    this.MEM_text = new PIXI.Text('test', styleFontTextBox);
    this.WB_text = new PIXI.Text('test', styleFontTextBox);

    this.faddEX_count = faddEX_count;
    this.fmultEX_count = fmultEX_count;
    this.fdivEX_count = fdivEX_count;
    this.faddEX_array = new Array<PIXI.Text>(this.faddEX_count);
    for (let i = 0; i < this.faddEX_count; i++) {
      this.faddEX_array[i] = new PIXI.Text('test', styleFontTextBox);
    }
    this.fmultEX_array = new Array<PIXI.Text>(this.fmultEX_count);
    for (let i = 0; i < this.fmultEX_count; i++) {
      this.fmultEX_array[i] = new PIXI.Text('test', styleFontTextBox);
    }
    this.fdivEX_array = new Array<PIXI.Text>(this.fdivEX_count);
    for (let i = 0; i < this.fdivEX_count; i++) {
      this.fdivEX_array[i] = new PIXI.Text('test', styleFontTextBox);
    }
    this.initBoxs();
    this.initArrows();
    this.initTexts();
  }

  private initTexts() {
    this.IntStages_text.position.x = 175 - this.IntStages_text.width / 2;
    this.IntStages_text.position.y = 20;
    this.addChild(this.IntStages_text);
    this.drawText(this.IF_text,
      { x: 100 + 5, y: 100 });
    this.drawText(this.ID_text,
      { x: 100 + 5, y: 200 });
    this.drawText(this.intEX_text,
      { x: 100 + 5, y: 300 });
    this.drawText(this.MEM_text,
      { x: 100 + 5, y: 400 });
    this.drawText(this.WB_text,
      { x: 100 + 5, y: 500 });
    for (let i = 0; i < this.faddEX_count; i++) {
      this.drawText(this.faddEX_array[i], { x: 400 + 5, y: 100 + i * 100 });
    }
    for (let i = 0; i < this.fmultEX_count; i++) {
      this.drawText(this.fmultEX_array[i], { x: 650 + 5, y: 100 + i * 100 });
    }
    for (let i = 0; i < this.fdivEX_count; i++) {
      this.drawText(this.fdivEX_array[i], { x: 900 + 5, y: 100 + i * 100 });
    }
  }

  private drawText(object: PIXI.Text, coords: CoordsType) {
    object.position.x = coords.x;
    object.position.y = coords.y;
    object.zIndex = 2;
    this.addChild(object);
  }

  private initArrows() {
    // IF
    this.drawArrow({ x: 175, y: 50 }, { x: 175, y: 100 });
    // ID
    this.drawArrow({ x: 175, y: 125 }, { x: 175, y: 200 });
    // intEX
    this.drawArrow({ x: 175, y: 225 }, { x: 175, y: 300 });
    // MEM
    this.drawArrow({ x: 175, y: 325 }, { x: 175, y: 400 });
    // WB
    this.drawArrow({ x: 175, y: 425 }, { x: 175, y: 500 });
    this.drawArrow({ x: 175, y: 525 }, { x: 175, y: 600 });

    // Lines
    this.drawLine({ x: 175, y: 275 }, { x: 300, y: 275 });
    this.drawLine({ x: 300, y: 275 }, { x: 300, y: 50 });
    this.drawLine({ x: 300, y: 50 }, { x: 975, y: 50 });

    // input faddEX, fmultEX, fdivEX
    this.drawArrow({ x: 400 + 75, y: 50 }, { x: 400 + 75, y: 100 });
    this.drawArrow({ x: 650 + 75, y: 50 }, { x: 650 + 75, y: 100 });
    this.drawArrow({ x: 900 + 75, y: 50 }, { x: 900 + 75, y: 100 });

    // output faddEX, fmultEX, fdivEX
    this.drawArrow({ x: 400 + 75, y: 125 }, { x: 400 + 75, y: 900 });
    this.drawArrow({ x: 650 + 75, y: 125 }, { x: 650 + 75, y: 900 });
    this.drawArrow({ x: 900 + 75, y: 125 }, { x: 900 + 75, y: 900 });

    // faddEX, fmultEX, fdivEX to MEM
    this.drawLine({ x: 975, y: 900 }, { x: 300, y: 900 });
    this.drawLine({ x: 300, y: 900 }, { x: 300, y: 375 });
    this.drawArrow({ x: 300, y: 375 }, { x: 175, y: 375 });
  }

  private initBoxs() {
    this.drawBox(0xffff00, { x: 100, y: 100 }, 'IF');
    this.drawBox(0xffa200, { x: 100, y: 200 }, 'ID');
    this.drawBox(0xff001c, { x: 100, y: 300 }, 'intEX');
    this.drawBox(0x00ff00, { x: 100, y: 400 }, 'MEM');
    this.drawBox(0xa2a2ff, { x: 100, y: 500 }, 'WB');

    for (let i = 0; i < this.faddEX_count; i++) {
      this.drawBox(0xffc3ff, { x: 400, y: 100 + i * 100 }, 'faddEX[' + i + ']');
    }
    for (let i = 0; i < this.fmultEX_count; i++) {
      this.drawBox(0xc3ffc3, { x: 650, y: 100 + i * 100 }, 'fmultEX[' + i + ']');
    }
    for (let i = 0; i < this.fdivEX_count; i++) {
      this.drawBox(0xffcb8e, { x: 900, y: 100 + i * 100 }, 'fdivEX[' + i + ']');
    }
  }

  private drawBox(color: ColorType, positionStart: CoordsType, text: string) {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2, 0x002200, 1);
    rectangle.beginFill(color);
    rectangle.drawRect(positionStart.x, positionStart.y, 150, 50);
    rectangle.endFill();
    rectangle.zIndex = 1;

    const pixi_text = new PIXI.Text(text, styleFontTextPipe);
    pixi_text.position.x = positionStart.x - (pixi_text.width + 10);
    pixi_text.position.y = positionStart.y;
    rectangle.addChild(pixi_text);
    this.addChild(rectangle);
  }

  private drawLine(from: CoordsType, to: CoordsType) {
    const start_x = from.x;
    const start_y = from.y;
    const to_x = to.x;
    const to_y = to.y;
    const bezierArrow = new PIXI.Graphics();
    bezierArrow.lineStyle(2, 0x000000);
    bezierArrow.moveTo(start_x, start_y);
    bezierArrow.lineTo(to_x, to_y);

    this.addChild(bezierArrow);
  }

  private drawArrow(from: CoordsType, to: CoordsType) {
    const start_x = from.x;
    const start_y = from.y;
    const to_x = to.x;
    const to_y = to.y;

    const L1 = Math.sqrt((to_x - start_x) ** 2 + (to_y - start_y) ** 2);
    const angle = 35;
    const x3 = to_x + (15 / L1) * ((start_x - to_x) * Math.abs(Math.cos(angle)) + (start_y - to_y) * Math.abs(Math.sin(angle)));
    const y3 = to_y + (15 / L1) * ((start_y - to_y) * Math.abs(Math.cos(angle)) - (start_x - to_x) * Math.abs(Math.sin(angle)));
    const x4 = to_x + (15 / L1) * ((start_x - to_x) * Math.abs(Math.cos(angle)) - (start_y - to_y) * Math.abs(Math.sin(angle)));
    const y4 = to_y + (15 / L1) * ((start_y - to_y) * Math.abs(Math.cos(angle)) + (start_x - to_x) * Math.abs(Math.sin(angle)));

    const bezierArrow = new PIXI.Graphics();
    bezierArrow.lineStyle(2, 0x000000);
    bezierArrow.moveTo(start_x, start_y);
    bezierArrow.lineTo(to_x, to_y);
    bezierArrow.moveTo(x3, y3);
    bezierArrow.lineTo(to_x, to_y);
    bezierArrow.moveTo(x4, y4);
    bezierArrow.lineTo(to_x, to_y);

    this.addChild(bezierArrow);
  }

  public update_IF_text(value: string): void {
    this.IF_text.text = value;
  }

  public update_ID_text(value: string): void {
    this.ID_text.text = value;
  }

  public update_intEX_text(value: string): void {
    this.intEX_text.text = value;
  }

  public update_faddEX_text(count: number, value: string): void {
    if (this.faddEX_count > count) this.faddEX_array[count].text = value;
  }

  public update_fmultEX_text(count: number, value: string): void {
    if (this.fmultEX_count > count) this.fmultEX_array[count].text = value;
  }

  public update_fdivEX_text(count: number, value: string): void {
    if (this.fdivEX_count > count) this.fdivEX_array[count].text = value;
  }

  public update_MEM_text(value: string): void {
    this.MEM_text.text = value;
  }

  public update_WB_text(value: string): void {
    this.WB_text.text = value;
  }

  public draw(): PIXI.Container {
    return this;
  }

  public toString(): string {
    const faddEX_array = this.faddEX_array.map((v) => v.text);
    const fmultEX_array = this.fmultEX_array.map((v) => v.text);
    const fdivEX_array = this.fdivEX_array.map((v) => v.text);
    return JSON.stringify({
      IF_text      : this.IF_text.text,
      ID_text      : this.ID_text.text,
      intEX_text   : this.intEX_text.text,
      MEM_text     : this.MEM_text.text,
      WB_text      : this.WB_text.text,
      faddEX_array : faddEX_array,
      fmultEX_array: fmultEX_array,
      fdivEX_array : fdivEX_array,
    });
  }
}
