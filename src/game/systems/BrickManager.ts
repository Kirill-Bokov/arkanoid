import { Brick } from "../entities/Brick";
import type { Container } from "pixi.js";

export type BrickDestroyedCallback = (brick: Brick) => void;

export class BrickManager {
  private bricks: Brick[] = [];
  private container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  private onBrickDestroyed?: BrickDestroyedCallback;

  public setOnBrickDestroyed(cb: BrickDestroyedCallback): void {
    this.onBrickDestroyed = cb;
  }

  public createLevel(): void {
    const rows = 5;
    const cols = 10;

    const brickWidth = 60;
    const brickHeight = 20;

    const offsetX = 30;
    const offsetY = 60;
    const padding = 10;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {

        const x = offsetX + col * (brickWidth + padding);
        const y = offsetY + row * (brickHeight + padding);

        const brick = new Brick(
          x,
          y,
          brickWidth,
          brickHeight,
          3,
        );

        this.bricks.push(brick);
        this.container.addChild(brick.view);
      }
    }
  }

  public handleHit(brick: Brick): void {
    brick.takeDamage(1);

    if (brick.isDestroyed()) {
      this.destroyBrick(brick);
    }
  }

  private destroyBrick(brick: Brick): void {
    if (this.onBrickDestroyed) this.onBrickDestroyed(brick);

    this.container.removeChild(brick.view);

    this.bricks = this.bricks.filter(b => b !== brick);
  }

  public getAll(): readonly Brick[] {
    return this.bricks;
  }

  public isLevelCleared(): boolean {
    return this.bricks.length === 0;
  }
}
