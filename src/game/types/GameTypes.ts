import type { Brick } from "../entities/Brick";


export type BrickCollision = {
  collided: boolean;
  brick?: Brick;
};

export type PaddleCollision = {
  collided: boolean;
  hitPoint?: number;
};

export type BrickType = "empty" | "normal" | "strong" | "unbreakable";

export interface LevelSchema {
  rows: number;
  cols: number;

  brickWidth: number;
  brickHeight: number;

  padding: number;

  offsetX: number;
  offsetY: number;

  grid: BrickType[][];
}
