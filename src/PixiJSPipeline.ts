import * as PIXI from 'pixi.js'

export class PixiJSPipeline extends PIXI.Graphics {
    cellSize: any
    lineConfig: any
    useCorrectedWidth: boolean
    drawBoundaries: boolean

    constructor(width: number, cellSize: any = null, lineConfig: any = null, useCorrectedWidth = true, drawBoundaries = true) {
        super()
        this.width = width
        this.cellSize = cellSize
        this.lineConfig = lineConfig
        this.useCorrectedWidth = useCorrectedWidth
        this.drawBoundaries = drawBoundaries
    }

    gridWidth(): number {
        return 4
    }

    draw(): PIXI.Graphics {
        return this
    }

    toString() {
        console.log(this.width)
        console.log(this.cellSize)
        console.log(this.lineConfig)
        console.log(this.useCorrectedWidth)
        console.log(this.drawBoundaries)
    }
}
