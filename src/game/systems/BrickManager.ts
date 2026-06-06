import { Brick } from "../entities/Brick";

export type BrickDestroyedCallback = (brick: Brick) => void;

export class BrickManager {
  private bricks: Brick[] = [];

  private onBrickDestroyed?: BrickDestroyedCallback;

  public setOnBrickDestroyed(cb: BrickDestroyedCallback): void {
    this.onBrickDestroyed = cb;
  }

  public add(brick: Brick): void {
    this.bricks.push(brick);
  }

  public getAll(): readonly Brick[] {
    return this.bricks;
  }

  public handleHit(brick: Brick): void {
    const destroyed = brick.takeDamage(1);

    if (destroyed) {
      this.onBrickDestroyed?.(brick);
      this.remove(brick);
    }
  }

  private remove(brick: Brick): void {
    this.bricks = this.bricks.filter(b => b !== brick);
  }

  public isLevelCleared(): boolean {
    return this.bricks.length === 0;
  }
}
