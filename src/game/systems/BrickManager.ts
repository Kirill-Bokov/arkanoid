import { Brick } from "../entities/Brick";
import type { Container } from "pixi.js";

export type BrickDestroyedCallback = (brick: Brick) => void;

export class BrickManager {
  private bricks: Brick[] = [];
  private container: Container;
  constructor(container: Container) {
    this.container = container;
  }

  public add(brick: Brick): void {
    this.bricks.push(brick);
    this.container.addChild(brick.view);
  }

  public remove(brick: Brick): void {
    this.container.removeChild(brick.view);
    this.bricks = this.bricks.filter(b => b !== brick);
  }

  public handleHit(brick: Brick): void {
    brick.takeDamage(1);

    if (brick.isDestroyed()) {
      this.remove(brick);
    }
  }

  public getAll(): readonly Brick[] {
    return this.bricks;
  }

  public isLevelCleared(): boolean {
    return this.bricks.length === 0;
  }

}
