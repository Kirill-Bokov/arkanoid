import { Graphics, Rectangle } from "pixi.js";
import { GAME_WIDTH } from "../GameConfig";

export class Paddle {
    public readonly view: Graphics;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.view = new Graphics();

        this.draw();

        this.view.x = this.x;
        this.view.y = this.y;
    }

    private draw(): void {
        this.view.clear();

        this.view.roundRect(
            0,
            0,
            this.width,
            this.height,
            6
        );

        this.view.fill("#e5e5e5");
    }

    public moveTo(x: number): void {

    const minX = 0;
    const maxX = GAME_WIDTH - this.width;

    this.x = Math.max(minX, Math.min(x, maxX));

    this.view.x = this.x;
  }


    public getBounds(): Rectangle {
        return new Rectangle(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}