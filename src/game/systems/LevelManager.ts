import type { BrickType, LevelSchema } from "../types/GameTypes";
import { BrickFactory } from "./BrickFactory";
import { BrickManager } from "./BrickManager";

export class LevelManager {

  private brickManager: BrickManager;

  constructor(brickManager: BrickManager) {
    this.brickManager = brickManager;
  }

  public loadLevel(level: LevelSchema): void {

    for (let y = 0; y < level.rows; y++) {
      for (let x = 0; x < level.cols; x++) {

        const type: BrickType = level.grid[y][x];

        if (!type || type === "empty") continue;

        const worldX =
          level.offsetX + x * (level.brickWidth + level.padding);

        const worldY =
          level.offsetY + y * (level.brickHeight + level.padding);

        const brick = BrickFactory.create(
          worldX,
          worldY,
          level.brickWidth,
          level.brickHeight,
          type
        );

        this.brickManager.add(brick);
      }
    }
  }
}
