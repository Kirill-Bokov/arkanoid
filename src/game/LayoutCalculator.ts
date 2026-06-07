import { GAME_WIDTH, GAME_HEIGHT } from "./GameConfig";
import type { LevelSchema, LayoutMetrics } from "./types/GameTypes";

export class LayoutCalculator {

  private static readonly BRICK_RATIO = 4;

  public static calculate(
    level: LevelSchema
  ): LayoutMetrics {

    const brickWidth =
      GAME_WIDTH / level.cols;

    const brickHeight =
      brickWidth / this.BRICK_RATIO;

    const paddleWidth =
      brickWidth * 1.5;

    const paddleHeight =
      brickHeight * 0.5;

    const ballRadius =
      brickHeight * 0.4;

    const levelHeight =
      brickHeight * level.rows;

    if (
      level.offsetY + levelHeight >
      GAME_HEIGHT
    ) {
      throw new Error(
        "Level does not fit into arena"
      );
    }

    return {
      brickWidth,
      brickHeight,

      paddleWidth,
      paddleHeight,

      ballRadius
    };
  }
}
