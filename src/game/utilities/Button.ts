import { Container, Graphics, Text } from "pixi.js";

export class Button {
    public view: Container;

    private bg: Graphics;
    private label: Text;

    constructor(text: string, x: number, y: number, onClick: () => void) {
        this.view = new Container();

        this.bg = new Graphics();

        this.label = new Text({
            text,
            style: {
                fill: "#ffffff",
                fontSize: 20
            }
        });

        const padding = 5;

        const width = this.label.width + padding * 2;
        const height = this.label.height + padding * 2;

        this.bg.roundRect(0, 0, width, height, 8);
        this.bg.fill("#2a2a55");

        this.label.x = padding;
        this.label.y = padding;

        this.view.x = x;
        this.view.y = y;

        this.view.eventMode = "static";
        this.view.cursor = "pointer";

        this.view.on("pointerdown", onClick);

        this.view.addChild(this.bg);
        this.view.addChild(this.label);
    }
    public getWidth(): number {
        return this.bg.width;
    }

    public getHeight(): number {
        return this.bg.height;
    }
}