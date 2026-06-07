import type { BrickType, LayoutMetrics, LevelSchema } from "../types/GameTypes";
import { BrickFactory } from "./BrickFactory";
import { BrickManager } from "./BrickManager";

export class LevelManager {

    private brickManager: BrickManager;

    constructor(brickManager: BrickManager) {
        this.brickManager = brickManager;
    }

    public loadLevel(
        level: LevelSchema,
        metrics: LayoutMetrics
    ): void {

        for (let row = 0; row < level.rows; row++) {

            for (let col = 0; col < level.cols; col++) {

                const type =
                    level.grid[row][col] as BrickType;

                if (type === "empty") {
                    continue;
                }

                const x =
                    col * metrics.brickWidth;

                const y =
                    level.offsetY +
                    row * metrics.brickHeight;

                const brick = BrickFactory.create(
                    x,
                    y,
                    metrics.brickWidth,
                    metrics.brickHeight,
                    type
                );

                this.brickManager.add(brick);
            }
        }
    }

}
