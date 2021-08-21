import * as PIXI from 'pixi.js'
import { PixiJSTable } from './PixiJSTable'


const styleFontTextInstruction = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 15,
    fill: "white",
    stroke: '#000000',
    // strokeThickness: 0,
    // dropShadow: true,
    // dropShadowColor: "#000000",
    // dropShadowBlur: 5,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 6,
});

const styleFontTextSteps = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 15,
    fill: "white",
    stroke: '#000000',
    // strokeThickness: 0,
    // dropShadow: true,
    // dropShadowColor: "#000000",
    // dropShadowBlur: 4,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 6,
});

export class PixiJSPipeline extends PIXI.Container {
    cellXCount: number
    cellYCount: number
    table: PixiJSTable
    tableSteps: PixiJSTable
    tableInstructions: PixiJSTable

    arrows: PIXI.Graphics[]

    step: number = 0

    constructor(cellXCount: number = 5, cellYCount: number = 5) {
        super()
        this.cellXCount = cellXCount
        this.cellYCount = cellYCount
        this.table = new PixiJSTable()
        this.tableSteps = new PixiJSTable()
        this.tableInstructions = new PixiJSTable()
        this.arrows = []
        this.drawSteps()
        this.drawExample()
        // this.drawStep("TEST", 0xFFF, 0xFFF, { x: 4, y: 5 })

        this.drawExampleInstructions()
        this.drawArrow({ instruction: 0, step: 0 }, { instruction: 3, step: 4 })
    }

    getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public addInstruction(text: string) {
        this.drawInstruction(text)
        const r1 = this.getRandomInt(0, 10)
        const r2 = this.getRandomInt(0, 10)
        const r3 = this.getRandomInt(0, 10)
        const r4 = this.getRandomInt(0, 10)
        this.drawArrow({ instruction: r1, step: r2 }, { instruction: r3, step: r4 })
    }

    /**
     * https://didactalia.net/comunidad/materialeducativo/recurso/calculadoras-de-progresiones-aritmeticas/f0ee1413-0276-7915-8ec2-fe0b2b31f6fc
     * https://math.stackexchange.com/questions/1314006/drawing-an-arrow
     */
    private drawArrow(start: { instruction: number, step: number }, to___: { instruction: number, step: number }, color: number = 0xFF0000) {

        const initDistance_x = 210 + 37.5
        const initDistance_y = 90 + 12.5

        const start_x = initDistance_x + (start.step * 87.5)
        const start_y = initDistance_y + (start.instruction * 37.5)

        const to_x = initDistance_x + (to___.step * 87.5)
        const to_y = initDistance_y + (to___.instruction * 37.5)
        const L1 = Math.sqrt((to_x - start_x) ** 2 + (to_y - start_y) ** 2)
        const angle = 35
        const x3 = to_x + (15 / L1) * ((start_x - to_x) * Math.abs(Math.cos(angle)) + (start_y - to_y) * Math.abs(Math.sin(angle)))
        const y3 = to_y + (15 / L1) * ((start_y - to_y) * Math.abs(Math.cos(angle)) - (start_x - to_x) * Math.abs(Math.sin(angle)))
        const x4 = to_x + (15 / L1) * ((start_x - to_x) * Math.abs(Math.cos(angle)) - (start_y - to_y) * Math.abs(Math.sin(angle)))
        const y4 = to_y + (15 / L1) * ((start_y - to_y) * Math.abs(Math.cos(angle)) + (start_x - to_x) * Math.abs(Math.sin(angle)))


        const bezierArrow = new PIXI.Graphics()
        bezierArrow
            .lineStyle(3, color)

            .moveTo(start_x, start_y)
            .lineTo(to_x, to_y)

            .moveTo(x3, y3)
            .lineTo(to_x, to_y)
            .moveTo(x4, y4)
            .lineTo(to_x, to_y)
        // const bezierArrow = new PIXI.Graphics()
        // const normal = { x: 0, y: 0 }
        // normal.x = - (to_y - 10)
        // normal.y = + (to_x - 10)

        // const l = Math.sqrt(normal.x ** 2 + normal.y ** 2)
        // normal.x /= l
        // normal.y /= l

        // const tangent = { x: 0, y: 0 }
        // tangent.x = -normal.y * 15
        // tangent.y = +normal.x * 15

        // normal.x *= 10
        // normal.y *= 10

        // bezierArrow
        //     .lineStyle(3, color)
        //     .moveTo(start_x, start_y)
        //     .lineTo(to_x, to_y)

        //     .lineStyle(1, color, 1, .5)
        //     .beginFill(color)

        //     .moveTo(to_x + normal.x + tangent.x, to_y + normal.y + tangent.y)
        //     .lineTo(to_x, to_y)
        //     .lineTo(to_x - normal.x + tangent.x, to_y - normal.y + tangent.y)
        //     .lineTo(to_x + normal.x + tangent.x, to_y + normal.y + tangent.y)

        this.arrows.push(bezierArrow)
    }

    private drawExample() {
        this.table.position.x += 200
        this.table.position.y += 50

        for (let i = 0; i < this.cellXCount; i++) {

            for (let j = 0; j < this.step; j++) {
                this.drawStep()
            }

            this.drawStep("IF", 0xFFFF00)
            this.drawStep("ID", 0xFF9900)
            this.drawStep("intEX", 0xFF0000)
            this.drawStep("MEM", 0x00FF00)
            this.drawStep("WB", 0xFF00FF)
            for (let j = 0; j < this.cellXCount - this.step - 1; j++) {
                this.drawStep()
            }


            // for (let j = 0; j < this.step; j++) {
            //     this.drawStep()
            // }

            this.table.addRow()
            this.step++

        }
    }


    private drawSteps() {
        this.tableSteps.position.x += 200

        for (let i = 0; i < this.cellXCount; i++) {
            let rectangle = new PIXI.Graphics();
            rectangle.lineStyle(2.5, 0x66CCFF, 1);
            rectangle.beginFill(0x66CCFF);
            rectangle.drawRect(0, 0, 75, 25);
            rectangle.endFill();
            const step = new PIXI.Text("" + i, styleFontTextSteps)
            step.position.x += (rectangle.width / 2) - 5
            step.position.y += 5
            rectangle.addChild(step)

            this.tableSteps.addCell(rectangle)
        }
    }

    private drawExampleInstructions() {
        this.tableInstructions.position.y += 50
        for (let i = 0; i < this.cellYCount; i++) {
            this.drawInstruction("Instruction " + i)
        }
    }

    private drawInstruction(text_value: string) {
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(2.5, 0x0033FF, 1);
        rectangle.beginFill(0x66CCFF);
        rectangle.drawRect(0, 0, 175, 25);
        rectangle.endFill();


        const text = new PIXI.Text(text_value, styleFontTextInstruction)
        text.position.x += (rectangle.width - text.width) / 2
        text.position.y += ((rectangle.height - text.height) / 2) - 2.5
        rectangle.addChild(text)

        this.tableInstructions.addCell(rectangle)

        this.tableInstructions.addRow()
    }

    private drawVoid() {
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(2.5, 0x66CCFF, 1);
        rectangle.beginFill(0x66CCFF);
        rectangle.drawRect(0, 0, 75, 25);
        rectangle.endFill();
        this.table.addCell(rectangle)
    }

    private drawStep(code: "ID" | "IF" | "intEX" | "MEM" | "WB" | "TEST" | null = null, colorLineStyle = 0x66CCFF, colorFill = 0x66CCFF, cellAt: { x: number, y: number } | null = null) {
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(2.5, colorLineStyle, 1);
        rectangle.beginFill(colorFill);
        rectangle.drawRect(0, 0, 75, 25);
        rectangle.endFill();
        if (code != null) {
            const step = new PIXI.Text(code, styleFontTextSteps)
            step.position.x += (rectangle.width - step.width) / 2
            step.position.y += 5
            rectangle.addChild(step)
        } else {
        }

        if (cellAt != null) {
            rectangle.position.y += 5
            this.table.addCellAt(rectangle, cellAt.x, cellAt.y)
        } else {
            this.table.addCell(rectangle)
        }
    }

    public draw(): PIXI.Container {
        this.addChild(this.table.draw())
        this.addChild(this.tableSteps.draw())
        this.addChild(this.tableInstructions.draw())

        for (const arrow of this.arrows) {
            this.addChild(arrow)
        }

        return this
    }

    toString() {
        console.log(this.cellXCount, this.cellYCount)
    }
}
