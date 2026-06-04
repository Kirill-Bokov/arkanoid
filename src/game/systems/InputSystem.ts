export class InputSystem {
    private mouseX = 0;
    private canvas: HTMLCanvasElement
    constructor(
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
    }

    private handleMouseMove = (
        event: MouseEvent
    ): void => {
        const rect =
            this.canvas.getBoundingClientRect();

        this.mouseX =
            event.clientX - rect.left;
    };

    public init(): void {
        window.addEventListener(
            "mousemove",
            this.handleMouseMove
        );
    }

    public destroy(): void {
        window.removeEventListener(
            "mousemove",
            this.handleMouseMove
        );
    }

    public getMouseX(): number {
        return this.mouseX;
    }
}